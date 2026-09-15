import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Trash2, Eye, FileText, CheckCircle, AlertCircle, X, Layers } from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockDocuments, type Document, type DocumentCategory } from '@/data/mockData';

export default function DocumentsPage() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DocumentCategory>('Scholarship');
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadMsg, setUploadMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowed.includes(file.type)) {
      setUploadState('error');
      setUploadMsg('Unsupported file type. Please upload a PDF, DOCX, or TXT file.');
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
    setUploadState('idle');
    setUploadMsg('');
  };

  const handleUpload = () => {
    if (!title.trim()) {
      setUploadState('error');
      setUploadMsg('Please enter a document title.');
      return;
    }
    if (!selectedFile) {
      setUploadState('error');
      setUploadMsg('Please select a file.');
      return;
    }
    const ext = selectedFile.name.split('.').pop()?.toUpperCase() ?? 'PDF';
    const sizeKB = Math.round(selectedFile.size / 1024);
    const sizeFmt = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      title: title.trim(),
      originalFilename: selectedFile.name,
      category,
      contentType: ext,
      fileSize: sizeFmt,
      status: 'UPLOADED',
      uploadedDate: new Date().toISOString().slice(0, 10),
      chunkCount: undefined,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setTitle('');
    setSelectedFile(null);
    setUploadState('success');
    setUploadMsg(`"${newDoc.title}" uploaded successfully.`);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <PageLayout>
      {/* ── Page Header ─────────────────────────────── */}
      <div className="w-full bg-white px-6 md:px-16 pt-12 pb-8 border-b border-[#e6e6e6]">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow text-black/50 mb-3">Document Management</p>
          <h1 className="text-display-lg text-black text-balance">Documents</h1>
          <p className="text-body text-black/60 mt-3 max-w-[560px]">
            Upload official university documents — scholarship guides, course registration, graduation requirements — that the RAG chatbot will use as its source of truth.
          </p>
        </div>
      </div>

      {/* ── Upload Section ──────────────────────────── */}
      <section className="bg-block-cream px-6 md:px-16 py-14">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow text-black/50 mb-8">Upload Document</p>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-5">
              <div>
                <label className="text-caption text-black/50 block mb-2">Document Title</label>
                <input
                  className="w-full bg-white text-black border border-[#e6e6e6] rounded-md px-3 py-3 text-[16px] outline-none focus:border-black transition-colors placeholder:text-black/30"
                  placeholder="e.g. 2024학년도 1학기 수강신청 안내"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-caption text-black/50 block mb-2">Category</label>
                <select
                  className="w-full bg-white text-black border border-[#e6e6e6] rounded-md px-3 py-3 text-[16px] outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                >
                  <option value="Scholarship">Scholarship</option>
                  <option value="Course Registration">Course Registration</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Academic">Academic</option>
                  <option value="Student Support">Student Support</option>
                  <option value="FAQ">FAQ</option>
                </select>
              </div>
              {uploadState === 'success' && (
                <div className="flex items-center gap-3 bg-[#c8e6cd]/50 border border-[#1ea64a]/20 rounded-md px-4 py-3">
                  <CheckCircle size={16} className="text-[#1ea64a] shrink-0" />
                  <span className="text-body-sm text-[#1ea64a]">{uploadMsg}</span>
                </div>
              )}
              {uploadState === 'error' && (
                <div className="flex items-center gap-3 bg-[#ff3d8b]/10 border border-[#ff3d8b]/20 rounded-md px-4 py-3">
                  <AlertCircle size={16} className="text-[#ff3d8b] shrink-0" />
                  <span className="text-body-sm text-[#ff3d8b]">{uploadMsg}</span>
                </div>
              )}
              <button className="btn-primary self-start" onClick={handleUpload}>
                <Upload size={18} />
                Upload Document
              </button>
            </div>

            {/* Drop zone */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center gap-4 text-center transition-colors cursor-pointer min-h-[200px] ${
                dragOver ? 'border-black bg-white/60' : 'border-[#c0b090] bg-white/40'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files[0];
                if (f) handleFile(f);
              }}
              onClick={() => fileRef.current?.click()}
            >
              <FileText size={32} className="text-black/30" />
              {selectedFile ? (
                <div className="flex items-center gap-2">
                  <span className="text-body-sm font-medium text-black">{selectedFile.name}</span>
                  <button
                    className="text-black/40 hover:text-black"
                    onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-body-sm text-black/60">Drag & drop or click to select</p>
                  <p className="text-caption text-black/40">PDF · DOCX · TXT</p>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Document List ───────────────────────────── */}
      <section className="bg-white px-6 md:px-16 py-16">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow text-black/50 mb-8">All Documents ({documents.length})</p>
          {documents.length === 0 ? (
            <div className="border border-dashed border-[#e6e6e6] rounded-lg p-16 text-center">
              <FileText size={40} className="text-black/20 mx-auto mb-4" />
              <p className="text-headline text-black/30">No documents yet</p>
              <p className="text-body-sm text-black/40 mt-2">Upload your first document above to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead>
                  <tr className="border-b border-[#e6e6e6]">
                    {['Title', 'Filename', 'Category', 'Type', 'Size', 'Chunks', 'Status', 'Uploaded', 'Actions'].map((h) => (
                      <th key={h} className="text-caption text-black/40 text-left py-3 pr-6 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id} className="border-b border-[#f1f1f1] hover:bg-[#f7f7f5] transition-colors group">
                      <td className="py-4 pr-6 whitespace-nowrap">
                        <span className="text-body-sm font-semibold text-black">{doc.title}</span>
                      </td>
                      <td className="py-4 pr-6 whitespace-nowrap">
                        <span className="text-body-sm text-black/50">{doc.originalFilename}</span>
                      </td>
                      <td className="py-4 pr-6 whitespace-nowrap">
                        <span className="text-caption bg-[#f7f7f5] px-2.5 py-1 rounded-full text-black/60">{doc.category}</span>
                      </td>
                      <td className="py-4 pr-6 whitespace-nowrap">
                        <span className="text-caption text-black/50">{doc.contentType}</span>
                      </td>
                      <td className="py-4 pr-6 whitespace-nowrap">
                        <span className="text-body-sm text-black/50">{doc.fileSize}</span>
                      </td>
                      <td className="py-4 pr-6 whitespace-nowrap">
                        {doc.chunkCount != null ? (
                          <span className="flex items-center gap-1 text-caption text-black/60">
                            <Layers size={11} className="text-black/30" />{doc.chunkCount}
                          </span>
                        ) : (
                          <span className="text-caption text-black/25">—</span>
                        )}
                      </td>
                      <td className="py-4 pr-6 whitespace-nowrap">
                        <StatusBadge status={doc.status} />
                      </td>
                      <td className="py-4 pr-6 whitespace-nowrap">
                        <span className="text-caption text-black/40">{doc.uploadedDate}</span>
                      </td>
                      <td className="py-4 pr-6 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            className="btn-icon w-8 h-8"
                            title="View details"
                            onClick={() => navigate(`/documents/${doc.id}`)}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="btn-icon w-8 h-8 hover:bg-[#ff3d8b]/10 hover:border-[#ff3d8b]/30"
                            title="Delete"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <Trash2 size={14} className="text-black/60 group-hover:text-[#ff3d8b]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
