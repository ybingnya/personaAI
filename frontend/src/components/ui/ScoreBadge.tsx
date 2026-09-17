interface ScoreBadgeProps {
  score: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScoreBadge({ score, max = 5, size = 'sm' }: ScoreBadgeProps) {
  const ratio = score / max;
  let cls = '';
  if (ratio >= 0.8) cls = 'score-high';
  else if (ratio >= 0.5) cls = 'score-mid';
  else cls = 'score-low';

  const sizeClass =
    size === 'lg' ? 'text-[16px] px-4 py-1' : size === 'md' ? 'text-[13px] px-3 py-0.5' : 'text-[11px] px-2.5 py-0.5';

  return (
    <span className={`${cls} ${sizeClass}`}>
      {score}/{max}
    </span>
  );
}

export function TotalScoreBadge({ total, max = 25 }: { total: number; max?: number }) {
  const ratio = total / max;
  let cls = '';
  if (ratio >= 0.8) cls = 'score-high';
  else if (ratio >= 0.56) cls = 'score-mid';
  else cls = 'score-low';

  return (
    <span className={`${cls} text-[13px] px-3 py-1 font-bold`}>
      {total} / {max}
    </span>
  );
}
