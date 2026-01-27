"use client";
import { User } from "@/types/user";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe, ExternalLink, Briefcase, Code2, Terminal } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";

interface ProfessionalPortfolioProps {
  user: User;
}

export default function ProfessionalPortfolio({ user }: ProfessionalPortfolioProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [currentTime, setCurrentTime] = useState("");
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate line numbers based on content
    const numbers = Array.from({ length: 250 }, (_, i) => i + 1);
    setLineNumbers(numbers);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // Add section to visible set for animation
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const handleDownloadCV = () => {
    const resumeUrl = user.contact?.resume_url;
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 relative overflow-hidden" style={{ fontFamily: 'var(--font-jetbrains-mono), "Courier New", monospace' }}>
      {/* Line numbers column - Fixed */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-16 bg-[#0a0a0a] border-r border-gray-800 z-40 overflow-hidden">
        <div className="pt-32 pb-20">
          {lineNumbers.map((num) => (
            <div
              key={num}
              className="h-6 px-3 text-right text-xs text-gray-600 leading-6 select-none"
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-gray-800">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3">
          <div className="flex items-center gap-2 lg:gap-6 lg:ml-16">
            <button className="text-xs lg:text-sm text-gray-400 hover:text-white transition-colors px-2 lg:px-3 py-1 rounded hover:bg-gray-800">
              Welcome!
            </button>
            <button className="text-xs lg:text-sm text-white bg-gray-800 px-2 lg:px-3 py-1 rounded border-b-2 border-blue-500">
              {user.username || "username"}.info
            </button>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-400">Open to new work</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="hidden lg:block fixed left-16 top-16 bottom-0 w-64 bg-[#0a0a0a] border-r border-gray-800 z-30 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Profile */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-700">
                <Image
                  src={user.avatar_url || "/avatar.png"}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{user.name}</div>
              <div className="text-gray-500 text-xs">{user.title || "Software Developer"}</div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-3 text-xs leading-relaxed text-gray-400 border-l-2 border-gray-800 pl-3">
            <p>{user.bio?.split('.')[0] || "Software developer focused on building fast, scalable web apps."}</p>
          </div>

          {/* Info */}
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 text-gray-400">
              <Briefcase className="w-3 h-3" />
              <span>{user.title || "4+ years of experience"}</span>
            </div>
            {user.contact?.location && (
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-3 h-3" />
                <span>{user.contact.location}</span>
              </div>
            )}
            {user.contact?.email && (
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-3 h-3" />
                <span className="truncate">{user.contact.email}</span>
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={handleDownloadCV}
            className="w-full px-4 py-2 bg-white text-black text-xs font-semibold rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <span>Download CV</span>
            <span>↓</span>
          </button>
        </div>

        {/* Bottom Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <a
            href={`mailto:${user?.email || ''}?subject=Let's Work Together`}
            className="block w-full px-4 py-3 bg-transparent border border-gray-700 text-white text-sm rounded hover:bg-gray-800 transition-colors text-center"
          >
            Work with me
          </a>
        </div>
      </aside>

      {/* Right Sidebar - Index */}
      <aside className="hidden lg:block fixed right-0 top-16 bottom-0 w-48 bg-[#0a0a0a] border-l border-gray-800 z-30 overflow-y-auto">
        <div className="p-6">
          <h3 className="text-white text-sm font-semibold mb-6">Index</h3>
          <nav className="space-y-3">
            {[
              { id: "home", label: "Home", show: true },
              { id: "work", label: "Work", show: user.projects && user.projects.length > 0 },
              { id: "about-me", label: "About me", show: true },
              { id: "what-i-do", label: "Skills", show: user.skills && user.skills.length > 0 },
              { id: "tech-stack", label: "Experience", show: ((user as any).experiences || user.experience) && ((user as any).experiences || user.experience).length > 0 },
              { id: "contact-me", label: "Contact me", show: true }
            ].filter(item => item.show).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left text-xs transition-colors ${
                  activeSection === item.id
                    ? 'text-white border-l-2 border-white pl-3'
                    : 'text-gray-500 hover:text-white pl-3'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-80 lg:mr-48 pt-24 pb-20">
        {/* Hero Section */}
        <section 
          id="home" 
          className={`min-h-screen flex items-center px-8 transition-all duration-1000 ${
            visibleSections.has('home') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="w-full">
            <div className="mb-12">
              <div className="text-gray-600 text-xs mb-4">{"<!-- Hero Section -->"}</div>
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-none">
                <span className="text-white">{user.title?.split(' ')[0] || "software"}</span>
                <br />
                <span className="text-gray-500">{user.title?.split(' ').slice(1).join(' ') || "Developer"}</span>
              </h1>
              <div className="border-l-4 border-gray-700 pl-6 mt-8">
                <p className="text-base text-gray-400 leading-relaxed max-w-2xl">
                  {user.bio || "As a user-centric designer, I create visually refined, highly functional digital experiences that transform ideas into meaningful interactions."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Work Section */}
        {user.projects && user.projects.length > 0 && (
          <section 
            id="work" 
            className={`py-24 px-8 transition-all duration-1000 delay-150 ${
              visibleSections.has('work') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="w-full">
              <div className="mb-12">
                <div className="text-gray-600 text-xs mb-4">{"<!-- Featured work -->"}</div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <button className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-1.5 h-1.5 bg-gray-400"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400"></div>
                      </div>
                    </button>
                    <button className="w-8 h-8 bg-transparent border border-gray-700 rounded flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-0.5">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="w-1 h-1 bg-gray-600"></div>
                        ))}
                      </div>
                    </button>
                  </div>
                  <button className="text-xs text-gray-400 hover:text-white transition-colors">
                    Explore the full collection of my design and development work →
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {user.projects.slice(0, 2).map((project, idx) => (
                  <div
                    key={project.id}
                    className={`group relative bg-[#0f0f0f] border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all duration-700 ${
                      visibleSections.has('work') 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${300 + idx * 150}ms` }}
                  >
                    {(project.live_url || project.github_url) && (
                      <div className="absolute top-4 right-4 z-10">
                        <a
                          href={project.live_url || project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {user.projects.length > 2 && (
                <div className="mt-8 text-center">
                  <button className="px-6 py-2 bg-white text-black text-xs font-semibold rounded hover:bg-gray-200 transition-colors">
                    View all works
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* About Section */}
        <section 
          id="about-me" 
          className={`py-24 px-8 transition-all duration-1000 delay-200 ${
            visibleSections.has('about-me') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="w-full">
            <div className="mb-12">
              <div className="text-gray-600 text-xs mb-4">{"<!-- About me section -->"}</div>
              <div className="flex items-center gap-8 mb-8">
                <h2 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-700">
                  SINCE BEGINNING
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 leading-tight">
                  Inside My Creative Core
                </h3>
                <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
                  <p>
                    {user.bio}
                  </p>
                </div>

                <button
                  onClick={handleDownloadCV}
                  className="mt-8 px-6 py-2 bg-white text-black text-xs font-semibold rounded hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
                >
                  <span>Download CV</span>
                  <span>↓</span>
                </button>
              </div>

              <div className="flex flex-col items-center justify-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
                  <Image
                    src={user.avatar_url || "/avatar.png"}
                    alt="Profile"
                    width={200}
                    height={200}
                    className="relative rounded-full"
                  />
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Follow me:</span>
                  {user.social_links?.github && (
                    <a href={user.social_links.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {user.social_links?.twitter && (
                    <a href={user.social_links.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        {user.skills && user.skills.length > 0 && (
          <section 
            id="what-i-do" 
            className={`py-24 px-8 transition-all duration-1000 delay-300 ${
              visibleSections.has('what-i-do') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="w-full">
              <div className="mb-12">
                <div className="text-gray-600 text-xs mb-4">{"<!-- Skills & Technologies -->"}</div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="grid md:grid-cols-4 gap-4 text-xs text-gray-400">
                    {user.skills.map((skill, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center gap-2 transition-all duration-500 ${
                          visibleSections.has('what-i-do') 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 -translate-x-5'
                        }`}
                        style={{ transitionDelay: `${400 + idx * 50}ms` }}
                      >
                        <span className="text-blue-400">•</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {((user as any).experiences || user.experience) && ((user as any).experiences || user.experience).length > 0 && (
          <section 
            id="tech-stack" 
            className={`py-24 px-8 transition-all duration-1000 delay-400 ${
              visibleSections.has('tech-stack') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="w-full">
              <div className="mb-12">
                <div className="text-gray-600 text-xs mb-4">{"<!-- My experience -->"}</div>
              </div>

              <div className="space-y-6">
                {((user as any).experiences || user.experience).map((exp: any, idx: number) => (
                  <div 
                    key={idx} 
                    className={`border-l-2 border-gray-800 pl-6 transition-all duration-700 ${
                      visibleSections.has('tech-stack') 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-10'
                    }`}
                    style={{ transitionDelay: `${500 + idx * 150}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-white font-bold text-lg">{exp.position}</h3>
                        <p className="text-gray-400 text-sm">{exp.company}</p>
                      </div>
                      <span className="text-gray-500 text-xs">{exp.duration}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mt-3">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section 
          id="contact-me" 
          className={`py-24 px-8 transition-all duration-1000 delay-500 ${
            visibleSections.has('contact-me') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="w-full">
            <div className="mb-12">
              <div className="text-gray-600 text-xs mb-4">{"<!-- Get in Touch -->"}</div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8">Let's Connect</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {user.contact?.email && (
                  <a 
                    href={`mailto:${user.contact.email}`} 
                    className={`flex items-center gap-4 text-gray-400 hover:text-white transition-all duration-500 group ${
                      visibleSections.has('contact-me') 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-10'
                    }`}
                    style={{ transitionDelay: '600ms' }}
                  >
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm">{user.contact.email}</p>
                    </div>
                  </a>
                )}
                {user.contact?.phone && (
                  <a 
                    href={`tel:${user.contact.phone}`} 
                    className={`flex items-center gap-4 text-gray-400 hover:text-white transition-all duration-500 group ${
                      visibleSections.has('contact-me') 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-10'
                    }`}
                    style={{ transitionDelay: '750ms' }}
                  >
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm">{user.contact.phone}</p>
                    </div>
                  </a>
                )}
              </div>

              <div className={`transition-all duration-700 ${
                visibleSections.has('contact-me') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '900ms' }}
              >
                <p className="text-gray-500 text-xs mb-4">Social Links</p>
                <div className="flex flex-wrap gap-3">
                  {user.social_links?.github && (
                    <a href={user.social_links.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
                      <Github className="w-6 h-6 text-gray-400 hover:text-white" />
                    </a>
                  )}
                  {user.social_links?.linkedin && (
                    <a href={user.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
                      <Linkedin className="w-6 h-6 text-gray-400 hover:text-white" />
                    </a>
                  )}
                  {user.social_links?.twitter && (
                    <a href={user.social_links.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
                      <Twitter className="w-6 h-6 text-gray-400 hover:text-white" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Chat Widget */}
      <ChatWidget username={user.username} bio={user.bio} theme="dark" />
    </div>
  );
}