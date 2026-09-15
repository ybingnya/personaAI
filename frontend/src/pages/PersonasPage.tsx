import { useState } from 'react';
import { Users, Plus, MapPin, GraduationCap, Briefcase, Filter, CheckSquare, Square, RefreshCw } from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';
import { mockPersonas, generatePersonas, type Persona } from '@/data/mockData';

const BLOCK_COLORS = [
  'bg-block-lime', 'bg-block-lilac', 'bg-block-cream',
  'bg-block-pink', 'bg-block-mint', 'bg-block-coral',
];

const REGIONS = ['전체', '서울', '부산', '대구', '인천', '광주', '대전', '수원', '전주'];
const YEARS = ['전체', '1학년', '2학년', '3학년', '4학년'];

export default function PersonasPage() {
  const [personas, setPersonas] = useState<Persona[]>(mockPersonas);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filterRegion, setFilterRegion] = useState('전체');
  const [filterYear, setFilterYear] = useState('전체');
  const [generateCount, setGenerateCount] = useState(12);
  const [generating, setGenerating] = useState(false);

  const filtered = personas.filter((p) => {
    if (filterRegion !== '전체' && p.region !== filterRegion) return false;
    if (filterYear !== '전체' && p.educationLevel !== filterYear) return false;
    return true;
  });

  const allSelected = filtered.length > 0 && filtered.every((p) => selectedIds.has(p.id));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filtered.forEach((p) => next.delete(p.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filtered.forEach((p) => next.add(p.id));
        return next;
      });
    }
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const generated = generatePersonas(generateCount);
      setPersonas((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const fresh = generated.filter((g) => !existingIds.has(g.id));
        return [...prev, ...fresh];
      });
      setGenerating(false);
    }, 800);
  };

  return (
    <PageLayout>
      {/* Header */}
      <div className="w-full bg-white px-6 md:px-16 pt-12 pb-8 border-b border-[#e6e6e6]">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-eyebrow text-black/50 mb-3">Persona Management</p>
          <h1 className="text-display-lg text-black text-balance">Personas</h1>
          <p className="text-body text-black/60 mt-3 max-w-[600px]">
            Create virtual Korean university students with different backgrounds and situations to test how the chatbot responds to each one.
          </p>
        </div>
      </div>

      {/* Generator strip */}
      <section className="bg-block-lilac px-6 md:px-16 py-10">
        <div className="max-w-[1200px] mx-auto flex items-center gap-6 flex-wrap justify-between">
          <div>
            <p className="text-eyebrow text-black/60 mb-1">Generate Sample Personas</p>
            <p className="text-body-sm text-black/60 max-w-[480px]">
              Automatically generate realistic Korean student personas with varied ages, regions, and situations.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap shrink-0">
            <select
              className="bg-white border border-[#e6e6e6] rounded-full px-4 py-2.5 text-[15px] text-black outline-none focus:border-black cursor-pointer appearance-none"
              value={generateCount}
              onChange={(e) => setGenerateCount(Number(e.target.value))}
            >
              {[6, 12, 24, 50, 100].map((n) => (
                <option key={n} value={n}>{n} personas</option>
              ))}
            </select>
            <button className="btn-primary !py-3 !px-6 !text-[15px]" onClick={handleGenerate} disabled={generating}>
              {generating ? <RefreshCw size={16} className="animate-spin" /> : <Plus size={16} />}
              {generating ? 'Generating…' : 'Generate Personas'}
            </button>
          </div>
        </div>
      </section>

      {/* Filters + Selection bar */}
      <div className="bg-[#f7f7f5] border-b border-[#e6e6e6] px-6 md:px-16 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center gap-4 flex-wrap justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter size={14} className="text-black/40" />
            {[
              { label: 'Region', value: filterRegion, options: REGIONS, set: setFilterRegion },
              { label: 'Year', value: filterYear, options: YEARS, set: setFilterYear },
            ].map((f) => (
              <select
                key={f.label}
                className="bg-white border border-[#e6e6e6] rounded-full px-3 py-1.5 text-[13px] text-black outline-none focus:border-black cursor-pointer appearance-none"
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
              >
                {f.options.map((o) => <option key={o} value={o}>{f.label}: {o}</option>)}
              </select>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {selectedIds.size > 0 && (
              <span className="text-caption bg-black text-white px-3 py-1 rounded-full">
                {selectedIds.size} selected
              </span>
            )}
            <button
              className="flex items-center gap-1.5 text-[13px] font-medium text-black/60 hover:text-black transition-colors"
              onClick={toggleSelectAll}
            >
              {allSelected ? <CheckSquare size={15} /> : <Square size={15} />}
              {allSelected ? 'Deselect all' : 'Select all'}
            </button>
            <span className="text-caption text-black/40">{filtered.length} personas</span>
          </div>
        </div>
      </div>

      {/* Persona grid */}
      <section className="bg-white px-6 md:px-16 py-12">
        <div className="max-w-[1200px] mx-auto">
          {filtered.length === 0 ? (
            <div className="border border-dashed border-[#e6e6e6] rounded-lg p-20 text-center">
              <Users size={48} className="text-black/20 mx-auto mb-5" />
              <p className="text-headline text-black/30">No personas match current filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p, idx) => (
                <PersonaCard
                  key={p.id}
                  persona={p}
                  index={idx}
                  selected={selectedIds.has(p.id)}
                  onToggle={() => toggleSelect(p.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

function PersonaCard({
  persona, index, selected, onToggle,
}: {
  persona: Persona; index: number; selected: boolean; onToggle: () => void;
}) {
  const headerColor = BLOCK_COLORS[index % BLOCK_COLORS.length];
  return (
    <div
      className={`card-persona flex flex-col gap-0 overflow-hidden !p-0 cursor-pointer transition-all ${
        selected ? 'ring-2 ring-black' : 'hover:ring-1 hover:ring-black/20'
      }`}
      onClick={onToggle}
    >
      <div className={`${headerColor} px-5 pt-5 pb-4 flex items-start justify-between gap-3`}>
        <div>
          <p className="text-caption text-black/50 mb-1">Persona #{String(index + 1).padStart(2, '0')}</p>
          <h3 className="text-body-sm font-bold text-black leading-snug">{persona.label}</h3>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
          selected ? 'bg-black border-black' : 'bg-white/60 border-black/30'
        }`}>
          {selected && <span className="text-white text-[10px] font-bold">✓</span>}
        </div>
      </div>
      <div className="px-5 py-4 flex flex-col gap-3 bg-white flex-1">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          <div>
            <p className="text-caption text-black/40 mb-0.5">Age</p>
            <p className="text-body-sm font-medium text-black">{persona.age}세</p>
          </div>
          <div className="flex items-start gap-1">
            <MapPin size={11} className="text-black/30 mt-1 shrink-0" />
            <div>
              <p className="text-caption text-black/40 mb-0.5">Region</p>
              <p className="text-body-sm font-medium text-black">{persona.region}</p>
            </div>
          </div>
          <div className="flex items-start gap-1">
            <Briefcase size={11} className="text-black/30 mt-1 shrink-0" />
            <div>
              <p className="text-caption text-black/40 mb-0.5">Occupation</p>
              <p className="text-body-sm font-medium text-black">{persona.occupation}</p>
            </div>
          </div>
          <div className="flex items-start gap-1">
            <GraduationCap size={11} className="text-black/30 mt-1 shrink-0" />
            <div>
              <p className="text-caption text-black/40 mb-0.5">Year</p>
              <p className="text-body-sm font-medium text-black">{persona.educationLevel}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-[#f1f1f1] pt-3">
          <p className="text-caption text-black/40 mb-1">Situation</p>
          <p className="text-body-sm text-black/70 leading-relaxed">{persona.situation}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {persona.interests.split(',').map((tag) => (
            <span key={tag} className="text-caption bg-[#f7f7f5] border border-[#e6e6e6] px-2 py-0.5 rounded-full text-black/60">
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
