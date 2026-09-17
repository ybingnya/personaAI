import { Server, Database, Layers, ClipboardList, Info } from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';

interface SettingCardProps {
  icon: React.ReactNode;
  title: string;
  placeholder: string;
  description: string;
}

function SettingCard({ icon, title, placeholder, description }: SettingCardProps) {
  return (
    <div className="card-sm flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="btn-icon w-9 h-9 shrink-0">{icon}</div>
        <p className="text-body-sm font-semibold text-black">{title}</p>
      </div>
      <input
        className="w-full bg-[#f7f7f5] text-black/40 border border-[#e6e6e6] rounded-md px-3 py-3 text-[15px] outline-none cursor-not-allowed"
        value={placeholder}
        disabled
        readOnly
      />
      <p className="text-caption text-black/40">{description}</p>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <PageLayout>
      {/* ── Page Header ─────────────────────────────── */}
      <div className="w-full bg-white px-6 md:px-16 pt-12 pb-8 border-b border-[#e6e6e6]">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow text-black/50 mb-3">System Configuration</p>
          <h1 className="text-display-lg text-black">Settings</h1>
          <p className="text-body text-black/60 mt-3 max-w-[560px]">
            Configure the AI backend, embedding pipeline, vector store, and evaluation rubric. These settings will connect to the Spring Boot and FastAPI services.
          </p>
        </div>
      </div>

      {/* ── Prototype Notice ────────────────────────── */}
      <section className="bg-block-cream px-6 md:px-16 py-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-start gap-4">
            <Info size={20} className="text-black/50 shrink-0 mt-0.5" />
            <div>
              <p className="text-body-sm font-semibold text-black mb-1">Prototype Mode</p>
              <p className="text-body-sm text-black/60 max-w-[640px]">
                These settings are not active in this frontend prototype. All fields are placeholders for the future connection to the Spring Boot backend, FastAPI AI server, MySQL database, and ChromaDB vector store.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Settings Cards ───────────────────────────── */}
      <section className="bg-white px-6 md:px-16 py-16">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">

          <p className="text-eyebrow text-black/50">AI Infrastructure</p>
          <div className="grid md:grid-cols-2 gap-5">
            <SettingCard
              icon={<Server size={16} />}
              title="LLM Provider"
              placeholder="OpenAI GPT-4o (placeholder)"
              description="The language model used for generating persona questions and evaluation. Configured via FastAPI AI server environment variables."
            />
            <SettingCard
              icon={<Layers size={16} />}
              title="Embedding Provider"
              placeholder="text-embedding-3-small (placeholder)"
              description="The embedding model used to encode document chunks for ChromaDB vector storage and RAG retrieval."
            />
          </div>

          <p className="text-eyebrow text-black/50 mt-4">Storage & Evaluation</p>
          <div className="grid md:grid-cols-2 gap-5">
            <SettingCard
              icon={<Database size={16} />}
              title="Vector Database"
              placeholder="ChromaDB — local instance (placeholder)"
              description="The vector store where document chunk embeddings are indexed. Queried during RAG retrieval to find the most relevant evidence chunks."
            />
            <SettingCard
              icon={<ClipboardList size={16} />}
              title="Evaluation Rubric Version"
              placeholder="v1.0.0 — 5-criterion rubric (placeholder)"
              description="Rubric defines the 5 evaluation criteria: Accuracy, Groundedness, Persona Reflection, Clarity, Completeness. Each scored 1–5, total 25."
            />
          </div>

          {/* API Endpoint Overview */}
          <div className="card-editorial mt-4">
            <p className="text-eyebrow text-black/50 mb-6">Future API Mapping</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-body-sm font-semibold text-black mb-3">Spring Boot Backend</p>
                <div className="flex flex-col gap-2">
                  {[
                    'POST /api/documents',
                    'GET /api/documents',
                    'GET /api/documents/:id',
                    'DELETE /api/documents/:id',
                    'GET /api/personas',
                    'POST /api/personas/sample',
                    'POST /api/sessions',
                    'POST /api/sessions/:id/run',
                    'GET /api/results',
                    'GET /api/results/:id',
                  ].map((ep) => (
                    <code key={ep} className="text-caption bg-[#f7f7f5] border border-[#e6e6e6] px-3 py-1.5 rounded-md text-black/60 block">
                      {ep}
                    </code>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-body-sm font-semibold text-black mb-3">FastAPI AI Server</p>
                <div className="flex flex-col gap-2">
                  {[
                    'POST /ai/questions/generate',
                    'POST /ai/rag/answer',
                    'POST /ai/evaluate',
                  ].map((ep) => (
                    <code key={ep} className="text-caption bg-[#f7f7f5] border border-[#e6e6e6] px-3 py-1.5 rounded-md text-black/60 block">
                      {ep}
                    </code>
                  ))}
                </div>
                <p className="text-body-sm font-semibold text-black mb-3 mt-6">Data Stores</p>
                <div className="flex flex-col gap-2">
                  {['MySQL — structured data', 'ChromaDB — vector embeddings'].map((ep) => (
                    <code key={ep} className="text-caption bg-[#f7f7f5] border border-[#e6e6e6] px-3 py-1.5 rounded-md text-black/60 block">
                      {ep}
                    </code>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
