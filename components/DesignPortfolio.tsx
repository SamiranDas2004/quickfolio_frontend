"use client";
import { User } from "@/types/user";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe, ExternalLink, Briefcase, Home, FileText, Layers, Wrench } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import { BackgroundBeams } from "@/components/ui/background-beams";

interface ProfessionalPortfolioProps {
  user: User;
}

export default function ProfessionalPortfolio({ user }: ProfessionalPortfolioProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    const container = document.getElementById('main-content');
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sections = ['home', 'projects', 'experience', 'skills', 'connect'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top < window.innerHeight / 2;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const container = document.getElementById('main-content');
      if (container) {
        const offsetTop = element.offsetTop - container.offsetTop;
        container.scrollTo({ top: offsetTop, behavior: "smooth" });
        setActiveSection(id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex overflow-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundBeams />
      </div>
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" style={{ animation: 'fadeIn 0.3s ease-out' }} onClick={() => setSelectedProject(null)}>
          <style jsx>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[32px] max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-orange-500/50 shadow-2xl" style={{ animation: 'slideUp 0.5s ease-out' }} onClick={(e) => e.stopPropagation()}>
            {selectedProject.image_url && <div className="w-full h-80 overflow-hidden rounded-t-[32px]"><img src={selectedProject.image_url} alt={selectedProject.title} className="w-full h-full object-cover" /></div>}
            <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            <div className="p-10"><h2 className="text-5xl font-black text-white mb-4">{selectedProject.title}</h2><p className="text-xl text-gray-400 mb-8 leading-relaxed">{selectedProject.description}</p>{selectedProject.tech_stack?.length > 0 && <div className="mb-8"><h3 className="text-sm text-gray-500 uppercase tracking-widest mb-4">Technologies</h3><div className="flex flex-wrap gap-3">{selectedProject.tech_stack.map((tech: string, idx: number) => <span key={idx} className="px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-xl text-sm text-orange-400">{tech}</span>)}</div></div>}<div className="flex gap-4">{selectedProject.live_url && <a href={selectedProject.live_url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-2"><span>View Live</span><ExternalLink className="w-4 h-4" /></a>}{selectedProject.github_url && <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors flex items-center gap-2"><Github className="w-4 h-4" /><span>View Code</span></a>}</div></div>
          </div>
        </div>
      )}
      {/* Fixed Left Sidebar - Profile Card */}
      <aside className="fixed left-0 top-0 bottom-0 w-[450px] flex items-center justify-center p-12 z-50">
        <div 
          className="bg-white text-black rounded-[40px] p-10 max-w-[380px] w-full shadow-2xl relative"
          style={{
            transform: `translateY(${scrollProgress * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Decorative dashed line arc - top */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-16 border-2 border-dashed border-orange-400 rounded-t-full" style={{ borderBottom: 'none' }}></div>
          
          {/* Profile Image Container */}
          <div className="relative mb-8 mx-auto w-full">
            <div className="w-full aspect-square rounded-[32px] overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 relative shadow-lg">
              <Image
                src={user.avatar_url || "/avatar.png"}
                alt={user.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <h1 className="text-3xl font-bold mb-6 text-center">{user.name}</h1>

          {/* Fire/Briefcase Icon with dashed line */}
          <div className="relative mb-6">
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-16 h-16 border-2 border-dashed border-orange-400 rounded-full"></div>
            <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mx-auto relative z-10">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4Z" />
              </svg>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-sm text-gray-600 mb-8 text-center leading-relaxed px-2">
              {user.bio}
            </p>
          )}

          {/* Decorative dashed line - bottom */}
          <div className="relative mb-6">
            <div className="absolute left-0 top-1/2 w-full h-px border-t-2 border-dashed border-orange-400"></div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 pt-4">
            {user.social_links?.github && (
              <a
                href={user.social_links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </a>
            )}
            {user.social_links?.twitter && (
              <a
                href={user.social_links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600 transition-colors"
              >
                <Twitter className="w-6 h-6" fill="currentColor" />
              </a>
            )}
            {user.social_links?.linkedin && (
              <a
                href={user.social_links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            )}
            {(user.social_links?.website || user.social_links?.portfolio) && (
              <a
                href={user.social_links.website || user.social_links.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area - Scrollable */}
      <main id="main-content" className="ml-[450px] flex-1 h-screen overflow-y-auto scroll-smooth flex justify-center" style={{ willChange: 'scroll-position' }}>
        <div className="w-full max-w-5xl">
        {/* Top Navigation Icons */}
        <nav className="sticky top-0 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-800/50 flex justify-center">
          <div className="flex items-center justify-center gap-10 py-7">
            <button 
              onClick={() => scrollToSection("home")} 
              className={`transition-all ${activeSection === 'home' ? 'text-orange-500 scale-110' : 'text-gray-400 hover:text-white'}`}
              title="Home"
            >
              <Home className="w-5 h-5" strokeWidth={2} />
            </button>
            <button 
              onClick={() => scrollToSection("projects")} 
              className={`transition-all ${activeSection === 'projects' ? 'text-orange-500 scale-110' : 'text-gray-400 hover:text-white'}`}
              title="Projects"
            >
              <Layers className="w-5 h-5" strokeWidth={2} />
            </button>
            <button 
              onClick={() => scrollToSection("experience")} 
              className={`transition-all ${activeSection === 'experience' ? 'text-orange-500 scale-110' : 'text-gray-400 hover:text-white'}`}
              title="Experience"
            >
              <Briefcase className="w-5 h-5" strokeWidth={2} />
            </button>
            <button 
              onClick={() => scrollToSection("skills")} 
              className={`transition-all ${activeSection === 'skills' ? 'text-orange-500 scale-110' : 'text-gray-400 hover:text-white'}`}
              title="Skills"
            >
              <Wrench className="w-5 h-5" strokeWidth={2} />
            </button>
            <button 
              onClick={() => scrollToSection("connect")} 
              className={`transition-all ${activeSection === 'connect' ? 'text-orange-500 scale-110' : 'text-gray-400 hover:text-white'}`}
              title="Contact"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center px-20 py-24">
          <div 
            className="max-w-6xl w-full"
            style={{
              opacity: Math.max(0, 1 - scrollProgress / 30),
              transform: `translateY(${scrollProgress * 0.3}px)`,
              transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
            }}
          >
            <h1 className="text-[120px] font-black mb-8 leading-none tracking-tight">
              {user.title?.split(' ')[0].toUpperCase()}<br/>
              {user.title?.split(' ').slice(1).join(' ').toUpperCase() || ""}            </h1>
            {user.bio && (
              <p className="text-lg text-gray-400 mb-16 leading-relaxed max-w-2xl">
                {user.bio}
              </p>
            )}
            
            {/* Stats */}
            {(user.experience?.length || user.projects?.length || user.skills?.length) && (
              <div className="grid grid-cols-3 gap-12 mb-16 max-w-3xl">
                <div>
                  <div className="text-6xl font-black text-white mb-3">{((user as any).experiences || user.experience)?.length || 5}+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest leading-tight">
                    YEARS OF<br/>EXPERIENCE
                  </div>
                </div>
                <div>
                  <div className="text-6xl font-black text-white mb-3">{user.projects?.length || 0}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest leading-tight">
                    PROJECTS<br/>COMPLETED
                  </div>
                </div>
                <div>
                  <div className="text-6xl font-black text-white mb-3">{user.skills?.length || 0}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest leading-tight">
                    SKILLS &<br/>TECHNOLOGIES
                  </div>
                </div>
              </div>
            )}

            {/* Skill Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
              {/* Experience Card */}
              {((user as any).experiences || user.experience) && ((user as any).experiences || user.experience).length > 0 && (
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[32px] p-10 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <Briefcase className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wide leading-tight mb-4">
                      {((user as any).experiences || user.experience)[0]?.position || ((user as any).experiences || user.experience)[0]?.role}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {((user as any).experiences || user.experience)[0]?.company}{((user as any).experiences || user.experience).length > 1 ? '...' : ''}
                    </p>
                    {((user as any).experiences || user.experience).length > 1 && (
                      <p className="text-white/60 text-xs mt-2">
                        +{((user as any).experiences || user.experience).length - 1} more experience
                      </p>
                    )}
                  </div>
                  <button className="absolute bottom-8 right-8 w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Skills Card */}
              {user.skills && user.skills.length > 0 && (
                <div className="bg-gradient-to-br from-[#c4f82a] to-[#a8e024] rounded-[32px] p-10 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                  <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                      <line x1="0" y1="0" x2="400" y2="300" stroke="currentColor" strokeWidth="2"/>
                      <line x1="100" y1="0" x2="500" y2="300" stroke="currentColor" strokeWidth="2"/>
                      <line x1="200" y1="0" x2="600" y2="300" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-black/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <Wrench className="w-7 h-7 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-black uppercase tracking-wide leading-tight mb-4">
                      {user.skills.slice(0, 3).join(', ')}{user.skills.length > 3 ? '...' : ''}
                    </h3>
                    <p className="text-black/70 text-sm">
                      {user.skills.length > 3 ? `+${user.skills.length - 3} more skills` : `${user.skills.length} skills`}
                    </p>
                  </div>
                  <button className="absolute bottom-8 right-8 w-12 h-12 bg-black/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        {user.projects && user.projects.length > 0 && (
          <section id="projects" className="min-h-screen py-32 px-20">
            <div className="max-w-6xl w-full">
              <h2 
                className="text-[100px] font-black mb-20 leading-none tracking-tight"
                style={{
                  opacity: Math.max(0, 1 - Math.abs(scrollProgress - 20) / 15),
                  transform: `translateY(${Math.max(-20, -scrollProgress + 20)}px)`,
                  transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                }}
              >
                RECENT<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-700">PROJECTS</span>
              </h2>
              <div className="space-y-8">
                {user.projects.slice(0, 3).map((project, index) => (
                  <div
                    key={project.id}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                    style={{
                      opacity: Math.max(0, 1 - Math.abs(scrollProgress - 25 - index * 5) / 20),
                      transform: `translateX(${Math.max(-50, -scrollProgress + 25 + index * 5)}px)`,
                      transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                    }}
                  >
                    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-2 border-gray-700/50 rounded-[28px] p-8 hover:border-purple-500/50 transition-all duration-300">
                      <div className="flex items-center justify-between gap-8">
                        <div className="flex items-center gap-8 flex-1">
                          {project.image_url && (
                            <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-700 flex-shrink-0 border-4 border-purple-500/80 shadow-lg shadow-purple-500/20">
                              <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="text-4xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-gray-400 text-base">{project.description}</p>
                          </div>
                        </div>
                        <button className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300 flex-shrink-0">
                          <svg className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {((user as any).experiences || user.experience) && ((user as any).experiences || user.experience).length > 0 && (
          <section id="experience" className="min-h-screen py-32 px-20">
            <div className="max-w-6xl w-full">
              <h2 
                className="text-[100px] font-black mb-20 leading-none tracking-tight"
                style={{
                  opacity: Math.max(0, 1 - Math.abs(scrollProgress - 45) / 15),
                  transform: `translateY(${Math.max(-20, -scrollProgress + 45)}px)`,
                  transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                }}
              >
                WORK<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-700">EXPERIENCE</span>
              </h2>
              <div className="space-y-16">
                {((user as any).experiences || user.experience).map((exp: any, index: number) => (
                  <div 
                    key={exp.id} 
                    className="border-b border-gray-800 pb-16 last:border-0"
                    style={{
                      opacity: Math.max(0, 1 - Math.abs(scrollProgress - 50 - index * 8) / 25),
                      transform: `translateY(${Math.max(-30, -scrollProgress + 50 + index * 8)}px)`,
                      transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                    }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-4xl font-bold text-white">{exp.position || exp.role}</h3>
                          {exp.duration && (
                            <span className="text-sm text-gray-500 tracking-wide">• {exp.duration}</span>
                          )}
                        </div>
                        <h4 className="text-2xl font-semibold text-orange-500 mb-4">{exp.company}</h4>
                        <p className="text-gray-400 text-lg mb-4 leading-relaxed max-w-3xl">{exp.description}</p>
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.technologies.map((tech: string, idx: number) => (
                              <span key={idx} className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-sm text-gray-300">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      {exp.link && (
                        <a 
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 flex-shrink-0 ml-8"
                        >
                          <ExternalLink className="w-6 h-6 text-orange-500 hover:text-white transition-colors" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {user.skills && user.skills.length > 0 && (
          <section id="skills" className="py-32 px-20">
            <div className="max-w-6xl w-full">
              <h2 
                className="text-[100px] font-black mb-20 leading-none tracking-tight"
                style={{
                  opacity: Math.max(0, 1 - Math.abs(scrollProgress - 70) / 15),
                  transform: `translateY(${Math.max(-20, -scrollProgress + 70)}px)`,
                  transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                }}
              >
                SKILLS &<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-700">TECHNOLOGIES</span>
              </h2>
              <div className="flex flex-wrap gap-4">
                {user.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="px-8 py-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-base text-white hover:border-orange-500/50 hover:bg-gray-800 transition-all duration-300"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {user.custom_sections && user.custom_sections
          .filter((section: any) => section.visible && section.items && section.items.length > 0)
          .sort((a: any, b: any) => a.order - b.order)
          .map((section: any, sectionIndex: number) => (
            <section key={section.id} className="py-32 px-20">
              <div className="max-w-6xl w-full">
                <h2 className="text-[100px] font-black mb-20 leading-none tracking-tight uppercase">
                  {section.title.split(' ')[0]}<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-700">
                    {section.title.split(' ').slice(1).join(' ') || section.title}
                  </span>
                </h2>
                <div className="space-y-8">
                  {section.items.map((item: any, itemIndex: number) => (
                    <div
                      key={item.id || itemIndex}
                      className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-2 border-gray-700/50 rounded-[28px] p-8 hover:border-orange-500/50 transition-all duration-300"
                    >
                      <div className="flex items-start gap-8">
                        {item.image && (
                          <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-700 flex-shrink-0 border-4 border-orange-500/80 shadow-lg shadow-orange-500/20">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-3xl font-bold text-white mb-3">{item.title}</h3>
                          {item.subtitle && (
                            <p className="text-xl text-orange-500 mb-3">{item.subtitle}</p>
                          )}
                          <p className="text-gray-400 text-base leading-relaxed">{item.content}</p>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 mt-4 text-orange-500 hover:text-orange-400 transition-colors"
                            >
                              <span>Learn more</span>
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}

        {/* Contact Section */}
        <section id="connect" className="py-32 px-20 min-h-screen flex items-center">
          <div className="max-w-6xl w-full">
            <h2 
              className="text-5xl font-bold mb-16 text-white"
              style={{
                opacity: Math.max(0, 1 - Math.abs(scrollProgress - 85) / 15),
                transform: `translateY(${Math.max(-20, -scrollProgress + 85)}px)`,
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
              }}
            >
              Let's Connect
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {user.contact?.email && (
                <a
                  href={`mailto:${user.contact.email}`}
                  className="bg-gray-900/50 border border-gray-800/50 rounded-[24px] p-10 hover:border-orange-500/50 hover:bg-gray-900 transition-all duration-300 group"
                >
                  <Mail className="w-10 h-10 text-orange-500 mb-6 group-hover:scale-110 transition-transform" />
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">Email</div>
                  <div className="text-base text-white group-hover:text-orange-500 transition-colors break-all">
                    {user.contact.email}
                  </div>
                </a>
              )}

              {user.contact?.phone && (
                <a
                  href={`tel:${user.contact.phone}`}
                  className="bg-gray-900/50 border border-gray-800/50 rounded-[24px] p-10 hover:border-orange-500/50 hover:bg-gray-900 transition-all duration-300 group"
                >
                  <Phone className="w-10 h-10 text-orange-500 mb-6 group-hover:scale-110 transition-transform" />
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">Phone</div>
                  <div className="text-base text-white group-hover:text-orange-500 transition-colors">
                    {user.contact.phone}
                  </div>
                </a>
              )}

              {user.contact?.location && (
                <div className="bg-gray-900/50 border border-gray-800/50 rounded-[24px] p-10">
                  <MapPin className="w-10 h-10 text-orange-500 mb-6" />
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">Location</div>
                  <div className="text-base text-white">{user.contact.location}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-10 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto px-20 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} {user.name}. All rights reserved. Powered by Quickfolio</p>
          </div>
        </footer>
        </div>
      </main>

      {/* Chat Widget */}
      <ChatWidget username={user.username} bio={user.bio} theme="dark" />
    </div>
  );
}