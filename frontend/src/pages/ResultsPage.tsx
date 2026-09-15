import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, AlertTriangle, BarChart2, TrendingDown, CheckCircle } from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';
import ScoreBadge, { TotalScoreBadge } from '@/components/ui/ScoreBadge';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockResults, mockPersonas, mockSessions, mockDocuments } from '@/data/mockData';

// ── Criterion averages computed from mockResults ───────────────────────────
const avg = (arr: number[]) => arr.length ? +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : 0;
const criterionKeys = ['accuracy', 'groundedness', 'personaReflection', 'clarity', 'completeness'] as const;
type CriterionKey = typeof criterionKeys[number];
const CRITERION_LABELS: Record<CriterionKey, string> = {
  accuracy: 'Accuracy', groundedness: 'Groundedness', personaReflection: 'Persona Reflection',
  clarity: 'Clarity', completeness: 'Completeness',
};

const COMMON_ISSUES = [
  { label: 'Missing application deadline', count: 7 },
  { label: 'Missing required documents', count: 5 },
  { label: 'Weak persona reflection', count: 4 },
  { label: 'Insufficient evidence', count: 3 },
  { label: 'Incorrect eligibility info', count: 1 },
];

export default function ResultsPage() {
  const navigate = useNavigate();
  const [filterSession, setFilterSession] = useState('all');
  const [filterPersona, setFilterPersona] = useState('all');
  const [filterDocument, setFilterDocument] = useState('all');
  const [filterNeedsReview, setFilterNeedsReview] = useState('all');
  const [sortLow, setSortLow] = useState(false);

  const filtered = mockResults.filter((r) => {
    if (filterSession !== 'all' && r.sessionId !== filterSession) return false;
    if (filterPersona !== 'all' && r.personaId !== filterPersona) return false;
    if (filterDocument !== 'all' && r.documentId !== filterDocument) return false;
    if (filterNeedsReview === 'yes' && !r.needsReview) return false;
    if (filterNeedsReview === 'no' && r.needsReview) return false;
    return true;
  }).sort((a, b) => sortLow ? a.totalScore - b.totalScore : 0);

  // session summary (use first completed session as reference)
  const session = mockSessions.find((s) => s.status === 'COMPLETED') ?? mockSessions[0];
  const allScores = mockResults.map((r) => r.totalScore);
  const avgTotal = avg(allScores);
  const needsReviewCount = mockResults.filter((r) => r.needsReview).length;
  const criterionAvgs = criterionKeys.reduce((acc, k) => {
    acc[k] = avg(mockResults.map((r) => r.scores[k]));
    return acc;
  }, {} as Record<CriterionKey, number>);

  return (
    <PageLayout>
      {/* Header */}
      <div className="w-full bg-white px-6 md:px-16 pt-12 pb-8 border-b border-[#e6e6e6]">
        <div className="max-w-[1200px] mx-auto flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-eyebrow text-black/50 mb-3">Evaluation Results</p>
            <h1 className="text-display-lg text-black text-balance">Evaluation Dashboard</h1>
            <p className="text-body text-black/60 mt-3 max-w-[560px]">
              Understand the full test session without reading every conversation. Find weak answers and drill into detail.
            </p>
          </div>
          <div className="flex items-center gap-3 self-end">
            <button className="btn-primary !py-3 !px-5 !text-[14px]" onClick={() => navigate('/sessions')}>
              <BarChart2 size={15} />
              New Session
            </button>
          </div>
        </div>
      </div>

      {/* Session summary hero */}
      <section className="bg-block-lime px-6 md:px-16 py-12">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow text-black/60 mb-2">Session Summary</p>
          <p className="text-headline text-black mb-8">{session.title}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Questions', value: mockResults.length },
              { label: 'Successful Answers', value: mockResults.filter((r) => !r.needsReview).length },
              { label: 'Average Score', value: `${avgTotal}/25` },
              { label: 'Needs Review', value: needsReviewCount },
            ].map((m) => (
              <div key={m.label} className="bg-white/70 border border-white/40 rounded-lg px-5 py-5">
                <p className="text-[40px] font-black leading-none text-black mb-1">{m.value}</p>
                <p className="text-caption text-black/50">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Criterion averages */}
      <section className="bg-white border-b border-[#e6e6e6] px-6 md:px-16 py-12">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow text-black/50 mb-8">Average Scores by Criterion</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {criterionKeys.map((k) => {
              const val = criterionAvgs[k];
              const isLow = val < 4.0;
              return (
                <div key={k} className={`border rounded-lg p-5 ${isLow ? 'border-[#ff3d8b]/30 bg-[#ff3d8b]/5' : 'border-[#e6e6e6]'}`}>
                  <p className="text-caption text-black/40 mb-2">{CRITERION_LABELS[k]}</p>
                  <p className={`text-[36px] font-bold leading-none mb-2 ${isLow ? 'text-[#ff3d8b]' : 'text-black'}`}>{val}</p>
                  <div className="h-1 bg-[#e6e6e6] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${val >= 4.5 ? 'bg-[#1ea64a]' : isLow ? 'bg-[#ff3d8b]' : 'bg-black/50'}`}
                      style={{ width: `${(val / 5) * 100}%` }} />
                  </div>
                  {isLow && <div className="flex items-center gap-1 mt-1.5"><TrendingDown size={11} className="text-[#ff3d8b]" /><span className="text-[11px] text-[#ff3d8b]">Below target</span></div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common issues */}
      <section className="bg-[#f7f7f5] border-b border-[#e6e6e6] px-6 md:px-16 py-12">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow text-black/50 mb-8">Common Issues</p>
          <div className="flex flex-col gap-3 max-w-[640px]">
            {COMMON_ISSUES.map((issue) => (
              <div key={issue.label} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-body-sm text-black">{issue.label}</span>
                    <span className="text-caption text-black/50 shrink-0 ml-3">{issue.count}</span>
                  </div>
                  <div className="h-1.5 bg-[#e6e6e6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff3d8b] rounded-full" style={{ width: `${(issue.count / 7) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results table */}
      <section className="bg-white px-6 md:px-16 py-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Filter bar */}
          <div className="flex items-center gap-3 flex-wrap mb-8">
            <Filter size={14} className="text-black/40" />
            {[
              { val: filterSession, set: setFilterSession, options: [['all', 'All Sessions'], ...mockSessions.map((s) => [s.id, s.title])] },
              { val: filterPersona, set: setFilterPersona, options: [['all', 'All Personas'], ...mockPersonas.map((p) => [p.id, p.label])] },
              { val: filterDocument, set: setFilterDocument, options: [['all', 'All Documents'], ...mockDocuments.map((d) => [d.id, d.title])] },
              { val: filterNeedsReview, set: setFilterNeedsReview, options: [['all', 'All Statuses'], ['yes', 'Needs Review'], ['no', 'Looks Good']] },
            ].map((f, i) => (
              <select key={i} className="bg-white border border-[#e6e6e6] rounded-full px-4 py-2 text-[13px] text-black outline-none focus:border-black cursor-pointer appearance-none"
                value={f.val} onChange={(e) => f.set(e.target.value)}>
                {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            ))}
            <button
              onClick={() => setSortLow((v) => !v)}
              className={`flex items-center gap-1.5 text-[13px] font-medium border rounded-full px-4 py-2 transition-colors ${sortLow ? 'bg-black text-white border-black' : 'bg-white text-black/60 border-[#e6e6e6] hover:border-black/40'}`}
            >
              <TrendingDown size={13} />
              Lowest score first
            </button>
          </div>

          <p className="text-caption text-black/40 mb-5">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="border-b border-[#e6e6e6]">
                  {['Persona', 'Question', 'Total', 'Accuracy', 'Groundedness', 'Completeness', 'Status', ''].map((h) => (
                    <th key={h} className="text-caption text-black/40 text-left py-3 pr-5 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-[#f1f1f1] hover:bg-[#f7f7f5] cursor-pointer transition-colors"
                    onClick={() => navigate(`/results/${r.id}`)}
                  >
                    <td className="py-4 pr-5 whitespace-nowrap max-w-[160px]">
                      <span className="text-body-sm text-black/70 line-clamp-1">{r.personaLabel}</span>
                    </td>
                    <td className="py-4 pr-5 max-w-[260px]">
                      <span className="text-body-sm text-black line-clamp-2">{r.generatedQuestion}</span>
                    </td>
                    <td className="py-4 pr-5 whitespace-nowrap"><TotalScoreBadge total={r.totalScore} /></td>
                    <td className="py-4 pr-5 whitespace-nowrap"><ScoreBadge score={r.scores.accuracy} /></td>
                    <td className="py-4 pr-5 whitespace-nowrap"><ScoreBadge score={r.scores.groundedness} /></td>
                    <td className="py-4 pr-5 whitespace-nowrap"><ScoreBadge score={r.scores.completeness} /></td>
                    <td className="py-4 pr-5 whitespace-nowrap">
                      {r.needsReview ? (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-[#ff3d8b]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          <AlertTriangle size={11} /> NEEDS REVIEW
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-[#1ea64a]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          <CheckCircle size={11} /> OK
                        </span>
                      )}
                    </td>
                    <td className="py-4 pr-5 whitespace-nowrap">
                      <span className="text-caption text-black/40 hover:text-black">View →</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
