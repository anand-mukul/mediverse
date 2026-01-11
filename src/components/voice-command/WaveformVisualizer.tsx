"use client";

import { useEffect, useState } from "react";

interface WaveformVisualizerProps {
  audioLevel: number;
}

export default function WaveformVisualizer({
  audioLevel,
}: WaveformVisualizerProps) {
  const [animationTime, setAnimationTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTime(Date.now() * 0.01);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const bars = Array.from({ length: 20 }, (_, i) => i);

  const getBarHeight = (index: number) => {
    const baseHeight = 10;
    const maxHeight = 60;
    const intensity = audioLevel / 100;

    const wavePosition = Math.sin(index * 0.5 + animationTime) * 0.5 + 0.5;
    const height =
      baseHeight + (maxHeight - baseHeight) * intensity * wavePosition;

    return Math.max(baseHeight, Math.min(maxHeight, height));
  };

  return (
    <div className="flex items-end justify-center gap-1 h-20 px-4">
      {bars.map((index) => (
        <div
          key={index}
          className="w-3 rounded-t-lg bg-gradient-to-t from-blue-500 to-purple-500 transition-all duration-150 ease-in-out"
          style={{
            height: `${getBarHeight(index)}px`,
            opacity: 0.5 + audioLevel / 200,
          }}
        />
      ))}
    </div>
  );
}
