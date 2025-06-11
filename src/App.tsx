import { useState, Suspense, lazy, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './i18n' // Initialize i18n before components
import Header from './components/Header'
import Footer from './components/Footer'
import Loader from './components/Loader'
import About from './pages/About'
import Login from './pages/Login'
import AdminProjects from './pages/admin/AdminProjects'
import ProtectedRoute from './components/ProtectedRoute'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Events = lazy(() => import('./pages/Events'))
const Join = lazy(() => import('./pages/Join'))
const Contact = lazy(() => import('./pages/Contact'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Donate = lazy(() => import('./pages/Donate'))
const Blog = lazy(() => import('./pages/Blog'))
const WhoWeAre = lazy(() => import('./pages/WhoWeAre'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Partners = lazy(() => import('./pages/Partners'))
const Press = lazy(() => import('./pages/Press'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Reports = lazy(() => import('./pages/Reports'))
const Volunteer = lazy(() => import('./pages/Volunteer'))
const AddProject = lazy(() => import('./pages/admin/AddProject'))
const Users = lazy(() => import('./pages/admin/Users'))
const AdminMembers = lazy(() => import('./pages/admin/AdminMembers'))

// Layout Components
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </>
)

// Simple 404 component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-4 font-tajawal">404</h1>
      <p className="text-xl mb-8 font-almarai">الصفحة غير موجودة</p>
      <a
        href="/"
        className="bg-secondary-400 hover:bg-secondary-500 text-black font-bold px-8 py-3 rounded-xl transition-all duration-300 font-almarai"
      >
        العودة للرئيسية
      </a>
    </div>
  </div>
)

// React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate app initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="App min-h-screen">
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
                  <Loader size="lg" />
                </div>
              }
            >
              <Routes>
                {/* Login Route - No Header/Footer */}
                <Route path="/login" element={<Login />} />

                {/* Admin Routes - No Header/Footer */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminProjects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/projects/add"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<Loader size="lg" />}>
                        <AddProject />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<Loader size="lg" />}>
                        <Users />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/members"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<Loader size="lg" />}>
                        <AdminMembers />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />

                {/* Public Routes - With Header/Footer */}
                <Route
                  path="/"
                  element={
                    <PublicLayout>
                      <Home />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PublicLayout>
                      <About />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <PublicLayout>
                      <Projects />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/projects/:id"
                  element={
                    <PublicLayout>
                      <ProjectDetails />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/events"
                  element={
                    <PublicLayout>
                      <Events />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/join"
                  element={
                    <PublicLayout>
                      <Join />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PublicLayout>
                      <Contact />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/donate"
                  element={
                    <PublicLayout>
                      <Donate />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <PublicLayout>
                      <Blog />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/who-we-are"
                  element={
                    <PublicLayout>
                      <WhoWeAre />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/faq"
                  element={
                    <PublicLayout>
                      <FAQ />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/volunteer"
                  element={
                    <PublicLayout>
                      <Volunteer />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/partners"
                  element={
                    <PublicLayout>
                      <Partners />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/press"
                  element={
                    <PublicLayout>
                      <Press />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/privacy"
                  element={
                    <PublicLayout>
                      <Privacy />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <PublicLayout>
                      <Reports />
                    </PublicLayout>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  )
}