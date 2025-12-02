"use client";

import { useEffect, useRef } from "react";
import Player from "@vimeo/player";
import { trackVideoMilestone, type VideoMilestone } from "@/lib/meta-tracking";

interface TrackedVimeoPlayerProps {
  videoId: string;
  funnel: string;
  className?: string;
  autoplay?: boolean;
}

export function TrackedVimeoPlayer({
  videoId,
  funnel,
  className = "",
  autoplay = true,
}: TrackedVimeoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  // Use ref instead of state to avoid stale closures in event handlers
  const trackedMilestonesRef = useRef<Set<VideoMilestone>>(new Set());

  useEffect(() => {
    if (!containerRef.current) return;

    console.log("🎬 VIMEO: Initializing player", { videoId, funnel, autoplay });

    // Create player
    const player = new Player(containerRef.current, {
      id: parseInt(videoId),
      autoplay,
      title: false,
      byline: false,
      portrait: false,
    });

    playerRef.current = player;

    // Log when player is ready
    player.ready().then(() => {
      console.log("🎬 VIMEO: Player ready");
    }).catch((err) => {
      console.error("🎬 VIMEO: Player error", err);
    });

    // Track play event
    player.on("play", () => {
      console.log("🎬 VIMEO: Play event fired");
      if (!trackedMilestonesRef.current.has("play")) {
        trackedMilestonesRef.current.add("play");
        trackVideoMilestone({ funnel, videoId, milestone: "play" });
      }
    });

    // Track progress milestones
    player.on("timeupdate", (data) => {
      const percent = data.percent * 100;

      if (percent >= 25 && !trackedMilestonesRef.current.has("25")) {
        console.log("🎬 VIMEO: 25% milestone reached");
        trackedMilestonesRef.current.add("25");
        trackVideoMilestone({ funnel, videoId, milestone: "25" });
      }

      if (percent >= 50 && !trackedMilestonesRef.current.has("50")) {
        console.log("🎬 VIMEO: 50% milestone reached");
        trackedMilestonesRef.current.add("50");
        trackVideoMilestone({ funnel, videoId, milestone: "50" });
      }

      if (percent >= 75 && !trackedMilestonesRef.current.has("75")) {
        console.log("🎬 VIMEO: 75% milestone reached");
        trackedMilestonesRef.current.add("75");
        trackVideoMilestone({ funnel, videoId, milestone: "75" });
      }
    });

    // Track complete
    player.on("ended", () => {
      console.log("🎬 VIMEO: Video ended");
      if (!trackedMilestonesRef.current.has("complete")) {
        trackedMilestonesRef.current.add("complete");
        trackVideoMilestone({ funnel, videoId, milestone: "complete" });
      }
    });

    return () => {
      console.log("🎬 VIMEO: Destroying player");
      player.destroy();
    };
  }, [videoId, funnel, autoplay]);

  return (
    <div
      ref={containerRef}
      className={className}
    />
  );
}
