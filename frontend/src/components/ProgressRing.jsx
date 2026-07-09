const ProgressRing = ({ radius, stroke, progress }) => {
  const normRadius = radius - stroke * 2;
  const circum = normRadius * 2 * Math.PI;
  const offset = circum - (progress / 100) * circum;
  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle stroke="var(--border-color)" fill="transparent" strokeWidth={stroke} r={normRadius} cx={radius} cy={radius} />
      <circle stroke="var(--primary)" fill="transparent" strokeWidth={stroke} strokeDasharray={circum + ' ' + circum} style={{ strokeDashoffset: offset, transition: '0.5s ease-in-out' }} r={normRadius} cx={radius} cy={radius} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="var(--text-color)" fontSize="20px">{progress}%</text>
    </svg>
  );
};
export default ProgressRing;