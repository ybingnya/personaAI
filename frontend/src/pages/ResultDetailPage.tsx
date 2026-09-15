import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, AlertTriangle, CheckCircle, FileText,
  MessageSquare, Search, Sparkles, BarChart2, Lightbulb, ChevronRight,
} from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';
import ScoreBadge, { TotalScoreBadge } from '@/components/ui/ScoreBadge';
import { mockResults, mockPersonas } from '@/data/mockData';

const SCORE_ITEMS = [
  { key: 'accuracy' as const, label: 'Accuracy', description: 'Answer matches what is stated in the official document.' },
  { key: 'groundedness' as const, label: 'Groundedness', description: 'Every claim is supported by retrieved evidence chunks.' },
  { key: 'personaReflection' as const, label: 'Persona Reflection', description: "Answer considers the student's specific situation and needs." },
  { key: 'clarity' as const, label: 'Clarity', description: 'Language is plain, well-structured, and easy to understand.' },
  { key: 'completeness' as const, label: 'Completeness', description: 'Covers eligibility, dates, conditions, and required documents.' },
];

export default function ResultDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const result = mockResults.find((r) => r.id === id);
  const persona = result ? mockPersonas.find((p) => p.id === result.personaId) : null;

  if (!result) {
    return (
      <PageLayout>
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 py-24 text-center">
          <p className="text-headline text-black/40">Result not found.</p>
          <button className="btn-primary mt-6" onClick={() => navigate('/results')}>Back to Results</button>
        </div>
      </PageLayout>
    );
  }

  /* ── flow step label helper ── */
  const StepLabel = ({ icon, label, step }: { icon: React.ReactNode; label: string; step: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-caption text-black/30">{step}</span>
        <ChevronRight size={12} className="text-black/20" />
        <span className="text-eyebrow text-black/60">{label}</span>
      </div>
    </div>
  );

  return (
    <PageLayout>
      {/* ── Header ── */}
      <div className="w-full bg-white px-6 md:px-16 pt-10 pb-8 border-b border-[#e6e6e6]">
        <div className="max-w-[1200px] mx-auto">
          <button
            className="flex items-center gap-2 text-body-sm text-black/50 hover:text-black mb-6 transition-colors"
            onClick={() => navigate('/results')}
          >
            <ArrowLeft size={16} /> Back to Results
          </button>
          <div className="flex items-start gap-4 flex-wrap justify-between">
            <div>
              <p className="text-eyebrow text-black/50 mb-2">{result.sessionTitle}</p>
              <h1 className="text-[28px] font-bold text-black max-w-[800px] leading-snug">{result.generatedQuestion}</h1>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <TotalScoreBadge total={result.totalScore} />
              {result.needsReview ? (
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#ff3d8b]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  <AlertTriangle size={13} /> NEEDS REVIEW
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1ea64a]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  <CheckCircle size={13} /> LOOKS GOOD
                </span>
              )}
            </div>
          </div>

          {/* Flow breadcrumb */}
          <div className="flex items-center gap-2 mt-6 flex-wrap">
            {['Persona', 'Question', 'Evidence', 'RAG Answer', 'Evaluation', 'Issues', 'Improvement'].map((s, i, arr) => (
              <span key={s} className="flex items-center gap-2">
                <span className="text-caption text-black/50 bg-[#f7f7f5] px-2.5 py-1 rounded-full">{s}</span>
                {i < arr.length - 1 && <ChevronRight size={12} className="text-black/20" />}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-16 py-12 flex flex-col gap-8">

        {/* ── STEP 1: Persona ── */}
        <div className="card-editorial">
          <StepLabel step="01" label="Persona" icon={<span className="text-white text-[11px] font-bold">P</span>} />
          {persona ? (
            <>
              <div className="bg-block-lilac rounded-lg px-5 py-4 mb-5 inline-flex flex-col">
                <span className="text-caption text-black/50 mb-0.5">Label</span>
                <span className="text-body-sm font-bold text-black">{persona.label}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 mb-4">
                {[
                  { label: 'Age', value: `${persona.age}세` },
                  { label: 'Region', value: persona.region },
                  { label: 'Occupation', value: persona.occupation },
                  { label: 'Year', value: persona.educationLevel },
                ].map((f) => (
                  <div key={f.label}>
                    <p className="text-caption text-black/40 mb-1">{f.label}</p>
                    <p className="text-body-sm font-medium text-black">{f.value}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#f1f1f1] pt-4 mb-4">
                <p className="text-caption text-black/40 mb-1.5">Situation</p>
                <p className="text-body-sm text-black/70 leading-relaxed">{persona.situation}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {persona.interests.split(',').map((tag) => (
                  <span key={tag} className="text-caption bg-[#f7f7f5] border border-[#e6e6e6] px-2.5 py-1 rounded-full text-black/60">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p className="text-body-sm text-black/40">Persona data not found.</p>
          )}
        </div>

        {/* ── STEP 2: Question ── */}
        <div className="card-editorial">
          <StepLabel step="02" label="Question" icon={<MessageSquare size={14} className="text-white" />} />
          <div className="bg-black text-white rounded-2xl rounded-bl-sm px-6 py-5 inline-block max-w-[760px]">
            <p className="text-[18px] leading-relaxed">{result.generatedQuestion}</p>
          </div>
          <p className="text-caption text-black/30 mt-3">Auto-generated from persona's situation and interests</p>
        </div>

        {/* ── STEP 3: Retrieved Evidence ── */}
        <div className="card-editorial">
          <StepLabel step="03" label="Retrieved Evidence" icon={<Search size={14} className="text-white" />} />
          <p className="text-body-sm text-black/50 mb-5">
            The RAG system searched the uploaded documents and retrieved these sections as the most relevant context.
          </p>
          <div className="flex flex-col gap-4">
            {result.evidenceChunks.map((chunk, idx) => (
              <div key={chunk.chunkId} className="bg-[#f7f7f5] border border-[#e6e6e6] rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <FileText size={13} className="text-black/40 shrink-0" />
                  <span className="text-body-sm font-semibold text-black">{chunk.documentTitle}</span>
                  <span className="text-[11px] bg-white border border-[#e6e6e6] px-2 py-0.5 rounded font-mono text-black/40">
                    {chunk.chunkId}
                  </span>
                  <span className="text-caption text-black/30">Chunk #{idx + 1}</span>
                </div>
                <p className="text-body-sm text-black/70 leading-relaxed border-l-2 border-black/10 pl-4">
                  "{chunk.previewText}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── STEP 4: RAG Answer ── */}
        <div className="card-editorial">
          <StepLabel step="04" label="RAG Answer" icon={<Sparkles size={14} className="text-white" />} />
          <div className="bg-[#f7f7f5] border border-[#e6e6e6] rounded-2xl rounded-tl-sm px-6 py-5 max-w-[800px]">
            <p className="text-body-sm leading-relaxed text-black">{result.ragAnswer}</p>
          </div>
          <p className="text-caption text-black/30 mt-3">Generated by the RAG chatbot using the retrieved evidence above</p>
        </div>

        {/* ── STEP 5: Evaluation ── */}
        <section className={`rounded-2xl p-8 md:p-10 ${result.needsReview ? 'bg-block-pink' : 'bg-block-lime'}`}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
              <BarChart2 size={14} className="text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-caption text-black/30">05</span>
              <ChevronRight size={12} className="text-black/20" />
              <span className="text-eyebrow text-black/60">Evaluation</span>
            </div>
          </div>

          {/* Criterion cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {SCORE_ITEMS.map((item) => {
              const score = result.scores[item.key];
              const isLow = score <= 2;
              const isMid = score === 3;
              return (
                <div key={item.key} className={`bg-white rounded-xl p-5 border ${isLow ? 'border-[#ff3d8b]/30' : 'border-[#e6e6e6]'}`}>
                  <p className="text-caption text-black/40 mb-3">{item.label}</p>
                  <div className="flex items-end gap-2 mb-3">
                    <span className={`text-[38px] font-black leading-none ${isLow ? 'text-[#ff3d8b]' : isMid ? 'text-black/60' : 'text-black'}`}>
                      {score}
                    </span>
                    <span className="text-body-sm text-black/25 mb-1.5">/ 5</span>
                  </div>
                  <div className="h-1.5 bg-black/8 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all ${isLow ? 'bg-[#ff3d8b]' : isMid ? 'bg-black/40' : 'bg-[#1ea64a]'}`}
                      style={{ width: `${(score / 5) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-black/50 leading-snug">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="bg-white rounded-xl p-6 border border-[#e6e6e6]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-caption text-black/40 mb-1">Total Score</p>
                <div className="flex items-end gap-3">
                  <span className={`text-[56px] font-black leading-none ${result.needsReview ? 'text-[#ff3d8b]' : result.totalScore >= 22 ? 'text-[#1ea64a]' : 'text-black'}`}>
                    {result.totalScore}
                  </span>
                  <span className="text-[20px] text-black/25 mb-2">/ 25</span>
                  <span className="text-[28px] font-bold text-black/40 mb-1">
                    · {Math.round((result.totalScore / 25) * 100)}/100
                  </span>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-5 py-3 rounded-full ${result.needsReview ? 'bg-[#ff3d8b]/10' : 'bg-[#1ea64a]/10'}`}>
                {result.needsReview
                  ? <><AlertTriangle size={18} className="text-[#ff3d8b]" /><span className="text-body-sm font-semibold text-[#ff3d8b]">Needs Review</span></>
                  : <><CheckCircle size={18} className="text-[#1ea64a]" /><span className="text-body-sm font-semibold text-[#1ea64a]">Acceptable Quality</span></>
                }
              </div>
            </div>
          </div>
        </section>

        {/* ── STEP 6: Issues ── */}
        {result.issueSummary && (
          <div className="card-editorial border-l-4 border-[#ff3d8b]">
            <StepLabel step="06" label="Issues Identified" icon={<AlertTriangle size={14} className="text-white" />} />
            <div className="bg-[#ff3d8b]/6 border border-[#ff3d8b]/20 rounded-lg px-5 py-4">
              <p className="text-body-sm text-black/80 leading-relaxed">{result.issueSummary}</p>
            </div>
          </div>
        )}

        {/* ── STEP 7: Improvement ── */}
        {result.improvementSuggestion && (
          <div className="card-editorial">
            <StepLabel step="07" label="Improvement Suggestion" icon={<Lightbulb size={14} className="text-white" />} />
            <div className="bg-block-cream rounded-lg px-5 py-4 mb-6">
              <p className="text-body-sm text-black/80 leading-relaxed">{result.improvementSuggestion}</p>
            </div>
            <div className="flex gap-3">
              <button className="btn-primary !py-3 !px-6 !text-[15px]">
                Mark for Improvement
              </button>
              <button className="btn-secondary !py-3 !px-6 !text-[15px]" onClick={() => navigate('/results')}>
                Back to Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </PageLayout>
  );
}
