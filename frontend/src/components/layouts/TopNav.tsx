import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Documents', path: '/documents' },
  { label: 'Personas', path: '/personas' },
  { label: 'Test Sessions', path: '/sessions' },
  { label: 'Results', path: '/results' },
];

export default function TopNav() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="w-full bg-white border-b border-[#e6e6e6] sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-[15px] font-black tracking-tight text-black" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.4px' }}>
            persona<span className="text-[#ff3d8b]">AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-[#f7f7f5]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.1px' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="btn-icon md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#e6e6e6] bg-white px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-2.5 rounded-full text-[14px] font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-[#f7f7f5]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
