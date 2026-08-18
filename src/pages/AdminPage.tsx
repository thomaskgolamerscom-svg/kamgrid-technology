import React, { useState, useRef } from 'react';
import { useCMS } from '../context/CMSContext';
import { ProjectItem, ServiceItem, TeamMember, CertificationItem } from '../types';
import {
  Settings,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  X,
  Check,
  Image,
  Layers,
  Phone,
  Building,
  Users,
  ShieldCheck,
  ExternalLink,
  Download,
  Upload,
  Sparkles,
  FileText,
  HelpCircle,
  Eye,
  ArrowRight,
  Database
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    data,
    navigate,
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
  } = useCMS();

  const [activeTab, setActiveTab] = useState<
    'DASHBOARD' | 'COMPANY' | 'HERO' | 'PROJECTS' | 'SERVICES' | 'TEAM' | 'CERTS' | 'ABOUT' | 'BACKUP'
  >('DASHBOARD');

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Company Form State
  const [companyForm, setCompanyForm] = useState(data.company);
  // Hero Form State
  const [heroForm, setHeroForm] = useState(data.hero);
  // About Form State
  const [aboutForm, setAboutForm] = useState({
    story: data.aboutStory,
    solveText: data.aboutSolveText,
    capHeadline: data.capacityHeadline,
    capText: data.capacityText,
    capHighlight: data.capacityHighlight,
  });

  // Projects State & Modals
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [projectFilter, setProjectFilter] = useState('ALL');
  const [newProject, setNewProject] = useState<Omit<ProjectItem, 'id'>>({
    title: '',
    location: '',
    clientType: 'Residential',
    serviceCategory: 'Solar Energy Systems',
    systemDetails: '',
    result: '',
    year: '2024',
    featured: false,
    description: '',
    images: ['/assets/images/kamgrid_roof_solar_1787024500895.jpg'],
  });

  // Services Edit State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [newCapabilityText, setNewCapabilityText] = useState('');

  // Team Member Add Modal State
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    position: '',
    qualification: '',
    bio: '',
    specialty: '',
    photo: '',
  });

  // Certification Add Modal State
  const [showAddCertModal, setShowAddCertModal] = useState(false);
  const [newCert, setNewCert] = useState<Omit<CertificationItem, 'id'>>({
    title: '',
    issuer: '',
    description: '',
    verified: true,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handlers
  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(companyForm);
    showToast('Company & Contact information updated live!');
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(heroForm);
    showToast('Homepage Hero configuration saved successfully!');
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutText(
      aboutForm.story,
      aboutForm.solveText,
      aboutForm.capHeadline,
      aboutForm.capText,
      aboutForm.capHighlight
    );
    showToast('About & Operational Capability copy updated!');
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.location.trim()) {
      showToast('Project Title and Location are required.', 'error');
      return;
    }
    addProject(newProject);
    setShowAddProjectModal(false);
    setNewProject({
      title: '',
      location: '',
      clientType: 'Residential',
      serviceCategory: 'Solar Energy Systems',
      systemDetails: '',
      result: '',
      year: '2024',
      featured: false,
      description: '',
      images: ['/assets/images/kamgrid_roof_solar_1787024500895.jpg'],
    });
    showToast('New engineering project added to CMS!');
  };

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    updateProject(editingProject.id, editingProject);
    setEditingProject(null);
    showToast(`Project "${editingProject.title}" updated successfully!`);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    updateService(editingService.id, editingService);
    setEditingService(null);
    showToast(`Service "${editingService.title}" updated!`);
  };

  const handleCreateTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamMember.name.trim() || !newTeamMember.position.trim()) {
      showToast('Name and Position are required.', 'error');
      return;
    }
    addTeamMember(newTeamMember);
    setShowAddTeamModal(false);
    setNewTeamMember({
      name: '',
      position: '',
      qualification: '',
      bio: '',
      specialty: '',
      photo: '',
    });
    showToast('Team member profile added!');
  };

  const handleCreateCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title.trim() || !newCert.issuer.trim()) {
      showToast('Certification Title and Issuer are required.', 'error');
      return;
    }
    addCertification(newCert);
    setShowAddCertModal(false);
    setNewCert({
      title: '',
      issuer: '',
      description: '',
      verified: true,
    });
    showToast('New certification credential added!');
  };

  // Export CMS Data to JSON file
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kamgrid-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('CMS backup exported to JSON successfully!');
  };

  // Import CMS Data from JSON file
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.company && parsed.services && parsed.projects) {
          localStorage.setItem('kamgrid_cms_data_v1', JSON.stringify(parsed));
          window.location.reload();
        } else {
          showToast('Invalid backup file structure.', 'error');
        }
      } catch (err) {
        showToast('Failed to parse JSON file.', 'error');
      }
    };
    reader.readAsText(file);
  };

  const filteredProjectsList =
    projectFilter === 'ALL'
      ? data.projects
      : data.projects.filter((p) => p.serviceCategory.toLowerCase().includes(projectFilter.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg shadow-xl text-xs font-bold flex items-center gap-2 border animate-fadeIn ${
            notification.type === 'success'
              ? 'bg-emerald-950 text-emerald-200 border-emerald-500'
              : notification.type === 'error'
              ? 'bg-rose-950 text-rose-200 border-rose-500'
              : 'bg-amber-950 text-amber-200 border-amber-500'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Admin Top App Bar */}
      <header className="bg-[#0B1E3D] border-b-2 border-amber-500 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-950 border border-amber-500/80 p-0.5 flex-shrink-0 flex items-center justify-center">
              <img src="/logo-icon.svg" alt="KAMGRID" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-base sm:text-lg text-white tracking-tight leading-none">
                  KAMGRID CMS
                </h1>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold uppercase border border-amber-500/30">
                  ADMIN PORTAL
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono leading-none mt-1">
                Content & Engineering Data Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer uppercase"
              title="Return to Public Website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Website</span>
              <span className="sm:hidden">Website</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Sub-header / Tabs */}
      <div className="bg-slate-950 border-b border-slate-800 sticky top-16 z-30 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-2 py-2">
          {[
            { id: 'DASHBOARD', label: 'Dashboard', icon: Layers },
            { id: 'COMPANY', label: 'Company Info', icon: Phone },
            { id: 'HERO', label: 'Homepage Hero', icon: Image },
            { id: 'PROJECTS', label: `Projects (${data.projects.length})`, icon: Building },
            { id: 'SERVICES', label: `Services (${data.services.length})`, icon: Settings },
            { id: 'TEAM', label: `Team (${data.team.length})`, icon: Users },
            { id: 'CERTS', label: `Certifications (${data.certifications.length})`, icon: ShieldCheck },
            { id: 'ABOUT', label: 'About & Capability', icon: FileText },
            { id: 'BACKUP', label: 'Data & Backup', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-md text-xs font-bold tracking-wider uppercase flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div
                onClick={() => setActiveTab('PROJECTS')}
                className="bg-slate-800/90 border border-slate-700 hover:border-amber-500 p-5 rounded-xl transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">PROJECTS IN CMS</span>
                  <Building className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
                <p className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-2">{data.projects.length}</p>
                <span className="text-[11px] text-amber-400 flex items-center gap-1 mt-2">
                  Manage projects <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <div
                onClick={() => setActiveTab('SERVICES')}
                className="bg-slate-800/90 border border-slate-700 hover:border-amber-500 p-5 rounded-xl transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">CORE SERVICES</span>
                  <Settings className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
                <p className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-2">{data.services.length}</p>
                <span className="text-[11px] text-amber-400 flex items-center gap-1 mt-2">
                  Edit capabilities <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <div
                onClick={() => setActiveTab('TEAM')}
                className="bg-slate-800/90 border border-slate-700 hover:border-amber-500 p-5 rounded-xl transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">TEAM PROFILES</span>
                  <Users className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
                <p className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-2">{data.team.length}</p>
                <span className="text-[11px] text-amber-400 flex items-center gap-1 mt-2">
                  Manage personnel <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <div
                onClick={() => setActiveTab('CERTS')}
                className="bg-slate-800/90 border border-slate-700 hover:border-amber-500 p-5 rounded-xl transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">CREDENTIALS</span>
                  <ShieldCheck className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
                <p className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-2">{data.certifications.length}</p>
                <span className="text-[11px] text-amber-400 flex items-center gap-1 mt-2">
                  View credentials <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* System Status & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700 p-6 rounded-xl space-y-4">
                <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>CMS Administration Guide</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  This administration portal controls the public-facing content of the KAMGRID TECHNOLOGY engineering website. Updates made here are saved directly to browser storage and reflected across all client pages in real-time.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-slate-900/80 rounded border border-slate-800">
                    <span className="font-bold text-amber-400 block mb-1">Direct URL Isolation</span>
                    <span className="text-slate-400">
                      The CMS is strictly available at <code className="text-amber-300 font-mono">/admin</code> and completely hidden from public visitors.
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded border border-slate-800">
                    <span className="font-bold text-amber-400 block mb-1">Instant Data Sync</span>
                    <span className="text-slate-400">
                      You can add project records, update phone contacts, edit hero copy, and export backup snapshots at any time.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0B1E3D] border border-slate-700 p-6 rounded-xl space-y-4">
                <h3 className="font-heading font-bold text-base text-white">
                  Quick Actions
                </h3>
                <div className="space-y-2.5">
                  <button
                    onClick={() => {
                      setActiveTab('PROJECTS');
                      setShowAddProjectModal(true);
                    }}
                    className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Project Record</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('COMPANY')}
                    className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase rounded flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Update Contact & Phones</span>
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-950 text-slate-300 hover:text-white font-bold text-xs uppercase rounded flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-800"
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>Preview Public Website</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMPANY INFO TAB */}
        {activeTab === 'COMPANY' && (
          <div className="bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-xl max-w-3xl">
            <h2 className="font-heading font-bold text-xl text-white mb-6 pb-3 border-b border-slate-700 flex items-center gap-2">
              <Phone className="w-5 h-5 text-amber-400" />
              <span>Company Information & Contact Coordinates</span>
            </h2>

            <form onSubmit={handleSaveCompany} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={companyForm.name}
                    onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded text-sm text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Primary Tagline</label>
                  <input
                    type="text"
                    value={companyForm.tagline}
                    onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded text-sm text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Primary Phone</label>
                  <input
                    type="text"
                    value={companyForm.phone1}
                    onChange={(e) => setCompanyForm({ ...companyForm, phone1: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded text-sm text-amber-400 font-mono focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Secondary Phone</label>
                  <input
                    type="text"
                    value={companyForm.phone2}
                    onChange={(e) => setCompanyForm({ ...companyForm, phone2: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded text-sm text-amber-400 font-mono focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">WhatsApp Number</label>
                  <input
                    type="text"
                    value={companyForm.whatsapp}
                    onChange={(e) => setCompanyForm({ ...companyForm, whatsapp: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded text-sm text-emerald-400 font-mono focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Official Email</label>
                  <input
                    type="email"
                    value={companyForm.email}
                    onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded text-sm text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Parent Entity Note</label>
                  <input
                    type="text"
                    value={companyForm.parentCompany}
                    onChange={(e) => setCompanyForm({ ...companyForm, parentCompany: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded text-sm text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Headquarters / Physical Address</label>
                <textarea
                  rows={2}
                  value={companyForm.address}
                  onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded text-sm text-white focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Company Details</span>
              </button>
            </form>
          </div>
        )}

        {/* HERO CONFIG TAB */}
        {activeTab === 'HERO' && (
          <div className="bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-xl max-w-3xl">
            <h2 className="font-heading font-bold text-xl text-white mb-6 pb-3 border-b border-slate-700 flex items-center gap-2">
              <Image className="w-5 h-5 text-amber-400" />
              <span>Homepage Hero Section Configuration</span>
            </h2>

            <form onSubmit={handleSaveHero} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Main Hero Headline</label>
                <textarea
                  rows={2}
                  value={heroForm.headline}
                  onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded text-base font-heading font-bold text-white focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Supporting Sub-Headline / Description</label>
                <textarea
                  rows={3}
                  value={heroForm.supportingText}
                  onChange={(e) => setHeroForm({ ...heroForm, supportingText: e.target.value })}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded text-sm text-slate-200 focus:border-amber-500 focus:outline-hidden leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Primary CTA Button Text</label>
                  <input
                    type="text"
                    value={heroForm.primaryCtaText}
                    onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded text-sm text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Secondary CTA Button Text</label>
                  <input
                    type="text"
                    value={heroForm.secondaryCtaText}
                    onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded text-sm text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Hero Visual Asset Path / URL</label>
                <input
                  type="text"
                  value={heroForm.heroImage}
                  onChange={(e) => setHeroForm({ ...heroForm, heroImage: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded text-xs text-amber-300 font-mono focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Hero Configuration</span>
              </button>
            </form>
          </div>
        )}

        {/* PROJECTS CMS TAB */}
        {activeTab === 'PROJECTS' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-800/80 border border-slate-700 p-4 sm:p-6 rounded-xl">
              <div>
                <h2 className="font-heading font-bold text-xl text-white">Engineering Project Records</h2>
                <p className="text-xs text-slate-400 mt-1">Manage public case studies and technical specifications</p>
              </div>
              <button
                onClick={() => setShowAddProjectModal(true)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 transition-colors self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project Record</span>
              </button>
            </div>

            {/* Filter Pill Tabs */}
            <div className="flex flex-wrap gap-2 text-xs">
              {['ALL', 'Solar', 'CCTV', 'Electrical', 'Lightning', 'Structured'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={`px-3 py-1.5 rounded-full font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    projectFilter === cat
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredProjectsList.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-800/90 border border-slate-700 rounded-xl overflow-hidden shadow-md flex flex-col justify-between"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                          {project.serviceCategory}
                        </span>
                        <h3 className="font-heading font-bold text-base text-white mt-1">
                          {project.title}
                        </h3>
                      </div>
                      {project.featured && (
                        <span className="text-[10px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded uppercase">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-400 space-y-1">
                      <p><strong className="text-slate-300">Location:</strong> {project.location}</p>
                      <p><strong className="text-slate-300">Specs:</strong> <span className="font-mono text-amber-300">{project.systemDetails}</span></p>
                      <p><strong className="text-slate-300">Client Type:</strong> {project.clientType}</p>
                    </div>

                    {project.description && (
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1 border-t border-slate-700/60">
                        {project.description}
                      </p>
                    )}
                  </div>

                  <div className="bg-slate-900/90 px-5 py-3 border-t border-slate-700/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => updateProject(project.id, { featured: !project.featured })}
                      className={`px-3 py-1 text-xs font-bold rounded transition-colors cursor-pointer ${
                        project.featured
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {project.featured ? '★ Featured (Active)' : '☆ Set Featured'}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingProject(project)}
                        className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete project: "${project.title}"?`)) {
                            deleteProject(project.id);
                            showToast(`Deleted "${project.title}"`, 'info');
                          }
                        }}
                        className="p-1.5 bg-rose-950/80 text-rose-300 hover:text-white rounded border border-rose-800/80 transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Project Modal */}
            {showAddProjectModal && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-6 space-y-5 my-auto shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <h3 className="font-heading font-bold text-lg text-white">Add New Engineering Project Record</h3>
                    <button onClick={() => setShowAddProjectModal(false)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Project Title</label>
                      <input
                        type="text"
                        required
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                        placeholder="e.g. 50KVA Hybrid Solar Power Plant"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold uppercase text-slate-300 mb-1">Location</label>
                        <input
                          type="text"
                          required
                          value={newProject.location}
                          onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                          className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                          placeholder="e.g. Aba, Abia State"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase text-slate-300 mb-1">Service Category</label>
                        <select
                          value={newProject.serviceCategory}
                          onChange={(e) => setNewProject({ ...newProject, serviceCategory: e.target.value })}
                          className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                        >
                          <option value="Solar Energy Systems">Solar Energy Systems</option>
                          <option value="CCTV & Security Systems">CCTV & Security Systems</option>
                          <option value="Electrical Installation">Electrical Installation</option>
                          <option value="Lightning & Surge Protection">Lightning & Surge Protection</option>
                          <option value="Structured Cabling & Networking">Structured Cabling & Networking</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold uppercase text-slate-300 mb-1">Client Type</label>
                        <select
                          value={newProject.clientType}
                          onChange={(e) => setNewProject({ ...newProject, clientType: e.target.value as any })}
                          className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Government">Government</option>
                          <option value="Institutional">Institutional</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold uppercase text-slate-300 mb-1">System Specs</label>
                        <input
                          type="text"
                          value={newProject.systemDetails}
                          onChange={(e) => setNewProject({ ...newProject, systemDetails: e.target.value })}
                          className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white font-mono"
                          placeholder="e.g. 15KVA inverter, 30KWH lithium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Primary Image Asset Path</label>
                      <input
                        type="text"
                        value={newProject.images[0]}
                        onChange={(e) => setNewProject({ ...newProject, images: [e.target.value] })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Project Description</label>
                      <textarea
                        rows={3}
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                        placeholder="Detailed engineering scope and outcomes..."
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                      <button
                        type="button"
                        onClick={() => setShowAddProjectModal(false)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded font-bold uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 text-slate-950 font-bold uppercase rounded"
                      >
                        Save Project
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Edit Project Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-6 space-y-5 my-auto shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <h3 className="font-heading font-bold text-lg text-white">Edit Project Record</h3>
                    <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleUpdateProject} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Project Title</label>
                      <input
                        type="text"
                        required
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold uppercase text-slate-300 mb-1">Location</label>
                        <input
                          type="text"
                          required
                          value={editingProject.location}
                          onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                          className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase text-slate-300 mb-1">Service Category</label>
                        <select
                          value={editingProject.serviceCategory}
                          onChange={(e) => setEditingProject({ ...editingProject, serviceCategory: e.target.value })}
                          className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                        >
                          <option value="Solar Energy Systems">Solar Energy Systems</option>
                          <option value="CCTV & Security Systems">CCTV & Security Systems</option>
                          <option value="Electrical Installation">Electrical Installation</option>
                          <option value="Lightning & Surge Protection">Lightning & Surge Protection</option>
                          <option value="Structured Cabling & Networking">Structured Cabling & Networking</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold uppercase text-slate-300 mb-1">Client Type</label>
                        <select
                          value={editingProject.clientType}
                          onChange={(e) => setEditingProject({ ...editingProject, clientType: e.target.value as any })}
                          className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Government">Government</option>
                          <option value="Institutional">Institutional</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold uppercase text-slate-300 mb-1">System Specs</label>
                        <input
                          type="text"
                          value={editingProject.systemDetails}
                          onChange={(e) => setEditingProject({ ...editingProject, systemDetails: e.target.value })}
                          className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Project Description</label>
                      <textarea
                        rows={3}
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded font-bold uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 text-slate-950 font-bold uppercase rounded"
                      >
                        Update Project
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SERVICES CMS TAB */}
        {activeTab === 'SERVICES' && (
          <div className="space-y-6">
            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-xl">
              <h2 className="font-heading font-bold text-xl text-white">Engineering Services Overview</h2>
              <p className="text-xs text-slate-400 mt-1">Configure core engineering modules, descriptions, and capabilities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.services.map((service) => (
                <div key={service.id} className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] text-amber-400 font-mono uppercase tracking-widest font-bold block">
                        MODULE ID: {service.id}
                      </span>
                      <h3 className="font-heading font-bold text-base text-white mt-1">{service.title}</h3>
                    </div>
                    <button
                      onClick={() => setEditingService(service)}
                      className="p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors cursor-pointer"
                      title="Edit Service"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{service.shortDescription}</p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Capabilities ({service.capabilities.length}):</span>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {service.capabilities.slice(0, 4).map((cap, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-amber-400 flex-shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                      {service.capabilities.length > 4 && (
                        <li className="text-[11px] text-amber-400 font-mono">+ {service.capabilities.length - 4} more specs</li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Service Modal */}
            {editingService && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-6 space-y-5 my-auto shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <h3 className="font-heading font-bold text-lg text-white">Edit Service: {editingService.title}</h3>
                    <button onClick={() => setEditingService(null)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveService} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Service Title</label>
                      <input
                        type="text"
                        required
                        value={editingService.title}
                        onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Short Summary</label>
                      <textarea
                        rows={2}
                        value={editingService.shortDescription}
                        onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Full Technical Description</label>
                      <textarea
                        rows={3}
                        value={editingService.fullDescription}
                        onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Image Asset Path</label>
                      <input
                        type="text"
                        value={editingService.image}
                        onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white font-mono"
                      />
                    </div>

                    {/* Capabilities Manager */}
                    <div className="space-y-2 pt-2 border-t border-slate-700">
                      <label className="block font-bold uppercase text-slate-300">Capabilities List</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCapabilityText}
                          onChange={(e) => setNewCapabilityText(e.target.value)}
                          placeholder="Add new capability spec..."
                          className="flex-1 p-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newCapabilityText.trim()) {
                              setEditingService({
                                ...editingService,
                                capabilities: [...editingService.capabilities, newCapabilityText.trim()],
                              });
                              setNewCapabilityText('');
                            }
                          }}
                          className="px-3 py-2 bg-amber-500 text-slate-950 font-bold uppercase rounded"
                        >
                          Add
                        </button>
                      </div>

                      <div className="max-h-36 overflow-y-auto space-y-1.5 p-2 bg-slate-950 rounded border border-slate-800">
                        {editingService.capabilities.map((cap, idx) => (
                          <div key={idx} className="flex items-center justify-between text-slate-300 py-1 px-2 hover:bg-slate-900 rounded">
                            <span>{cap}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingService({
                                  ...editingService,
                                  capabilities: editingService.capabilities.filter((_, i) => i !== idx),
                                });
                              }}
                              className="text-rose-400 hover:text-rose-300 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded font-bold uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 text-slate-950 font-bold uppercase rounded"
                      >
                        Save Service
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TEAM CMS TAB */}
        {activeTab === 'TEAM' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-800/80 border border-slate-700 p-6 rounded-xl">
              <div>
                <h2 className="font-heading font-bold text-xl text-white">Engineering Personnel</h2>
                <p className="text-xs text-slate-400 mt-1">Manage team members featured on the public About page</p>
              </div>
              <button
                onClick={() => setShowAddTeamModal(true)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Team Member</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.team.map((member) => (
                <div key={member.id} className="bg-slate-800/90 border border-slate-700 p-5 rounded-xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-heading font-bold text-base text-white">{member.name}</h3>
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mt-0.5">{member.position}</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{member.qualification}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Remove team member "${member.name}"?`)) {
                          deleteTeamMember(member.id);
                          showToast(`Removed team member ${member.name}`, 'info');
                        }
                      }}
                      className="p-1.5 text-rose-400 hover:bg-rose-950/50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>

            {/* Add Team Modal */}
            {showAddTeamModal && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-6 space-y-4 my-auto shadow-2xl">
                  <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                    <h3 className="font-heading font-bold text-base text-white">Add Engineering Team Member</h3>
                    <button onClick={() => setShowAddTeamModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
                  </div>

                  <form onSubmit={handleCreateTeamMember} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={newTeamMember.name}
                        onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                        placeholder="e.g. Engr. Michael Okoro"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Position / Role</label>
                      <input
                        type="text"
                        required
                        value={newTeamMember.position}
                        onChange={(e) => setNewTeamMember({ ...newTeamMember, position: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                        placeholder="e.g. Lead Power & Solar Systems Engineer"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Qualifications</label>
                      <input
                        type="text"
                        value={newTeamMember.qualification}
                        onChange={(e) => setNewTeamMember({ ...newTeamMember, qualification: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                        placeholder="e.g. B.Eng, MNSE, COREN Registered"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Bio / Profile Summary</label>
                      <textarea
                        rows={3}
                        value={newTeamMember.bio}
                        onChange={(e) => setNewTeamMember({ ...newTeamMember, bio: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                        placeholder="Engineering experience, project history..."
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                      <button
                        type="button"
                        onClick={() => setShowAddTeamModal(false)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded font-bold uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 text-slate-950 font-bold uppercase rounded"
                      >
                        Add Member
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CREDENTIALS CMS TAB */}
        {activeTab === 'CERTS' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-800/80 border border-slate-700 p-6 rounded-xl">
              <div>
                <h2 className="font-heading font-bold text-xl text-white">Corporate Credentials & Certifications</h2>
                <p className="text-xs text-slate-400 mt-1">Manage ISO, COREN, CAC, and regulatory compliance records</p>
              </div>
              <button
                onClick={() => setShowAddCertModal(true)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certification</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="bg-slate-800/90 border border-slate-700 p-5 rounded-xl space-y-2.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-heading font-bold text-base text-white">{cert.title}</h3>
                      <p className="text-xs text-amber-400 font-mono font-bold mt-0.5">{cert.issuer}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Remove certificate "${cert.title}"?`)) {
                          deleteCertification(cert.id);
                          showToast(`Removed certificate ${cert.title}`, 'info');
                        }
                      }}
                      className="p-1.5 text-rose-400 hover:bg-rose-950/50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{cert.description}</p>
                </div>
              ))}
            </div>

            {/* Add Cert Modal */}
            {showAddCertModal && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-6 space-y-4 my-auto shadow-2xl">
                  <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                    <h3 className="font-heading font-bold text-base text-white">Add Corporate Certification</h3>
                    <button onClick={() => setShowAddCertModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
                  </div>

                  <form onSubmit={handleCreateCert} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Certificate Title</label>
                      <input
                        type="text"
                        required
                        value={newCert.title}
                        onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                        placeholder="e.g. ISO 9001:2015 Quality Management"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Issuing Body</label>
                      <input
                        type="text"
                        required
                        value={newCert.issuer}
                        onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                        placeholder="e.g. Standard Organisation of Nigeria"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Description / Scope</label>
                      <textarea
                        rows={3}
                        value={newCert.description}
                        onChange={(e) => setNewCert({ ...newCert, description: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                        placeholder="Compliance scope..."
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                      <button
                        type="button"
                        onClick={() => setShowAddCertModal(false)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded font-bold uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 text-slate-950 font-bold uppercase rounded"
                      >
                        Add Credential
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ABOUT & CAPABILITY TAB */}
        {activeTab === 'ABOUT' && (
          <div className="bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-xl max-w-3xl">
            <h2 className="font-heading font-bold text-xl text-white mb-6 pb-3 border-b border-slate-700 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <span>About & Operational Capability Copy</span>
            </h2>

            <form onSubmit={handleSaveAbout} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Company Story (About Page)</label>
                <textarea
                  rows={4}
                  value={aboutForm.story}
                  onChange={(e) => setAboutForm({ ...aboutForm, story: e.target.value })}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded text-xs text-white leading-relaxed focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Engineering Solution Philosophy</label>
                <textarea
                  rows={3}
                  value={aboutForm.solveText}
                  onChange={(e) => setAboutForm({ ...aboutForm, solveText: e.target.value })}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded text-xs text-white leading-relaxed focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-4 border-t border-slate-700 space-y-4">
                <h3 className="font-bold text-sm text-amber-400 uppercase">Operational Capability Page Copy</h3>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Capacity Headline</label>
                  <input
                    type="text"
                    value={aboutForm.capHeadline}
                    onChange={(e) => setAboutForm({ ...aboutForm, capHeadline: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded text-sm text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Capacity Description</label>
                  <textarea
                    rows={3}
                    value={aboutForm.capText}
                    onChange={(e) => setAboutForm({ ...aboutForm, capText: e.target.value })}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded text-xs text-white leading-relaxed focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Narrative Content</span>
              </button>
            </form>
          </div>
        )}

        {/* BACKUP & RESTORE TAB */}
        {activeTab === 'BACKUP' && (
          <div className="space-y-6 max-w-3xl">
            <div className="bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-xl space-y-4">
              <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                <span>Data Management & Backup Snapshots</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Export complete JSON snapshots of all website content, project case studies, and engineering configurations for backup or transfer.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
                  <span className="font-bold text-sm text-white block">Export Backup</span>
                  <p className="text-xs text-slate-400">Download current live data as a JSON file.</p>
                  <button
                    onClick={handleExportJSON}
                    className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
                  <span className="font-bold text-sm text-white block">Restore from Backup</span>
                  <p className="text-xs text-slate-400">Upload and import a previously saved JSON snapshot.</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase rounded flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
                  >
                    <Upload className="w-4 h-4 text-amber-400" />
                    <span>Upload & Restore File</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-rose-950/40 border border-rose-800/80 p-6 rounded-xl space-y-3">
              <h3 className="font-bold text-sm text-rose-300 uppercase flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>Reset to Factory Defaults</span>
              </h3>
              <p className="text-xs text-rose-200/80 leading-relaxed">
                This will wipe any local edits and restore the official KAMGRID default engineering data, images, and projects.
              </p>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all CMS content back to factory defaults?')) {
                    resetToDefaults();
                    showToast('CMS reset to initial defaults!', 'info');
                    window.location.reload();
                  }
                }}
                className="px-4 py-2 bg-rose-800 hover:bg-rose-700 text-white font-bold text-xs uppercase rounded transition-colors cursor-pointer"
              >
                Reset All Data to Defaults
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Admin Minimal Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-4 px-4 text-center text-xs text-slate-500 font-mono">
        KAMGRID TECHNOLOGY (RC: 3105777) • Dedicated CMS Administration Portal • Direct Access /admin
      </footer>
    </div>
  );
};
