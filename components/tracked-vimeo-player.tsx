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

    const player = new Player(containerRef.current, {
      id: parseInt(videoId),
      autoplay,
      title: false,
      byline: false,
      portrait: false,
    });

    playerRef.current = player;

    // Track play event
    player.on("play", () => {
      if (!trackedMilestonesRef.current.has("play")) {
        trackedMilestonesRef.current.add("play");
        trackVideoMilestone({ funnel, videoId, milestone: "play" });
      }
    });

    // Track progress milestones
    player.on("timeupdate", (data) => {
      const percent = data.percent * 100;

      if (percent >= 25 && !trackedMilestonesRef.current.has("25")) {
        trackedMilestonesRef.current.add("25");
        trackVideoMilestone({ funnel, videoId, milestone: "25" });
      }

      if (percent >= 50 && !trackedMilestonesRef.current.has("50")) {
        trackedMilestonesRef.current.add("50");
        trackVideoMilestone({ funnel, videoId, milestone: "50" });
      }

      if (percent >= 75 && !trackedMilestonesRef.current.has("75")) {
        trackedMilestonesRef.current.add("75");
        trackVideoMilestone({ funnel, videoId, milestone: "75" });
      }
    });

    // Track complete
    player.on("ended", () => {
      if (!trackedMilestonesRef.current.has("complete")) {
        trackedMilestonesRef.current.add("complete");
        trackVideoMilestone({ funnel, videoId, milestone: "complete" });
      }
    });

    return () => {
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
