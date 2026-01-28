"use client";
import { ensureHttps } from "@/lib/urlUtils";
import { User } from "@/types/user";
import Image from "next/image";
import { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe, ExternalLink, Briefcase } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";

interface ProfessionalPortfolioProps {
  user: User;
}

export default function ProfessionalPortfolio({ user }: ProfessionalPortfolioProps) {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-gray-900">{user.name}</div>
              {user.title && <div className="text-xs text-gray-500">{user.title}</div>}
            </div>
            <div className="hidden md:flex gap-8">
              {["About", "Skills", "Experience", "Projects", "Connect"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section.toLowerCase())}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center px-8 pt-20 bg-gray-50">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Available for work
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-gray-900 leading-none">{user.name}</h1>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-12 bg-gray-900"></div>
              <h2 className="text-lg md:text-xl text-gray-900 uppercase tracking-widest font-medium">
                {user.title || "Professional"}
              </h2>
              <div className="h-px w-12 bg-gray-900"></div>
            </div>
            {user.bio && (
              <p className="text-base md:text-lg text-gray-600 mb-12 leading-relaxed max-w-2xl">{user.bio}</p>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => scrollToSection("connect")}
                className="px-8 py-3 bg-black hover:bg-gray-800 text-white rounded transition-colors text-sm font-medium inline-flex items-center gap-2"
              >
                Email Me
                <span>→</span>
              </button>
              {user.contact?.resume_url && (
                <a
                  href={user.contact.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border border-gray-300 hover:border-gray-400 text-gray-900 rounded transition-colors text-sm font-medium"
                >
                  View Resume
                </a>
              )}
            </div>
          </div>
          
          {/* Vertical Social Links */}
          <div className="fixed right-24 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 items-center">
            {user.social_links?.linkedin && (
              <a
                href={ensureHttps(user.social_links.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 transition-colors text-xl tracking-wider origin-center"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                LinkedIn
              </a>
            )}
            {user.social_links?.github && (
              <a
                href={ensureHttps(user.social_links.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 transition-colors text-xl tracking-wider origin-center"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-gray-900"></div>
                <h2 className="text-sm uppercase tracking-wider text-gray-500 font-medium">About / Profile</h2>
              </div>
              <h3 className="text-4xl font-bold mb-6 text-gray-900 leading-tight">
                {user.title || "Digital Professional"}
              </h3>
              {user.bio && (
                <div className="mb-8">
                  <div className="border-l-4 border-gray-900 pl-6 mb-6">
                    <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                  </div>
                </div>
              )}
              
              {/* Manifesto or Additional Info */}
              {/* {user.bio && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wider text-gray-900">Manifesto</h4>
                  <p className="text-sm text-gray-600 italic leading-relaxed">
                    "In a world of noise, I build clarity. Where complexity exists, I create simplicity."
                  </p>
                </div>
              )} */}

              {user.skills && user.skills.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {user.skills.slice(0, 5).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white border border-gray-200 rounded text-xs text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {user.contact?.location && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">BASED IN</div>
                  <div className="text-sm font-medium text-gray-900">{user.contact.location}</div>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -right-4 bg-black text-white px-4 py-2 rounded-full text-xs font-medium z-10">
                  AVAILABLE
                </div>
                <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-gray-100 border-8 border-white shadow-xl">
                  <Image
                    src={user.avatar_url || "/avatar.png"}
                    alt={user.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-lg shadow-lg border border-gray-200 min-w-max">
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                      {user.title || "Digital Professional"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {user.experience && user.experience.length > 0 && (
            <div className="mt-16 pt-16 border-t border-gray-200 grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Web Design & Development</div>
                <div className="text-sm text-gray-900">
                  Since {new Date(user.experience[0]?.duration?.split('-')[0] || "2023").getFullYear() || "2023"}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      {user.skills && user.skills.length > 0 && (
        <section id="skills" className="py-24 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px w-12 bg-gray-900"></div>
              <h2 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Proficiencies / Build Stack</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {user.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 hover:border-gray-400 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {user.experience && user.experience.length > 0 && (
        <section id="experience" className="py-24 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px w-12 bg-gray-900"></div>
              <h2 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Experience / Work & Impact</h2>
            </div>
            <div className="space-y-8">
              {user.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-white border border-gray-200 rounded-xl p-8 hover:border-gray-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{exp.company}</h3>
                      <p className="text-gray-600 mb-1">{exp.position} • {exp.duration}</p>
                      {user.contact?.location && (
                        <p className="text-sm text-gray-500">{user.contact.location}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">{exp.description}</p>
                  
                  {/* Parse bullet points if description contains them */}
                  {exp.description && exp.description.includes('•') && (
                    <ul className="space-y-2 mb-4">
                      {exp.description.split('•').slice(1).map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-gray-900">•</span>
                          <span>{point.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {user.projects && user.projects.length > 0 && (
        <section id="projects" className="py-24 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px w-12 bg-gray-900"></div>
              <h2 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Featured Work</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {user.projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all group"
                >
                  {project.image_url && (
                    <div className="h-64 overflow-hidden bg-gray-100">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{project.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech_stack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs"
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
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-900 hover:text-black transition-colors font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
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
        .map((section: any, idx: number) => (
          <section key={section.id} id={section.type} className={`py-24 px-8 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-12 bg-gray-900"></div>
                <h2 className="text-sm uppercase tracking-wider text-gray-500 font-medium">{section.title}</h2>
              </div>
              <div className={section.items.length === 1 ? "" : "grid md:grid-cols-2 gap-8"}>
                {section.items.map((item: any) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-8 hover:border-gray-300 transition-colors">
                    <div className="flex gap-6">
                      {item.image_url && (
                        <div className="flex-shrink-0">
                          <img src={item.image_url} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-gray-600 mb-1">{item.subtitle}</p>
                            {item.date && <p className="text-sm text-gray-500">{item.date}</p>}
                          </div>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              View
                            </a>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-gray-700 leading-relaxed mt-4">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))
      }

      {/* Contact Section */}
      <section id="connect" className="py-24 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-gray-900"></div>
            <h2 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Connect</h2>
            <div className="h-px w-12 bg-gray-900"></div>
          </div>
          <h3 className="text-4xl font-bold mb-6 text-gray-900">Let's Work Together</h3>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {user.contact?.email && (
              <a
                href={`mailto:${user.contact.email}`}
                className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-gray-300 transition-all text-left group"
              >
                <Mail className="w-8 h-8 text-gray-900 mb-4" />
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Email</div>
                <div className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors break-all">
                  {user.contact.email}
                </div>
              </a>
            )}

            {user.contact?.phone && (
              <a
                href={`tel:${user.contact.phone}`}
                className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-gray-300 transition-all text-left group"
              >
                <Phone className="w-8 h-8 text-gray-900 mb-4" />
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Phone</div>
                <div className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                  {user.contact.phone}
                </div>
              </a>
            )}

            {user.contact?.location && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-left">
                <MapPin className="w-8 h-8 text-gray-900 mb-4" />
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Location</div>
                <div className="text-sm text-gray-900">{user.contact.location}</div>
              </div>
            )}
          </div>

          {/* Social Links */}
          {user.social_links && Object.keys(user.social_links).filter(key => user.social_links?.[key]).length > 0 && (
            <div className="flex justify-center gap-4 flex-wrap">
              {user.social_links?.linkedin && (
                <a
                  href={ensureHttps(user.social_links.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-900 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              )}
              {user.social_links?.github && (
                <a
                  href={ensureHttps(user.social_links.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-900 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  title="GitHub"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
              )}
              {user.social_links?.twitter && (
                <a
                  href={ensureHttps(user.social_links.twitter)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-900 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  title="Twitter / X"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              )}
              {(user.social_links?.website || user.social_links?.portfolio || user.social_links?.blog) && (
                <a
                  href={ensureHttps(user.social_links.website || user.social_links.portfolio || user.social_links.blog)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-900 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  title="Website"
                >
                  <Globe className="w-5 h-5 text-white" />
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {user.name}. All rights reserved.</p>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget username={user.username} bio={user.bio} theme="light" />
    </div>
  );
}