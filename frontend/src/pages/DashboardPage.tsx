import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Users, CheckCircle, AlertTriangle, TrendingUp, FileX } from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';
import StatusBadge from '@/components/ui/StatusBadge';
import { TotalScoreBadge } from '@/components/ui/ScoreBadge';
import { mockDocuments, mockSessions, mockResults, mockPersonas } from '@/data/mockData';

export default function DashboardPage() {
  const navigate = useNavigate();

  const uploadedDocs = mockDocuments.length;
  const readyDocs = mockDocuments.filter((d) => d.status === 'READY').length;
  const completedSessions = mockSessions.filter((s) => s.status === 'COMPLETED').length;
  const avgScore = mockResults.length
    ? Math.round(mockResults.reduce((s, r) => s + r.totalScore, 0) / mockResults.length)
    : 0;
  const lowScoreCount = mockResults.filter((r) => r.needsReview).length;
  const needsReviewResults = mockResults.filter((r) => r.needsReview);
  const recentSessions = mockSessions.slice(0, 4);
  const recentResults = mockResults.slice(0, 3);

  const metrics = [
    { label: 'Uploaded Documents', value: uploadedDocs, icon: FileText, color: 'bg-block-cream' },
    { label: 'Ready Documents', value: readyDocs, icon: CheckCircle, color: 'bg-block-mint' },
    { label: 'Sample Personas', value: mockPersonas.length, icon: Users, color: 'bg-block-lilac' },
    { label: 'Completed Sessions', value: completedSessions, icon: TrendingUp, color: 'bg-block-lime' },
    { label: 'Average Score', value: `${avgScore}/25`, icon: TrendingUp, color: 'bg-block-coral' },
    { label: 'Low Score Answers', value: lowScoreCount, icon: AlertTriangle, color: 'bg-block-pink' },
  ];

  const docStatusCounts = {
    UPLOADED: mockDocuments.filter((d) => d.status === 'UPLOADED').length,
    PROCESSING: mockDocuments.filter((d) => d.status === 'PROCESSING').length,
    READY: mockDocuments.filter((d) => d.status === 'READY').length,
    FAILED: mockDocuments.filter((d) => d.status === 'FAILED').length,
  };

  return (
    <PageLayout>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-block-lime w-full px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow mb-6 text-black/60">RAG Answer Evaluation Platform</p>
          <h1
            className="text-display-lg md:text-display-xl text-black mb-6 max-w-[860px] text-balance"
          >
            Evaluate RAG answers with Korean personas.
          </h1>
          <p className="text-body-lg text-black/70 mb-10 max-w-[640px]">
            Upload documents → Build personas → Generate questions → Get RAG answers → Evaluate quality → Review results.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <button className="btn-primary" onClick={() => navigate('/sessions')}>
              Start Evaluation Session
              <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => navigate('/results')}>
              View Results
            </button>
          </div>
        </div>
      </section>

      {/* ── Metric Cards ─────────────────────────────────── */}
      <section className="w-full bg-white px-6 md:px-16 py-16">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow mb-8 text-black/50">System Overview</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className={`${m.color} rounded-lg p-6 flex flex-col gap-2`}>
                <span className="text-caption text-black/60">{m.label}</span>
                <span className="text-[40px] font-bold leading-none text-black">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Document Processing Status ────────────────────── */}
      <section className="w-full bg-[#f7f7f5] border-t border-b border-[#e6e6e6] px-6 md:px-16 py-16">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow mb-8 text-black/50">Document Processing Status</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.entries(docStatusCounts) as [keyof typeof docStatusCounts, number][]).map(([status, count]) => (
              <div key={status} className="bg-white border border-[#e6e6e6] rounded-lg p-5 flex flex-col gap-3">
                <StatusBadge status={status} />
                <span className="text-[32px] font-bold text-black">{count}</span>
                <span className="text-body-sm text-black/50">documents</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Sessions ───────────────────────────────── */}
      <section className="w-full bg-white px-6 md:px-16 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-eyebrow text-black/50">Recent Test Sessions</p>
            <button className="btn-secondary !text-[14px] !py-2 !px-5" onClick={() => navigate('/sessions')}>
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="border-b border-[#e6e6e6]">
                  {['Session Title', 'Persona', 'Questions', 'Status', 'Created'].map((h) => (
                    <th key={h} className="text-caption text-black/40 text-left py-3 pr-6 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentSessions.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-[#f1f1f1] hover:bg-[#f7f7f5] cursor-pointer transition-colors"
                    onClick={() => navigate('/sessions')}
                  >
                    <td className="py-4 pr-6 text-body-sm font-medium text-black whitespace-nowrap">{s.title}</td>
                    <td className="py-4 pr-6 text-body-sm text-black/70 whitespace-nowrap">{s.personaLabel}</td>
                    <td className="py-4 pr-6 text-body-sm text-black whitespace-nowrap">{s.questionCount}</td>
                    <td className="py-4 pr-6 whitespace-nowrap"><StatusBadge status={s.status} /></td>
                    <td className="py-4 pr-6 text-caption text-black/40 whitespace-nowrap">{s.createdDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Recent Results ────────────────────────────────── */}
      <section className="w-full bg-[#f7f7f5] border-t border-[#e6e6e6] px-6 md:px-16 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-eyebrow text-black/50">Recent Evaluation Results</p>
            <button className="btn-secondary !text-[14px] !py-2 !px-5" onClick={() => navigate('/results')}>
              View all
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {recentResults.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-[#e6e6e6] rounded-lg p-5 flex items-start justify-between gap-4 cursor-pointer hover:border-black/20 transition-colors"
                onClick={() => navigate(`/results/${r.id}`)}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-caption text-black/40 mb-1">{r.personaLabel}</p>
                  <p className="text-body-sm font-medium text-black line-clamp-2">{r.generatedQuestion}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <TotalScoreBadge total={r.totalScore} />
                  {r.needsReview && (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-[#ff3d8b]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      <AlertTriangle size={12} /> NEEDS REVIEW
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Needs Review ─────────────────────────────────── */}
      {needsReviewResults.length > 0 && (
        <section className="w-full bg-block-pink px-6 md:px-16 py-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <FileX size={20} />
              <p className="text-eyebrow">Needs Review</p>
            </div>
            <p className="text-body text-black/60 mb-8">
              {needsReviewResults.length} answer{needsReviewResults.length > 1 ? 's' : ''} flagged for low groundedness or factual errors.
            </p>
            <div className="flex flex-col gap-3">
              {needsReviewResults.map((r) => (
                <div
                  key={r.id}
                  className="bg-white border border-[#ff3d8b]/20 rounded-lg p-5 cursor-pointer hover:border-[#ff3d8b]/50 transition-colors"
                  onClick={() => navigate(`/results/${r.id}`)}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="text-caption text-black/40 mb-1">{r.sessionTitle} · {r.personaLabel}</p>
                      <p className="text-body-sm font-semibold text-black mb-2">{r.generatedQuestion}</p>
                      <p className="text-body-sm text-black/60 line-clamp-2">{r.issueSummary}</p>
                    </div>
                    <TotalScoreBadge total={r.totalScore} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
