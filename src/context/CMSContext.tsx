import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CMSData, ProjectItem, ServiceItem, TeamMember, CertificationItem, CompanyInfo, HeroConfig } from '../types';
import { initialCMSData } from '../data/defaultData';

interface CMSContextType {
  data: CMSData;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;

  // Route & Navigation State
  currentPath: string;
  navigate: (path: string) => void;
  isNavigating: boolean;

  selectedServiceModal: ServiceItem | null;
  setSelectedServiceModal: (s: ServiceItem | null) => void;
  selectedProjectModal: ProjectItem | null;
  setSelectedProjectModal: (p: ProjectItem | null) => void;
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (val: boolean) => void;
  preselectedQuoteService: string;
  setPreselectedQuoteService: (s: string) => void;

  // CMS update methods
  updateCompanyInfo: (company: Partial<CompanyInfo>) => void;
  updateHero: (hero: Partial<HeroConfig>) => void;
  updateAboutText: (story: string, solveText: string, capHeadline: string, capText: string, capHighlight: string) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  addCertification: (cert: Omit<CertificationItem, 'id'>) => void;
  updateCertification: (id: string, cert: Partial<CertificationItem>) => void;
  deleteCertification: (id: string) => void;
  resetToDefaults: () => void;
}

const LOCAL_STORAGE_KEY = 'kamgrid_cms_data_v1';

const CMSContext = createContext<CMSContextType | undefined>(undefined);

// Normalize path helper
const normalizePath = (path: string): string => {
  if (!path || path === '' || path === '#') return '/';
  if (path.startsWith('#/')) path = path.slice(1);
  if (path.startsWith('#')) path = '/' + path.slice(1);
  // Remove trailing slash unless root
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path.toLowerCase();
};

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const filteredStats = (parsed.stats || initialCMSData.stats).filter(
          (s: { id?: string; label?: string }) =>
            s.id !== 'stat-4' && !s.label?.includes('SIMULTANEOUSLY')
        );

        // Map fresh local assets if cached services/projects contain old unsplash URLs
        const sanitizedServices = (parsed.services || initialCMSData.services).map((srv: any) => {
          const defaultMatch = initialCMSData.services.find(s => s.id === srv.id);
          if (defaultMatch && (typeof srv.image === 'string' && srv.image.includes('unsplash.com'))) {
            return { ...srv, image: defaultMatch.image };
          }
          return srv;
        });

        const sanitizedProjects = (parsed.projects || initialCMSData.projects).map((prj: any) => {
          const defaultMatch = initialCMSData.projects.find(p => p.id === prj.id);
          if (defaultMatch && Array.isArray(prj.images) && prj.images.some((img: string) => typeof img === 'string' && img.includes('unsplash.com'))) {
            return { ...prj, images: defaultMatch.images };
          }
          return prj;
        });

        return {
          ...initialCMSData,
          ...parsed,
          services: sanitizedServices,
          projects: sanitizedProjects,
          hero: {
            ...initialCMSData.hero,
            ...(parsed.hero || {}),
            heroImage: (parsed.hero?.heroImage && !parsed.hero.heroImage.includes('unsplash.com'))
              ? parsed.hero.heroImage
              : initialCMSData.hero.heroImage,
          },
          stats: filteredStats.length === 3 ? filteredStats : initialCMSData.stats,
          company: { ...initialCMSData.company, ...(parsed.company || {}) },
        };
      }
    } catch (e) {
      console.error('Failed to parse CMS data from storage', e);
    }
    return initialCMSData;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  // Client-side routing state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname && pathname !== '/') {
        return normalizePath(pathname);
      }
      if (hash) {
        return normalizePath(hash);
      }
    }
    return '/';
  });

  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [preselectedQuoteService, setPreselectedQuoteService] = useState<string>('');

  // Handle browser popstate (back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      const newPath = normalizePath(window.location.pathname);
      setCurrentPath(newPath);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Save CMS changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save CMS data to storage', e);
    }
  }, [data]);

  // Navigate function with immediate execution & scroll reset
  const navigate = useCallback((targetPath: string) => {
    const normalized = normalizePath(targetPath);
    if (normalized === currentPath) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    try {
      window.history.pushState({}, '', normalized);
    } catch {
      // fallback in isolated iframes
      window.location.hash = normalized;
    }

    // Scroll to top immediately
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentPath(normalized);
    setIsNavigating(false);
  }, [currentPath]);

  const updateCompanyInfo = (companyPartial: Partial<CompanyInfo>) => {
    setData((prev) => ({
      ...prev,
      company: { ...prev.company, ...companyPartial },
    }));
  };

  const updateHero = (heroPartial: Partial<HeroConfig>) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...heroPartial },
    }));
  };

  const updateAboutText = (
    story: string,
    solveText: string,
    capHeadline: string,
    capText: string,
    capHighlight: string
  ) => {
    setData((prev) => ({
      ...prev,
      aboutStory: story,
      aboutSolveText: solveText,
      capacityHeadline: capHeadline,
      capacityText: capText,
      capacityHighlight: capHighlight,
    }));
  };

  const addProject = (proj: Omit<ProjectItem, 'id'>) => {
    const newProject: ProjectItem = {
      ...proj,
      id: 'proj-' + Date.now(),
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
  };

  const updateProject = (id: string, projPartial: Partial<ProjectItem>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...projPartial } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addService = (srv: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...srv,
      id: 'srv-' + Date.now(),
    };
    setData((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));
  };

  const updateService = (id: string, srvPartial: Partial<ServiceItem>) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...srvPartial } : s)),
    }));
  };

  const deleteService = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  const addTeamMember = (mem: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...mem,
      id: 'team-' + Date.now(),
    };
    setData((prev) => ({
      ...prev,
      team: [...prev.team, newMember],
    }));
  };

  const updateTeamMember = (id: string, memPartial: Partial<TeamMember>) => {
    setData((prev) => ({
      ...prev,
      team: prev.team.map((m) => (m.id === id ? { ...m, ...memPartial } : m)),
    }));
  };

  const deleteTeamMember = (id: string) => {
    setData((prev) => ({
      ...prev,
      team: prev.team.filter((m) => m.id !== id),
    }));
  };

  const addCertification = (cert: Omit<CertificationItem, 'id'>) => {
    const newCert: CertificationItem = {
      ...cert,
      id: 'cert-' + Date.now(),
    };
    setData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }));
  };

  const updateCertification = (id: string, certPartial: Partial<CertificationItem>) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === id ? { ...c, ...certPartial } : c)),
    }));
  };

  const deleteCertification = (id: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  const resetToDefaults = () => {
    setData(initialCMSData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        isAdmin,
        setIsAdmin,
        currentPath,
        navigate,
        isNavigating,
        selectedServiceModal,
        setSelectedServiceModal,
        selectedProjectModal,
        setSelectedProjectModal,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        preselectedQuoteService,
        setPreselectedQuoteService,
        updateCompanyInfo,
        updateHero,
        updateAboutText,
        addProject,
        updateProject,
        deleteProject,
        addService,
        updateService,
        deleteService,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addCertification,
        updateCertification,
        deleteCertification,
        resetToDefaults,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

