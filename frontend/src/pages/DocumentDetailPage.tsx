import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, AlertCircle, Loader, Layers } from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockDocuments, mockChunks } from '@/data/mockData';

type StepState = 'completed' | 'active' | 'pending' | 'failed';

interface TimelineStep {
  label: string;
  description: string;
  state: StepState;
}

function getTimeline(status: string): TimelineStep[] {
  const allSteps = ['Uploaded', 'Text Extracted', 'Chunked', 'Embedded', 'Ready'];
  const completedIndex: Record<string, number> = {
    UPLOADED: 0,
    PROCESSING: 1,
    READY: 4,
    FAILED: 1,
  };
  const done = completedIndex[status] ?? 0;

  return allSteps.map((label, i) => {
    let state: StepState = 'pending';
    if (status === 'FAILED' && i === 1) state = 'failed';
    else if (i < done) state = 'completed';
    else if (i === done && status !== 'FAILED') state = 'active';
    return {
      label,
      description: [
        'Document received and stored in the system.',
        'Raw text extracted from the file (PDF/DOCX/TXT parser).',
        'Text split into semantic chunks for vector indexing.',
        'Chunks encoded into vector embeddings via embedding model.',
        'Document is fully indexed and ready for RAG retrieval.',
      ][i],
      state,
    };
  });
}

function StepIcon({ state }: { state: StepState }) {
  if (state === 'completed') return <CheckCircle size={22} className="text-[#1ea64a] shrink-0" />;
  if (state === 'failed') return <AlertCircle size={22} className="text-[#ff3d8b] shrink-0" />;
  if (state === 'active') return <Loader size={22} className="text-black shrink-0 animate-spin" />;
  return <Circle size={22} className="text-black/20 shrink-0" />;
}

