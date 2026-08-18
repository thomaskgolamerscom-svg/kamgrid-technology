import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { ProjectItem, ServiceItem, TeamMember, CertificationItem } from '../types';
import { Settings, Plus, Trash2, Edit3, Save, RotateCcw, X, Check, Image, Layers, Phone, Building, Users, ShieldCheck } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    data,
    setIsAdmin,
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

  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'COMPANY' | 'HERO' | 'PROJECTS' | 'SERVICES' | 'TEAM' | 'CERTS'>('DASHBOARD');

  // Company Local Form State
  const [companyForm, setCompanyForm] = useState(data.company);
  const [heroForm, setHeroForm] = useState(data.hero);

  // New Project Form State
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
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
    images: ['https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80'],
  });

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(companyForm);
    alert('Company & Contact information updated live!');
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(heroForm);
    alert('Homepage Hero settings updated live!');
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.location) {
      alert('Project Title and Location are required.');
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
      images: ['https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80'],
    });
    alert('New engineering project added to CMS!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm overflow-y-auto p-4 sm:p-6 lg:p-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden min-h-[85vh] flex flex-col">
        
        {/* Admin Header */}
        <div className="bg-[#0B1E3D] text-white p-4 sm:p-6 border-b-2 border-amber-500 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 text-slate-950 rounded font-bold">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
                KAMGRID CMS Portal
              </h2>
              <p className="text-xs text-amber-400 font-mono">
                Live Content & Data Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all CMS data back to original defaults?')) {
                  resetToDefaults();
                  alert('CMS reset to initial defaults!');
                }
              }}
              className="px-3 py-1.5 text-xs font-bold text-rose-300 hover:text-white bg-rose-950/80 border border-rose-800 rounded flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={() => setIsAdmin(false)}
              className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700"
              title="Close Admin Panel"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 pt-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          {[
            { id: 'DASHBOARD', label: 'Dashboard', icon: Layers },
            { id: 'COMPANY', label: 'Company Info', icon: Phone },
            { id: 'HERO', label: 'Hero Config', icon: Image },
            { id: 'PROJECTS', label: 'Projects CMS', icon: Building },
            { id: 'SERVICES', label: 'Services CMS', icon: Settings },
            { id: 'TEAM', label: 'Team CMS', icon: Users },
            { id: 'CERTS', label: 'Credentials', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-t-md flex items-center gap-2 border-t border-x transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-[#0B1E3D] border-slate-300 border-b-transparent shadow-2xs font-extrabold'
                    : 'bg-slate-200/60 text-slate-600 border-transparent hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-600" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          
          {/* DASHBOARD TAB */}
          {activeTab === 'DASHBOARD' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-2xs">
                  <span className="text-xs font-bold text-slate-400 uppercase">PROJECTS IN CMS</span>
                  <p className="font-heading text-3xl font-bold text-[#0B1E3D] mt-1">{data.projects.length}</p>
                </div>
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-2xs">
                  <span className="text-xs font-bold text-slate-400 uppercase">CORE SERVICES</span>
                  <p className="font-heading text-3xl font-bold text-[#0B1E3D] mt-1">{data.services.length}</p>
                </div>
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-2xs">
                  <span className="text-xs font-bold text-slate-400 uppercase">TEAM MEMBERS</span>
                  <p className="font-heading text-3xl font-bold text-[#0B1E3D] mt-1">{data.team.length}</p>
                </div>
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-2xs">
                  <span className="text-xs font-bold text-slate-400 uppercase">CREDENTIALS</span>
                  <p className="font-heading text-3xl font-bold text-[#0B1E3D] mt-1">{data.certifications.length}</p>
                </div>
              </div>

              <div className="p-6 bg-amber-50 rounded-lg border border-amber-200 space-y-3">
                <h3 className="font-bold text-sm text-amber-900 uppercase">CMS Operating Instructions</h3>
                <p className="text-xs text-amber-800 leading-relaxed">
                  All changes made in this portal persist instantly across the website and in your browser storage. You can add new solar or electrical project records, update phone numbers, edit service capabilities, or reset back to default at any time.
                </p>
              </div>
            </div>
          )}

          {/* COMPANY INFO TAB */}
          {activeTab === 'COMPANY' && (
            <form onSubmit={handleSaveCompany} className="space-y-6 max-w-2xl">
              <h3 className="font-bold text-lg text-[#0B1E3D] border-b pb-2">Company & Contact Configuration</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={companyForm.name}
                    onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                    className="w-full p-2.5 border rounded text-sm bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Primary Tagline</label>
                  <input
                    type="text"
                    value={companyForm.tagline}
                    onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                    className="w-full p-2.5 border rounded text-sm bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Phone 1</label>
                  <input
                    type="text"
                    value={companyForm.phone1}
                    onChange={(e) => setCompanyForm({ ...companyForm, phone1: e.target.value })}
                    className="w-full p-2.5 border rounded text-sm bg-slate-50 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Phone 2</label>
                  <input
                    type="text"
                    value={companyForm.phone2}
                    onChange={(e) => setCompanyForm({ ...companyForm, phone2: e.target.value })}
                    className="w-full p-2.5 border rounded text-sm bg-slate-50 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={companyForm.whatsapp}
                    onChange={(e) => setCompanyForm({ ...companyForm, whatsapp: e.target.value })}
                    className="w-full p-2.5 border rounded text-sm bg-slate-50 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={companyForm.email}
                  onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                  className="w-full p-2.5 border rounded text-sm bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Office Address</label>
                <textarea
                  rows={2}
                  value={companyForm.address}
                  onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                  className="w-full p-2.5 border rounded text-sm bg-slate-50"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#0B1E3D] text-white font-bold text-xs uppercase rounded hover:bg-slate-900 flex items-center gap-2"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>Save Company Details</span>
              </button>
            </form>
          )}

          {/* HERO CONFIG TAB */}
          {activeTab === 'HERO' && (
            <form onSubmit={handleSaveHero} className="space-y-6 max-w-2xl">
              <h3 className="font-bold text-lg text-[#0B1E3D] border-b pb-2">Homepage Hero Settings</h3>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Main Hero Headline</label>
                <textarea
                  rows={2}
                  value={heroForm.headline}
                  onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                  className="w-full p-2.5 border rounded text-sm bg-slate-50 font-bold text-[#0B1E3D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Supporting Description</label>
                <textarea
                  rows={3}
                  value={heroForm.supportingText}
                  onChange={(e) => setHeroForm({ ...heroForm, supportingText: e.target.value })}
                  className="w-full p-2.5 border rounded text-sm bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Hero Image URL</label>
                <input
                  type="text"
                  value={heroForm.heroImage}
                  onChange={(e) => setHeroForm({ ...heroForm, heroImage: e.target.value })}
                  className="w-full p-2.5 border rounded text-sm bg-slate-50 font-mono text-xs"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#0B1E3D] text-white font-bold text-xs uppercase rounded hover:bg-slate-900 flex items-center gap-2"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>Save Hero Settings</span>
              </button>
            </form>
          )}

          {/* PROJECTS CMS TAB */}
          {activeTab === 'PROJECTS' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-[#0B1E3D]">Project Records Management</h3>
                <button
                  onClick={() => setShowAddProjectModal(true)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase rounded flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-slate-50 rounded border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#0B1E3D]">{proj.title}</span>
                        {proj.featured && (
                          <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold uppercase">Featured</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{proj.location} • {proj.clientType} • {proj.serviceCategory}</p>
                      <p className="text-xs text-amber-700 font-mono">{proj.systemDetails}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          updateProject(proj.id, { featured: !proj.featured });
                        }}
                        className="px-3 py-1.5 bg-slate-200 text-slate-800 font-bold text-[11px] rounded"
                      >
                        {proj.featured ? 'Unfeature' : 'Set Featured'}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${proj.title}"?`)) {
                            deleteProject(proj.id);
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:bg-rose-100 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal for adding new project */}
              {showAddProjectModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 flex items-center justify-center p-4">
                  <div className="bg-white p-6 rounded-lg max-w-xl w-full space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b pb-2">
                      <h4 className="font-bold text-base text-[#0B1E3D]">Add New Project Record</h4>
                      <button onClick={() => setShowAddProjectModal(false)}><X className="w-5 h-5" /></button>
                    </div>

                    <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
                      <div>
                        <label className="font-bold uppercase block mb-1">Project Title</label>
                        <input
                          type="text"
                          required
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          className="w-full p-2 border rounded"
                          placeholder="e.g. 50KVA Solar Grid Installation"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold uppercase block mb-1">Location</label>
                          <input
                            type="text"
                            required
                            value={newProject.location}
                            onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Aba, Abia State"
                          />
                        </div>

                        <div>
                          <label className="font-bold uppercase block mb-1">Client Type</label>
                          <select
                            value={newProject.clientType}
                            onChange={(e) => setNewProject({ ...newProject, clientType: e.target.value as any })}
                            className="w-full p-2 border rounded"
                          >
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Industrial">Industrial</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="font-bold uppercase block mb-1">System Specs</label>
                        <input
                          type="text"
                          value={newProject.systemDetails}
                          onChange={(e) => setNewProject({ ...newProject, systemDetails: e.target.value })}
                          className="w-full p-2 border rounded"
                          placeholder="e.g. 15KVA inverter with 30KWH lithium battery bank"
                        />
                      </div>

                      <div>
                        <label className="font-bold uppercase block mb-1">Result</label>
                        <input
                          type="text"
                          value={newProject.result}
                          onChange={(e) => setNewProject({ ...newProject, result: e.target.value })}
                          className="w-full p-2 border rounded"
                          placeholder="e.g. 24/7 continuous uninterrupted power"
                        />
                      </div>

                      <div>
                        <label className="font-bold uppercase block mb-1">Image URL</label>
                        <input
                          type="text"
                          value={newProject.images[0]}
                          onChange={(e) => setNewProject({ ...newProject, images: [e.target.value] })}
                          className="w-full p-2 border rounded font-mono"
                        />
                      </div>

                      <div>
                        <label className="font-bold uppercase block mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      <div className="pt-2 flex justify-end gap-2">
                        <button type="button" onClick={() => setShowAddProjectModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                        <button type="submit" className="px-5 py-2 bg-[#0B1E3D] text-white font-bold rounded">Save Project</button>
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
              <h3 className="font-bold text-lg text-[#0B1E3D]">Core Services Overview</h3>
              <div className="space-y-4">
                {data.services.map((srv) => (
                  <div key={srv.id} className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
                    <h4 className="font-bold text-sm text-[#0B1E3D]">{srv.title}</h4>
                    <p className="text-xs text-slate-600">{srv.shortDescription}</p>
                    <div className="text-[11px] text-amber-700 font-mono">
                      Capabilities ({srv.capabilities.length}): {srv.capabilities.slice(0, 3).join(', ')}...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TEAM CMS TAB */}
          {activeTab === 'TEAM' && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-[#0B1E3D]">Engineering Personnel</h3>
              <p className="text-xs text-slate-600">You can add verified team members here to feature them on the website.</p>
            </div>
          )}

          {/* CREDENTIALS CMS TAB */}
          {activeTab === 'CERTS' && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-[#0B1E3D]">Corporate Certifications</h3>
              <div className="space-y-3">
                {data.certifications.map((c) => (
                  <div key={c.id} className="p-3 bg-slate-50 border rounded text-xs space-y-1">
                    <p className="font-bold text-[#0B1E3D]">{c.title}</p>
                    <p className="text-amber-700 font-semibold">{c.issuer}</p>
                    <p className="text-slate-600">{c.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
