'use client';

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
}

export default function Sparkline({
  data,
  color = '#e85555',
  height = 32,
  width = 80
}: SparklineProps) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Normalize data to fit within height
  const normalizedData = data.map(value =>
    ((value - min) / range) * (height - 4) + 2
  );

  // Create SVG path
  const stepX = width / (data.length - 1);
  const points = normalizedData.map((y, i) => `${i * stepX},${height - y}`);
  const linePath = `M ${points.join(' L ')}`;

  // Create area path (for gradient fill)
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible"
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id={`sparkline-gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <path
        d={areaPath}
        fill={`url(#sparkline-gradient-${color.replace('#', '')})`}
      />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* End dot */}
      <circle
        cx={width}
        cy={height - normalizedData[normalizedData.length - 1]}
        r="2"
        fill={color}
      />
    </svg>
  );
}
