import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Play, ChevronLeft, ChevronRight, Search, Send,
  FileText, AlertTriangle, CheckCircle, Loader, Zap, BarChart2,
} from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';
import StatusBadge from '@/components/ui/StatusBadge';
import ScoreBadge, { TotalScoreBadge } from '@/components/ui/ScoreBadge';
import {
  mockDocuments, mockPersonas, mockSessions, mockWorkspaceQuestions,
  type TestSession, type SessionStatus, type WorkspaceQuestion, type ChatMessage,
} from '@/data/mockData';

// ─── Session Setup ────────────────────────────────────────────────────────────
function SessionSetup({ onStart }: { onStart: (session: TestSession) => void }) {
  const [title, setTitle] = useState('2026 Scholarship Chatbot Evaluation');
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>(['doc-1', 'doc-5']);
  const [selectedPersonaIds, setSelectedPersonaIds] = useState<string[]>(['per-1', 'per-2', 'per-8']);
  const [qPerPersona, setQPerPersona] = useState(3);
  const [error, setError] = useState('');

  const readyDocs = mockDocuments.filter((d) => d.status === 'READY');

  const toggleDoc = (id: string) =>
    setSelectedDocIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const togglePersona = (id: string) =>
    setSelectedPersonaIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const totalQ = selectedPersonaIds.length * qPerPersona;

  const handleStart = () => {
    if (!title.trim()) { setError('Please enter a session name.'); return; }
    if (selectedDocIds.length === 0) { setError('Select at least one document.'); return; }
    if (selectedPersonaIds.length === 0) { setError('Select at least one persona.'); return; }
    setError('');
    const personas = mockPersonas.filter((p) => selectedPersonaIds.includes(p.id));
    const docs = mockDocuments.filter((d) => selectedDocIds.includes(d.id));
    const session: TestSession = {
      id: `ses-new-${Date.now()}`,
      title: title.trim(),
      personaIds: selectedPersonaIds,
      personaLabels: personas.map((p) => p.label),
      documentIds: selectedDocIds,
      documentTitles: docs.map((d) => d.title),
      questionsPerPersona: qPerPersona,
      totalQuestions: totalQ,
      answeredQuestions: 0,
      evaluatedQuestions: 0,
      status: 'RUNNING',
      createdDate: new Date().toISOString().slice(0, 10),
    };
    onStart(session);
  };

  return (
    <PageLayout>
      <div className="w-full bg-white px-6 md:px-16 pt-12 pb-8 border-b border-[#e6e6e6]">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow text-black/50 mb-3">Evaluation Workflow</p>
          <h1 className="text-display-lg text-black text-balance">Test Sessions</h1>
          <p className="text-body text-black/60 mt-3 max-w-[600px]">
            Select documents and personas, then start the automated evaluation pipeline.
          </p>
        </div>
      </div>

      {/* How it works */}
      <section className="bg-block-lime px-6 md:px-16 py-10">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow text-black/60 mb-6">How it works</p>
          <div className="flex items-center gap-0 flex-wrap">
            {[
              { step: '01', label: 'Persona asks a question' },
              { step: '02', label: 'RAG searches documents' },
              { step: '03', label: 'Chatbot answers' },
              { step: '04', label: 'AI scores the answer' },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex items-center">
                <div className="flex items-center gap-2.5 bg-white/70 border border-white/40 rounded-lg px-4 py-3">
                  <span className="text-caption text-black/40">{item.step}</span>
                  <span className="text-body-sm font-medium text-black">{item.label}</span>
                </div>
                {i < arr.length - 1 && <ArrowRight size={16} className="text-black/30 mx-2 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup form */}
      <section className="bg-white px-6 md:px-16 py-14">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow text-black/50 mb-8">Create New Session</p>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left */}
            <div className="flex flex-col gap-6">
              <div>
                <label className="text-caption text-black/50 block mb-2">Session Name</label>
                <input
                  className="w-full bg-white text-black border border-[#e6e6e6] rounded-md px-3 py-3 text-[16px] outline-none focus:border-black transition-colors"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-caption text-black/50 block mb-2">Questions Per Persona</label>
                <div className="flex gap-2">
                  {[1, 3, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setQPerPersona(n)}
                      className={`px-5 py-2.5 rounded-full text-[14px] font-medium border transition-colors ${
                        qPerPersona === n ? 'bg-black text-white border-black' : 'bg-white text-black border-[#e6e6e6] hover:border-black/40'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-[#f7f7f5] border border-[#e6e6e6] rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-[28px] font-bold text-black">{selectedDocIds.length}</p>
                    <p className="text-caption text-black/40">Documents</p>
                  </div>
                  <div>
                    <p className="text-[28px] font-bold text-black">{selectedPersonaIds.length}</p>
                    <p className="text-caption text-black/40">Personas</p>
                  </div>
                  <div>
                    <p className="text-[28px] font-bold text-black">{totalQ}</p>
                    <p className="text-caption text-black/40">Total Q's</p>
                  </div>
                </div>
              </div>
              {error && <p className="text-body-sm text-[#ff3d8b]">{error}</p>}
              <button className="btn-primary self-start" onClick={handleStart}>
                <Play size={18} />
                Start Evaluation
              </button>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-6">
              <div>
                <label className="text-caption text-black/50 block mb-3">Select READY Documents</label>
                <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
                  {readyDocs.map((doc) => (
                    <label key={doc.id} className={`flex items-center gap-3 px-4 py-3 rounded-md border cursor-pointer transition-colors ${
                      selectedDocIds.includes(doc.id) ? 'bg-white border-black' : 'bg-[#f7f7f5] border-[#e6e6e6] hover:border-black/30'
                    }`}>
                      <input type="checkbox" checked={selectedDocIds.includes(doc.id)} onChange={() => toggleDoc(doc.id)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-body-sm font-medium text-black truncate">{doc.title}</p>
                        <p className="text-caption text-black/40">{doc.category} · {doc.chunkCount} chunks</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-caption text-black/50 block mb-3">Select Personas</label>
                <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
                  {mockPersonas.map((p) => (
                    <label key={p.id} className={`flex items-center gap-3 px-4 py-3 rounded-md border cursor-pointer transition-colors ${
                      selectedPersonaIds.includes(p.id) ? 'bg-white border-black' : 'bg-[#f7f7f5] border-[#e6e6e6] hover:border-black/30'
                    }`}>
                      <input type="checkbox" checked={selectedPersonaIds.includes(p.id)} onChange={() => togglePersona(p.id)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-body-sm font-medium text-black truncate">{p.label}</p>
                        <p className="text-caption text-black/40">{p.age}세 · {p.region} · {p.educationLevel}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past sessions */}
      <section className="bg-[#f7f7f5] border-t border-[#e6e6e6] px-6 md:px-16 py-14">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow text-black/50 mb-8">Past Sessions</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="border-b border-[#e6e6e6]">
                  {['Session', 'Personas', 'Documents', 'Questions', 'Progress', 'Status', 'Created'].map((h) => (
                    <th key={h} className="text-caption text-black/40 text-left py-3 pr-6 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockSessions.map((s) => (
                  <tr key={s.id} className="border-b border-[#f1f1f1] hover:bg-white transition-colors">
                    <td className="py-4 pr-6 whitespace-nowrap"><span className="text-body-sm font-semibold text-black">{s.title}</span></td>
                    <td className="py-4 pr-6 whitespace-nowrap"><span className="text-body-sm text-black/60">{s.personaIds.length}</span></td>
                    <td className="py-4 pr-6 whitespace-nowrap"><span className="text-body-sm text-black/60">{s.documentIds.length}</span></td>
                    <td className="py-4 pr-6 whitespace-nowrap"><span className="text-body-sm text-black">{s.totalQuestions}</span></td>
                    <td className="py-4 pr-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-[#e6e6e6] rounded-full overflow-hidden">
                          <div className="h-full bg-black rounded-full" style={{ width: `${s.totalQuestions ? (s.evaluatedQuestions / s.totalQuestions) * 100 : 0}%` }} />
                        </div>
                        <span className="text-caption text-black/40">{s.evaluatedQuestions}/{s.totalQuestions}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-6 whitespace-nowrap"><StatusBadge status={s.status} /></td>
                    <td className="py-4 pr-6 whitespace-nowrap"><span className="text-caption text-black/40">{s.createdDate}</span></td>
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

// ─── Chat Workspace ───────────────────────────────────────────────────────────
type PlayState = 'idle' | 'typing-search' | 'typing-found' | 'typing-answer' | 'done';

function ChatWorkspace({ session, onFinish }: { session: TestSession; onFinish: () => void }) {
  const navigate = useNavigate();
  const allQuestions = mockWorkspaceQuestions;
  const [qIdx, setQIdx] = useState(0);
  const [playState, setPlayState] = useState<PlayState>('idle');
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [manualInput, setManualInput] = useState('');
  const [activeChunkId, setActiveChunkId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentQ: WorkspaceQuestion | undefined = allQuestions[qIdx];
  const currentPersona = currentQ ? mockPersonas.find((p) => p.id === currentQ.personaId) : null;

  // auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMessages]);

  // animate messages in sequence
  const runPlayback = () => {
    if (!currentQ) return;
    setVisibleMessages([]);
    setPlayState('typing-search');
    setActiveChunkId(null);

    const msgs = currentQ.messages;
    let i = 0;
    const delays = [0, 700, 1400, 2800];

    const show = () => {
      if (i >= msgs.length) { setPlayState('done'); return; }
      const m = msgs[i];
      const delay = delays[i] ?? delays[delays.length - 1];
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, m]);
        if (m.role === 'searching') setPlayState('typing-search');
        if (m.role === 'found') setPlayState('typing-found');
        if (m.role === 'rag') setPlayState('typing-answer');
        i++;
        show();
      }, i === 0 ? 0 : delays[i] - delays[i - 1]);
    };
    show();
  };

  // auto-start on question change
  useEffect(() => {
    if (currentQ) runPlayback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIdx]);

  const handleManualSend = () => {
    if (!manualInput.trim()) return;
    const userMsg: ChatMessage = { id: `manual-${Date.now()}`, role: 'persona', content: manualInput.trim() };
    setVisibleMessages((prev) => [...prev, userMsg]);
    setManualInput('');
    setTimeout(() => {
      const searchMsg: ChatMessage = { id: `search-${Date.now()}`, role: 'searching', content: '업로드된 문서에서 관련 정보를 검색하는 중...' };
      setVisibleMessages((prev) => [...prev, searchMsg]);
    }, 400);
    setTimeout(() => {
      const ragMsg: ChatMessage = {
        id: `rag-${Date.now()}`,
        role: 'rag',
        content: '입력하신 질문과 관련된 정보를 문서에서 찾았습니다. 실제 RAG 시스템이 연결되면 여기에 공식 문서 기반 답변이 표시됩니다.',
      };
      setVisibleMessages((prev) => [...prev, ragMsg]);
    }, 1600);
  };

  const handleGenerateQuestion = () => {
    if (!currentPersona) return;
    const sampleQs = [
      `${currentPersona.age}세 ${currentPersona.educationLevel} 학생으로서, ${currentPersona.situation.slice(0, 30)}... 어떻게 하면 되나요?`,
      `저는 ${currentPersona.region} 출신 ${currentPersona.educationLevel} 학생입니다. ${currentPersona.interests.split(',')[0]} 관련 정보를 알고 싶습니다.`,
    ];
    const q = sampleQs[Math.floor(Math.random() * sampleQs.length)];
    setManualInput(q);
  };

  // current evaluated answer from last rag message
  const ragMsg = [...visibleMessages].reverse().find((m: ChatMessage) => m.role === 'rag');
  const evidenceChunks = ragMsg?.chunks ?? [];
  const scores = currentQ?.scores;
  const totalScore = currentQ?.totalScore ?? 0;

  const progressPct = allQuestions.length
    ? Math.round(((qIdx + (playState === 'done' ? 1 : 0)) / allQuestions.length) * 100)
    : 0;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Workspace top bar */}
      <div className="w-full bg-white border-b border-[#e6e6e6] px-4 md:px-8 h-14 flex items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[14px] font-semibold text-black truncate">{session.title}</span>
          <StatusBadge status="RUNNING" />
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-24 h-1.5 bg-[#e6e6e6] rounded-full overflow-hidden">
              <div className="h-full bg-black rounded-full transition-all" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="text-caption text-black/40">Q {qIdx + 1} / {allQuestions.length}</span>
          </div>
          <button className="btn-secondary !py-2 !px-4 !text-[13px]" onClick={onFinish}>
            <BarChart2 size={14} />
            View Dashboard
          </button>
        </div>
      </div>

      {/* 3-column workspace */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* LEFT — Persona Context */}
        <aside className="hidden md:flex flex-col w-[260px] shrink-0 border-r border-[#e6e6e6] bg-[#f7f7f5] overflow-y-auto">
          <div className="p-5 flex flex-col gap-5">
            {currentPersona ? (
              <>
                <div className="bg-block-lilac rounded-lg px-4 py-4">
                  <p className="text-caption text-black/50 mb-1">Current Persona</p>
                  <p className="text-body-sm font-bold text-black leading-snug">{currentPersona.label}</p>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Age', value: `${currentPersona.age}세` },
                    { label: 'Region', value: currentPersona.region },
                    { label: 'Year', value: currentPersona.educationLevel },
                  ].map((f) => (
                    <div key={f.label} className="flex items-center justify-between">
                      <span className="text-caption text-black/40">{f.label}</span>
                      <span className="text-body-sm font-medium text-black">{f.value}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-caption text-black/40 mb-1.5">Situation</p>
                  <p className="text-[13px] text-black/70 leading-relaxed">{currentPersona.situation}</p>
                </div>
                <div>
                  <p className="text-caption text-black/40 mb-2">Interests</p>
                  <div className="flex flex-wrap gap-1.5">
                    {currentPersona.interests.split(',').map((t) => (
                      <span key={t} className="text-[11px] bg-white border border-[#e6e6e6] px-2 py-0.5 rounded-full text-black/60">{t.trim()}</span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-[#e6e6e6] pt-4">
                  <p className="text-caption text-black/40 mb-2">Session</p>
                  <p className="text-[13px] font-medium text-black mb-1">{session.title}</p>
                  <p className="text-[12px] text-black/40">Question {qIdx + 1} of {allQuestions.length}</p>
                </div>
                <div className="border-t border-[#e6e6e6] pt-4">
                  <p className="text-caption text-black/40 mb-2">Documents used</p>
                  {session.documentTitles.map((t) => (
                    <div key={t} className="flex items-start gap-1.5 mb-1.5">
                      <FileText size={11} className="text-black/30 mt-0.5 shrink-0" />
                      <p className="text-[12px] text-black/60 leading-snug">{t}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-body-sm text-black/30">No persona loaded.</p>
            )}
          </div>
        </aside>

        {/* CENTER — Chat */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Chat scroll area */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 flex flex-col gap-4">
            {visibleMessages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
                <div className="w-12 h-12 rounded-full bg-block-lime flex items-center justify-center">
                  <Play size={20} />
                </div>
                <p className="text-body-sm text-black/40">Starting evaluation…</p>
              </div>
            )}

            {visibleMessages.map((msg) => (
              <ChatBubble
                key={msg.id}
                msg={msg}
                activeChunkId={activeChunkId}
                onChunkClick={(id) => setActiveChunkId(activeChunkId === id ? null : id)}
              />
            ))}

            {/* Typing indicator */}
            {playState === 'typing-search' && visibleMessages.some((m) => m.role === 'searching') && (
              <div className="flex items-center gap-2 text-body-sm text-black/40">
                <Loader size={14} className="animate-spin" />
                <span>Searching uploaded documents…</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input bar */}
          <div className="border-t border-[#e6e6e6] px-4 md:px-6 py-4 bg-white">
            <div className="flex items-center gap-3">
              <button
                className="btn-secondary !py-2 !px-4 !text-[13px] shrink-0"
                onClick={handleGenerateQuestion}
              >
                <Zap size={13} />
                Generate Q
              </button>
              <input
                className="flex-1 min-w-0 bg-[#f7f7f5] border border-[#e6e6e6] rounded-full px-4 py-2.5 text-[15px] outline-none focus:border-black transition-colors placeholder:text-black/30"
                placeholder="Ask a question as this persona..."
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleManualSend()}
              />
              <button
                className="btn-icon shrink-0"
                onClick={handleManualSend}
              >
                <Send size={15} />
              </button>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="border-t border-[#e6e6e6] px-4 md:px-8 py-3 bg-white flex items-center justify-between gap-3">
            <button
              className="btn-secondary !py-2 !px-4 !text-[13px]"
              disabled={qIdx === 0}
              onClick={() => { setQIdx((i) => i - 1); }}
            >
              <ChevronLeft size={15} /> Previous
            </button>
            <span className="text-caption text-black/40">Q {qIdx + 1} / {allQuestions.length}</span>
            {qIdx < allQuestions.length - 1 ? (
              <button
                className="btn-primary !py-2 !px-4 !text-[13px]"
                onClick={() => { setQIdx((i) => i + 1); }}
              >
                Next <ChevronRight size={15} />
              </button>
            ) : (
              <button className="btn-primary !py-2 !px-4 !text-[13px]" onClick={onFinish}>
                View Dashboard <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT — Evidence + Evaluation */}
        <aside className="hidden lg:flex flex-col w-[300px] shrink-0 border-l border-[#e6e6e6] overflow-y-auto bg-white">
          <div className="p-5 flex flex-col gap-5">
            {/* Evidence */}
            <div>
              <p className="text-eyebrow text-black/40 mb-3">Retrieved Evidence</p>
              {evidenceChunks.length === 0 ? (
                <p className="text-[13px] text-black/30">Evidence will appear here after the RAG search.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {(evidenceChunks as import('@/data/mockData').EvidenceChunk[]).map((chunk) => (
                    <div
                      key={chunk.chunkId}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        activeChunkId === chunk.chunkId
                          ? 'border-black bg-[#f7f7f5]'
                          : 'border-[#e6e6e6] hover:border-black/30'
                      }`}
                      onClick={() => setActiveChunkId(activeChunkId === chunk.chunkId ? null : chunk.chunkId)}
                    >
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <FileText size={11} className="text-black/40 shrink-0" />
                        <span className="text-[12px] font-medium text-black leading-snug">{chunk.documentTitle}</span>
                        <span className="text-[10px] bg-[#f7f7f5] border border-[#e6e6e6] px-1.5 py-0.5 rounded text-black/40 font-mono">{chunk.chunkId}</span>
                      </div>
                      <p className="text-[12px] text-black/60 leading-relaxed">{chunk.previewText}</p>
                      <p className="text-[11px] text-black/30 mt-1.5">RAG used this section to generate the answer.</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live evaluation */}
            {scores && (
              <div className="border-t border-[#e6e6e6] pt-5">
                <p className="text-eyebrow text-black/40 mb-4">Automatic Evaluation</p>
                <div className="flex flex-col gap-2.5 mb-4">
                  {(Object.entries(scores) as [string, number][]).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between gap-2">
                      <span className="text-[13px] text-black/60 capitalize">
                        {key === 'personaReflection' ? 'Persona Reflection' : key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1 bg-[#e6e6e6] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${val >= 4 ? 'bg-[#1ea64a]' : val >= 3 ? 'bg-[#e6c900]' : 'bg-[#ff3d8b]'}`}
                            style={{ width: `${(val / 5) * 100}%` }}
                          />
                        </div>
                        <ScoreBadge score={val} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-body-sm font-semibold text-black">Total</span>
                  <TotalScoreBadge total={totalScore} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-black/40">Percentage</span>
                  <span className="text-[14px] font-bold text-black">{Math.round((totalScore / 25) * 100)}/100</span>
                </div>
                {currentQ?.issueSummary && (
                  <div className="mt-4 bg-[#ff3d8b]/8 border border-[#ff3d8b]/20 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <AlertTriangle size={12} className="text-[#ff3d8b] shrink-0" />
                      <span className="text-[11px] font-semibold text-[#ff3d8b] uppercase tracking-wide" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Issue</span>
                    </div>
                    <p className="text-[12px] text-black/70">{currentQ.issueSummary}</p>
                  </div>
                )}
                {currentQ?.improvementSuggestion && (
                  <div className="mt-3 bg-[#f7f7f5] border border-[#e6e6e6] rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <CheckCircle size={12} className="text-black/40 shrink-0" />
                      <span className="text-[11px] font-semibold text-black/40 uppercase tracking-wide" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Suggestion</span>
                    </div>
                    <p className="text-[12px] text-black/70">{currentQ.improvementSuggestion}</p>
                  </div>
                )}
              </div>
            )}

            {/* Progress */}
            <div className="border-t border-[#e6e6e6] pt-5">
              <p className="text-eyebrow text-black/40 mb-3">Session Progress</p>
              {[
                { label: 'Questions generated', val: allQuestions.length, total: allQuestions.length },
                { label: 'RAG answers', val: Math.min(qIdx + (playState === 'done' ? 1 : 0), allQuestions.length), total: allQuestions.length },
                { label: 'Evaluated', val: Math.max(0, qIdx), total: allQuestions.length },
              ].map((row) => (
                <div key={row.label} className="mb-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] text-black/60">{row.label}</span>
                    <span className="text-[12px] font-medium text-black">{row.val}/{row.total}</span>
                  </div>
                  <div className="h-1 bg-[#e6e6e6] rounded-full overflow-hidden">
                    <div className="h-full bg-black rounded-full" style={{ width: `${(row.val / row.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ─── Chat Bubble ──────────────────────────────────────────────────────────────
function ChatBubble({
  msg, activeChunkId, onChunkClick,
}: {
  msg: ChatMessage;
  activeChunkId: string | null;
  onChunkClick: (id: string) => void;
}) {
  if (msg.role === 'persona') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[70%] bg-black text-white rounded-2xl rounded-br-sm px-4 py-3">
          <p className="text-[14px] leading-relaxed">{msg.content}</p>
        </div>
      </div>
    );
  }
  if (msg.role === 'searching') {
    return (
      <div className="flex items-center gap-2.5 text-black/50">
        <Search size={14} className="animate-pulse shrink-0" />
        <span className="text-[13px]">Searching uploaded documents…</span>
      </div>
    );
  }
  if (msg.role === 'found') {
    return (
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 rounded-full bg-block-lime flex items-center justify-center shrink-0">
          <CheckCircle size={12} />
        </div>
        <span className="text-[13px] text-black/60">{msg.content}</span>
        {msg.chunks?.map((c) => (
          <button
            key={c.chunkId}
            onClick={() => onChunkClick(c.chunkId)}
            className={`text-[11px] font-mono border px-2 py-0.5 rounded transition-colors ${
              activeChunkId === c.chunkId
                ? 'bg-black text-white border-black'
                : 'bg-white border-[#e6e6e6] text-black/50 hover:border-black/40'
            }`}
          >
            {c.documentTitle.slice(0, 10)}… · {c.chunkId.split('-').slice(-2).join('-')}
          </button>
        ))}
      </div>
    );
  }
  // rag
  return (
    <div className="flex justify-start">
      <div className="max-w-[75%] flex flex-col gap-3">
        <div className="bg-[#f7f7f5] border border-[#e6e6e6] rounded-2xl rounded-bl-sm px-4 py-3">
          <p className="text-[14px] leading-relaxed text-black">{msg.content}</p>
        </div>
        {msg.chunks && msg.chunks.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pl-1">
            {msg.chunks.map((c) => (
              <button
                key={c.chunkId}
                onClick={() => onChunkClick(c.chunkId)}
                className={`flex items-center gap-1 text-[11px] font-mono border px-2.5 py-1 rounded-full transition-colors ${
                  activeChunkId === c.chunkId
                    ? 'bg-black text-white border-black'
                    : 'bg-white border-[#e6e6e6] text-black/50 hover:border-black/40'
                }`}
              >
                <FileText size={10} />
                {c.documentTitle.slice(0, 12)}… · {c.chunkId.split('-').slice(-2).join('-')}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function TestSessionsPage() {
  const navigate = useNavigate();
  const [activeSession, setActiveSession] = useState<TestSession | null>(null);

  if (activeSession) {
    return (
      <ChatWorkspace
        session={activeSession}
        onFinish={() => navigate('/results')}
      />
    );
  }
  return <SessionSetup onStart={setActiveSession} />;
}