export default function DocumentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const doc = mockDocuments.find((d) => d.id === id);
  const chunks = doc ? (mockChunks[doc.id] ?? []) : [];

  if (!doc) {
    return (
      <PageLayout>
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 py-24 text-center">
          <p className="text-headline text-black/40">Document not found.</p>
          <button className="btn-primary mt-6" onClick={() => navigate('/documents')}>
            Back to Documents
          </button>
        </div>
      </PageLayout>
    );
  }

  const timeline = getTimeline(doc.status);

  return (
    <PageLayout>
      {/* Header */}
      <div className="w-full bg-white px-6 md:px-16 pt-10 pb-8 border-b border-[#e6e6e6]">
        <div className="max-w-[1200px] mx-auto">
          <button
            className="flex items-center gap-2 text-body-sm text-black/50 hover:text-black mb-6 transition-colors"
            onClick={() => navigate('/documents')}
          >
            <ArrowLeft size={16} /> Back to Documents
          </button>
          <div className="flex items-start gap-4 flex-wrap justify-between">
            <div>
              <p className="text-eyebrow text-black/50 mb-2">{doc.category}</p>
              <h1 className="text-display-lg text-black text-balance max-w-[800px]">{doc.title}</h1>
            </div>
            <StatusBadge status={doc.status} />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-16 py-12 flex flex-col gap-8">
        {/* Metadata Card */}
        <div className="card-editorial">
          <p className="text-eyebrow text-black/50 mb-6">Document Metadata</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
            {[
              { label: 'File Name', value: doc.originalFilename },
              { label: 'Title', value: doc.title },
              { label: 'Category', value: doc.category },
              { label: 'Content Type', value: doc.contentType },
              { label: 'File Size', value: doc.fileSize },
              { label: 'Uploaded Date', value: doc.uploadedDate },
              { label: 'Chunks', value: doc.chunkCount != null ? `${doc.chunkCount} chunks` : '—' },
            ].map((f) => (
              <div key={f.label}>
                <p className="text-caption text-black/40 mb-1">{f.label}</p>
                <p className="text-body-sm font-medium text-black break-words">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Timeline */}
        <section className="bg-block-lilac rounded-lg p-8 md:p-10">
          <p className="text-eyebrow text-black/60 mb-8">Processing Pipeline</p>
          <div className="flex flex-col gap-0">
            {timeline.map((step, i) => (
              <div key={step.label} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <StepIcon state={step.state} />
                  {i < timeline.length - 1 && (
                    <div className={`w-px flex-1 my-1 ${step.state === 'completed' ? 'bg-[#1ea64a]/40' : 'bg-black/15'}`} style={{ minHeight: '32px' }} />
                  )}
                </div>
                <div className="pb-6">
                  <p className={`text-body-sm font-semibold mb-1 ${step.state === 'pending' ? 'text-black/40' : step.state === 'failed' ? 'text-[#ff3d8b]' : 'text-black'}`}>
                    {step.label}
                  </p>
                  <p className={`text-body-sm ${step.state === 'pending' ? 'text-black/30' : 'text-black/60'}`}>
                    {step.description}
                  </p>
                  {(step.state === 'pending' || step.state === 'active') && step.label !== 'Uploaded' && (
                    <p className="text-caption text-black/40 mt-1">Not active in this prototype</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {doc.status === 'FAILED' && (
            <div className="mt-4 bg-[#ff3d8b]/10 border border-[#ff3d8b]/20 rounded-md px-5 py-4">
              <p className="text-body-sm font-semibold text-[#ff3d8b] mb-1">Processing Failed</p>
              <p className="text-body-sm text-black/60">Text extraction encountered an error. Check the file format and try re-uploading.</p>
            </div>
          )}
        </section>

        {/* Generated Chunks */}
        <div className="card-editorial">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Layers size={16} className="text-black/40" />
              <p className="text-eyebrow text-black/50">Generated Chunks</p>
            </div>
            {doc.chunkCount != null && (
              <span className="text-caption bg-[#f7f7f5] border border-[#e6e6e6] px-3 py-1 rounded-full text-black/50">
                {doc.chunkCount} total
              </span>
            )}
          </div>
          {chunks.length > 0 ? (
            <>
              <p className="text-body-sm text-black/50 mb-5">
                Long documents are divided into smaller sections so the AI can quickly find relevant information. Each chunk is independently searchable.
              </p>
              <div className="flex flex-col gap-3">
                {chunks.map((chunk) => (
                  <div key={chunk.chunkId} className="bg-[#f7f7f5] border border-[#e6e6e6] rounded-md p-4">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-[11px] font-mono bg-white border border-[#e6e6e6] px-2 py-0.5 rounded text-black/40">
                        Chunk #{chunk.chunkIndex}
                      </span>
                      <span className="text-caption text-black/30">{chunk.charCount} chars</span>
                    </div>
                    <p className="text-body-sm text-black/70 leading-relaxed">{chunk.previewText}</p>
                  </div>
                ))}
                {doc.chunkCount != null && doc.chunkCount > chunks.length && (
                  <p className="text-caption text-black/30 text-center py-3">
                    + {doc.chunkCount - chunks.length} more chunks not shown in prototype
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="bg-[#f7f7f5] border border-[#e6e6e6] rounded-md p-6 min-h-[100px] flex items-center justify-center">
              <p className="text-body-sm text-black/30 text-center">
                {doc.status === 'READY'
                  ? 'Chunk previews not available for this document in the prototype.'
                  : 'Chunks will be generated after the document finishes processing.'}
              </p>
            </div>
          )}
        </div>

        {/* Extracted Text Preview */}
        <div className="card-editorial">
          <div className="flex items-center justify-between mb-6">
            <p className="text-eyebrow text-black/50">Extracted Text Preview</p>
            <span className="text-caption bg-[#f7f7f5] border border-[#e6e6e6] px-3 py-1 rounded-full text-black/40">
              PROTOTYPE — NOT LIVE
            </span>
          </div>
          <div className="bg-[#f7f7f5] border border-[#e6e6e6] rounded-md p-6 min-h-[80px] flex items-center justify-center">
            <p className="text-body-sm text-black/30 text-center">
              Extracted text will appear here once the document is processed by the parsing pipeline.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
