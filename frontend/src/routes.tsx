import type { ReactNode } from 'react';
import DocumentsPage from './pages/DocumentsPage';
import DocumentDetailPage from './pages/DocumentDetailPage';
import PersonasPage from './pages/PersonasPage';
import TestSessionsPage from './pages/TestSessionsPage';
import ResultsPage from './pages/ResultsPage';
import ResultDetailPage from './pages/ResultDetailPage';
import SettingsPage from './pages/SettingsPage';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  public?: boolean;
}

export const routes: RouteConfig[] = [
  { name: 'Documents',       path: '/',                element: <DocumentsPage />,      public: true },
  { name: 'Documents',       path: '/documents',       element: <DocumentsPage />,      public: true },
  { name: 'Document Detail', path: '/documents/:id',   element: <DocumentDetailPage />, public: true },
  { name: 'Personas',        path: '/personas',        element: <PersonasPage />,       public: true },
  { name: 'Test Sessions',   path: '/sessions',        element: <TestSessionsPage />,   public: true },
  { name: 'Results',         path: '/results',         element: <ResultsPage />,        public: true },
  { name: 'Result Detail',   path: '/results/:id',     element: <ResultDetailPage />,   public: true },
  { name: 'Settings',        path: '/settings',        element: <SettingsPage />,       public: true },
];
