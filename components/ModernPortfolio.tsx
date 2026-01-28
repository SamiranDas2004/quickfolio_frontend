"use client";
import { ensureHttps } from "@/lib/urlUtils";
import { User } from "@/types/user";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe, ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import ChatWidget from "@/components/ChatWidget";

interface ModernPortfolioProps {
  user: User;
}

export default function ModernPortfolio({ user }: ModernPortfolioProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      {/* Floating orbs with parallax */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ transform: `translate(-${scrollY * 0.1}px, -${scrollY * 0.05}px)` }}
        />
      </div>

      {/* Glassmorphic Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {user.name}
              </span>
            </div>
            <div className="hidden md:flex gap-8">
              {["home", "about", "skills", "projects", "experience", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all relative group ${
                    activeSection === section ? "text-purple-400" : "text-white/70 hover:text-white"
                  }`}
                >
                  {section}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <BackgroundBeams className="absolute inset-0" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-purple-300">Available for opportunities</span>
              </div>
              
              <h1 className="text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-gradient">
                  {user.name}
                </span>
              </h1>
              
              <div className="flex items-center gap-4">
                <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                <h2 className="text-2xl text-purple-300 font-light">{user.title}</h2>
              </div>
              
              <p className="text-xl text-white/60 leading-relaxed max-w-xl">{user.bio}</p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                >
                  Let's Connect
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                {user.contact?.resume_url && (
                  <a
                    href={user.contact.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 backdrop-blur-sm transition-all"
                  >
                    View Resume
                  </a>
                )}
              </div>
            </div>

            {/* 3D Avatar Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm bg-white/5 transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={user.avatar_url || "/avatar.png"}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Cards */}
      {user.bio && (
        <section id="about" className="relative py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto" />
            </div>
            
            <div className="relative group scroll-animate">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
                <p className="text-xl text-white/80 leading-relaxed">{user.bio}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section with Animated Tags */}
      {user.skills && user.skills.length > 0 && (
        <section id="skills" className="relative py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Skills & Expertise
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto" />
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center scroll-animate">
              {user.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="group relative px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-purple-500/50 transition-all hover:scale-110 cursor-pointer"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:to-blue-500/20 rounded-2xl transition-all" />
                  <span className="relative text-lg font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section with Hover Effects */}
      {user.projects && user.projects.length > 0 && (
        <section id="projects" className="relative py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {user.projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="group relative scroll-animate"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all">
                    {project.image_url && (
                      <div className="h-64 overflow-hidden">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/60 mb-6 leading-relaxed">{project.description}</p>
                      
                      {project.tech_stack && project.tech_stack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech_stack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm border border-purple-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-4">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white/70 hover:text-purple-400 transition-colors"
                          >
                            <Github className="w-5 h-5" />
                            Code
                          </a>
                        )}
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white/70 hover:text-blue-400 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Timeline */}
      {user.experience && user.experience.length > 0 && (
        <section id="experience" className="relative py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Experience
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto" />
            </div>
            
            <div className="space-y-8 relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500" />
              
              {user.experience.map((exp, idx) => (
                <div key={exp.id} className="relative pl-20 scroll-animate">
                  <div className="absolute left-6 top-6 w-5 h-5 bg-purple-500 rounded-full border-4 border-black" />
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-purple-400">{exp.position}</h3>
                        <p className="text-xl text-white/80">{exp.company}</p>
                      </div>
                      <span className="text-white/60 text-sm">{exp.duration}</span>
                    </div>
                    <p className="text-white/70 leading-relaxed">{exp.description}</p>
                  </div>
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
        .map((section: any) => (
          <section key={section.id} id={section.type} className="relative py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 scroll-animate">
                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {section.title}
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto" />
              </div>
              
              <div className={section.items.length === 1 ? "" : "grid md:grid-cols-2 gap-8"}>
                {section.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all scroll-animate"
                  >
                    {item.image_url && (
                      <div className="h-56 overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-purple-300">{item.subtitle}</p>
                          {item.date && <p className="text-white/60 text-sm mt-1">{item.date}</p>}
                        </div>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/70 hover:text-purple-400 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-white/70 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))
      }

      {/* Contact Section with Glassmorphism */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-6" />
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12 scroll-animate">
            {user.contact?.email && (
              <a
                href={`mailto:${user.contact.email}`}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 rounded-2xl transition-all" />
                <Mail className="w-8 h-8 text-purple-400 mb-4" />
                <p className="text-sm text-white/60 mb-2">Email</p>
                <p className="text-white break-all">{user.contact.email}</p>
              </a>
            )}
            
            {user.contact?.phone && (
              <a
                href={`tel:${user.contact.phone}`}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 rounded-2xl transition-all" />
                <Phone className="w-8 h-8 text-purple-400 mb-4" />
                <p className="text-sm text-white/60 mb-2">Phone</p>
                <p className="text-white">{user.contact.phone}</p>
              </a>
            )}
            
            {user.contact?.location && (
              <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <MapPin className="w-8 h-8 text-purple-400 mb-4" />
                <p className="text-sm text-white/60 mb-2">Location</p>
                <p className="text-white">{user.contact.location}</p>
              </div>
            )}
          </div>
          
          {/* Social Links */}
          {user.social_links && Object.keys(user.social_links).filter(key => user.social_links?.[key]).length > 0 && (
            <div className="flex justify-center gap-4">
              {user.social_links?.linkedin && (
                <a
                  href={ensureHttps(user.social_links.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {user.social_links?.github && (
                <a
                  href={ensureHttps(user.social_links.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                >
                  <Github className="w-6 h-6" />
                </a>
              )}
              {user.social_links?.twitter && (
                <a
                  href={ensureHttps(user.social_links.twitter)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )}
              {(user.social_links?.website || user.social_links?.portfolio) && (
                <a
                  href={ensureHttps(user.social_links.website || user.social_links.portfolio)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                >
                  <Globe className="w-6 h-6" />
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-8 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/60">
            © {new Date().getFullYear()} {user.name}. Crafted with passion.
          </p>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget username={user.username} bio={user.bio} />
    </div>
  );
}
