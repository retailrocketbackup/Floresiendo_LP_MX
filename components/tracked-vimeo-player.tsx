"use client";

import { useEffect, useRef, useState } from "react";
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
  const [trackedMilestones, setTrackedMilestones] = useState<Set<VideoMilestone>>(new Set());

  useEffect(() => {
    if (!containerRef.current) return;

    // Create player
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
      if (!trackedMilestones.has("play")) {
        trackVideoMilestone({ funnel, videoId, milestone: "play" });
        setTrackedMilestones((prev) => new Set(prev).add("play"));
      }
    });

    // Track progress milestones
    player.on("timeupdate", async (data) => {
      const percent = data.percent * 100;

      if (percent >= 25 && !trackedMilestones.has("25")) {
        trackVideoMilestone({ funnel, videoId, milestone: "25" });
        setTrackedMilestones((prev) => new Set(prev).add("25"));
      }

      if (percent >= 50 && !trackedMilestones.has("50")) {
        trackVideoMilestone({ funnel, videoId, milestone: "50" });
        setTrackedMilestones((prev) => new Set(prev).add("50"));
      }

      if (percent >= 75 && !trackedMilestones.has("75")) {
        trackVideoMilestone({ funnel, videoId, milestone: "75" });
        setTrackedMilestones((prev) => new Set(prev).add("75"));
      }
    });

    // Track complete
    player.on("ended", () => {
      if (!trackedMilestones.has("complete")) {
        trackVideoMilestone({ funnel, videoId, milestone: "complete" });
        setTrackedMilestones((prev) => new Set(prev).add("complete"));
      }
    });

    return () => {
      player.destroy();
    };
  }, [videoId, funnel, autoplay, trackedMilestones]);

  return (
    <div
      ref={containerRef}
      className={className}
    />
  );
}
