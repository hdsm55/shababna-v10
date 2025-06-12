import { useState, Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import './index.css';
import './utils/i18n'; // Initialize i18n before components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Loader } from './components/ui/Loader';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const ContactDonatePage = lazy(() => import('./pages/ContactDonatePage'));
const VolunteerPage = lazy(() => import('./pages/VolunteerPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Simple 404 component
const NotFound = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 font-tajawal">404</h1>
        <p className="text-xl mb-8 font-almarai">{t('notFound.message', 'Page not found')}</p>
        <a
          href="/"
          className="bg-secondary hover:bg-secondary-600 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 font-almarai"
        >
          {t('notFound.backHome', 'Back to Home')}
        </a>
      </div>
    </div>
  );
};

// React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name?: string; avatar?: string; role?: string } | null>(null);

  // Simulate app initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  // Set document direction based on language
  useEffect(() => {
    document.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 flex items-center justify-center">
        <Loader size="lg" color="white" text="Loading..." />
      </div>
    );
  }

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="App min-h-screen flex flex-col">
            <Header
              isAuthenticated={isAuthenticated}
              user={user}
              onLogout={handleLogout}
            />
            
            <main className="flex-1">
              <Suspense
                fallback={
                  <div className="min-h-screen flex items-center justify-center">
                    <Loader size="lg" />
                  </div>
                }
              >
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/programs" element={<ProgramsPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/contact" element={<ContactDonatePage />} />
                  <Route path="/volunteer" element={<VolunteerPage />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            
            <Footer />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}