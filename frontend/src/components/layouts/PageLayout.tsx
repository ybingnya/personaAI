import type { ReactNode } from 'react';
import TopNav from './TopNav';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNav />
      <main className="flex-1 w-full">
        {children}
      </main>
      <footer className="border-t border-[#e6e6e6] py-6 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          <span className="text-caption text-black/40">personaAI — RAG Answer Evaluation Platform</span>
          <span className="text-caption text-black/30">PROTOTYPE · MOCK DATA ONLY</span>
        </div>
      </footer>
    </div>
  );
}
