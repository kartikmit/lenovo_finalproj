import { useId } from 'react';

const ProgressRing = ({ radius = 60, stroke = 10, progress = 0 }) => {
  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const gradientId = `progress-grad-${safeId}`;
  const filterId = `progress-filter-${safeId}`;

  const cleanProgress = Math.min(100, Math.max(0, Math.round(progress) || 0));
  const normRadius = radius - stroke;
  const circum = normRadius * 2 * Math.PI;
  const offset = circum - (cleanProgress / 100) * circum;

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: radius * 2,
        height: radius * 2,
      }}
    >
      <svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
          overflow: 'visible',
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="3"
              floodColor="#3b82f6"
              floodOpacity="0.35"
            />
          </filter>
        </defs>

        {/* Background Track Circle */}
        <circle
          stroke="var(--border-color)"
          fill="transparent"
          strokeWidth={stroke}
          strokeOpacity={0.35}
          r={normRadius}
          cx={radius}
          cy={radius}
        />

        {/* Animated Gradient Progress Circle */}
        <circle
          stroke={`url(#${gradientId})`}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={offset}
          strokeLinecap={cleanProgress === 0 ? 'butt' : 'round'}
          filter={`url(#${filterId})`}
          style={{
            transition: 'stroke-dashoffset 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          r={normRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      {/* Centered Percentage Label */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: `${Math.max(16, Math.round(radius * 0.34))}px`,
            fontWeight: '700',
            color: 'var(--text-color)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {cleanProgress}%
        </span>
      </div>
    </div>
  );
};

export default ProgressRing;