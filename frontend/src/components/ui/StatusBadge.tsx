import type { DocumentStatus, SessionStatus } from '@/data/mockData';

type BadgeStatus = DocumentStatus | SessionStatus;

const config: Record<BadgeStatus, { label: string; className: string }> = {
  UPLOADED: {
    label: 'UPLOADED',
    className: 'bg-[#f7f7f5] text-black border border-[#e6e6e6]',
  },
  PROCESSING: {
    label: 'PROCESSING',
    className: 'bg-[#f4ecd6] text-black border border-[#e6c980]/40',
  },
  READY: {
    label: 'READY',
    className: 'bg-[#c8e6cd]/50 text-[#1ea64a] border border-[#1ea64a]/20',
  },
  FAILED: {
    label: 'FAILED',
    className: 'bg-[#ff3d8b]/10 text-[#ff3d8b] border border-[#ff3d8b]/20',
  },
  CREATED: {
    label: 'CREATED',
    className: 'bg-[#f7f7f5] text-black border border-[#e6e6e6]',
  },
  RUNNING: {
    label: 'RUNNING',
    className: 'bg-[#dceeb1] text-black border border-[#b0d060]/40',
  },
  COMPLETED: {
    label: 'COMPLETED',
    className: 'bg-[#c8e6cd]/50 text-[#1ea64a] border border-[#1ea64a]/20',
  },
};

interface StatusBadgeProps {
  status: BadgeStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = config[status] ?? {
    label: status,
    className: 'bg-[#f7f7f5] text-black border border-[#e6e6e6]',
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide ${className}`}
      style={{ fontFamily: 'JetBrains Mono, Geist Mono, monospace', letterSpacing: '0.4px' }}
    >
      {label}
    </span>
  );
}
