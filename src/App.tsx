import React from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ServiceModal } from './components/ServiceModal';
import { ProjectModal } from './components/ProjectModal';
import { AdminPanel } from './components/AdminPanel';
import { QuoteSection } from './components/QuoteSection';
import { ErrorFallback } from './components/ErrorFallback';
import { KamgridBrandTransition } from './components/BrandLoader';

// Page Views
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { CapabilityPage } from './pages/CapabilityPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const {
    currentPath,
    selectedServiceModal,
    setSelectedServiceModal,
    selectedProjectModal,
    setSelectedProjectModal,
    isQuoteModalOpen,
    setIsQuoteModalOpen,
    isAdmin,
  } = useCMS();

  // Route Resolver
  const renderCurrentPage = () => {
    // Exact match: Home
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }

    // Exact match: About
    if (currentPath === '/about') {
      return <AboutPage />;
    }

    // Exact match: Services index
    if (currentPath === '/services') {
      return <ServicesPage />;
    }

    // Dynamic match: Service Detail (/services/:id)
    if (currentPath.startsWith('/services/')) {
      const serviceId = currentPath.replace('/services/', '').trim();
      return <ServiceDetailPage serviceId={serviceId} />;
    }

    // Exact match: Projects index
    if (currentPath === '/projects') {
      return <ProjectsPage />;
    }

    // Dynamic match: Project Detail (/projects/:id)
    if (currentPath.startsWith('/projects/')) {
      const projectId = currentPath.replace('/projects/', '').trim();
      return <ProjectDetailPage projectId={projectId} />;
    }

    // Exact match: Operational Capability
    if (currentPath === '/capability') {
      return <CapabilityPage />;
    }

    // Exact match: Contact & Quotes
    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // Fallback: 404
    return (
      <div className="py-20">
        <ErrorFallback message="The requested engineering view or document was not found." />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Persistent Responsive Header & Navigation */}
      <Navbar />

      {/* Non-Blocking Branded Engineering Visual Transition */}
      <KamgridBrandTransition activePath={currentPath} />

      {/* Dynamic Route View Content - Renders Immediately */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Persistent Engineering Footer */}
      <Footer />

      {/* Direct WhatsApp Quick Floating Trigger */}
      <WhatsAppButton />

      {/* Global Interactive Service Detail Modal (if triggered via modal action) */}
      {selectedServiceModal && (
        <ServiceModal
          service={selectedServiceModal}
          onClose={() => setSelectedServiceModal(null)}
        />
      )}

      {/* Global Interactive Project Detail Modal (if triggered via modal action) */}
      {selectedProjectModal && (
        <ProjectModal
          project={selectedProjectModal}
          onClose={() => setSelectedProjectModal(null)}
        />
      )}

      {/* Global Request a Quote Modal / Drawer */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-3xl my-auto">
            <QuoteSection
              isModalMode={true}
              onCloseModal={() => setIsQuoteModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Live CMS Admin Panel */}
      {isAdmin && <AdminPanel />}
    </div>
  );
};

export default function App() {
  return (
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  );
}


