"use client";
import { User } from "@/types/user";
import Image from "next/image";
import { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe, ExternalLink } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/moving-border";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import ChatWidget from "@/components/ChatWidget";
import { ensureHttps } from "@/lib/urlUtils";

interface FullPagePortfolioProps {
  user: User;
}

export default function FullPagePortfolio({ user }: FullPagePortfolioProps) {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">{user.name}</div>
            <div className="hidden md:flex gap-8">
              {["home", "about", "skills", "projects", "experience", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section ? "text-blue-400" : "text-white/70 hover:text-white"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <BackgroundBeams className="absolute inset-0" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl font-bold mb-4">{user.name}</h1>
              <h2 className="text-3xl text-blue-400 mb-6">{user.title}</h2>
              <p className="text-xl text-white/70 mb-8">{user.bio}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Get In Touch
                </button>
                {user.contact?.resume_url && (
                  <a
                    href={user.contact.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 border border-white/20 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    View Resume
                  </a>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-blue-400">
                <Image
                  src={user.avatar_url || "/avatar.png"}
                  alt={user.name}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {user.bio && (
        <section id="about" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
            <div className="relative rounded-2xl border p-2 md:rounded-3xl md:p-3">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <p className="text-lg text-white/80 leading-relaxed relative z-10">{user.bio}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {user.skills && user.skills.length > 0 && (
        <section id="skills" className="py-20 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {user.skills.map((skill, idx) => (
                <Button
                  key={idx}
                  borderRadius="1.75rem"
                  className="bg-black text-white border-slate-800 px-6 py-3"
                  containerClassName="h-14 w-48"
                  duration={3000 + idx * 500}
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {user.projects && user.projects.length > 0 && (
        <section id="projects" className="py-20 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {user.projects.map((project) => (
                <CardSpotlight key={project.id} className="h-full">
                  {project.image_url && (
                    <div className="h-48 -m-10 mb-6 overflow-hidden rounded-t-md">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold relative z-20 text-white mb-3">{project.title}</h3>
                  <p className="text-neutral-200 relative z-20 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4 relative z-20">
                    {project.tech_stack?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 relative z-20">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
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
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </CardSpotlight>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {user.experience && user.experience.length > 0 && (
        <section id="experience" className="py-20 px-6">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-4xl font-bold mb-12 text-center">Experience</h2>
            <div className="space-y-8">
              {user.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-400/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{exp.position}</h3>
                      <p className="text-blue-400 text-lg">{exp.company}</p>
                    </div>
                    <span className="text-white/70">{exp.duration}</span>
                  </div>
                  <p className="text-white/70">{exp.description}</p>
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
          <section key={section.id} id={section.type} className="py-20 px-6">
            <div className="max-w-6xl mx-auto w-full">
              <h2 className="text-4xl font-bold mb-12 text-center">{section.title}</h2>
              <div className={section.items.length === 1 ? "" : "grid md:grid-cols-2 gap-8"}>
                {section.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-400/50 transition-colors"
                  >
                    {item.image_url && (
                      <div className="mb-4">
                        <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover rounded-lg" />
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <p className="text-blue-400">{item.subtitle}</p>
                        {item.date && <p className="text-white/70 text-sm mt-1">{item.date}</p>}
                      </div>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-white/70">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))
      }

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 text-center">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {user.contact?.email && (
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-6">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-white/70 text-sm">Email</p>
                    <a href={`mailto:${user.contact.email}`} className="text-white hover:text-blue-400">
                      {user.contact.email}
                    </a>
                  </div>
                </div>
              )}
              {user.contact?.phone && (
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-6">
                  <Phone className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-white/70 text-sm">Phone</p>
                    <a href={`tel:${user.contact.phone}`} className="text-white hover:text-blue-400">
                      {user.contact.phone}
                    </a>
                  </div>
                </div>
              )}
              {user.contact?.location && (
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-6">
                  <MapPin className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-white/70 text-sm">Location</p>
                    <p className="text-white">{user.contact.location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Connect With Me</h3>
              <div className="space-y-4">
                {user.social_links?.linkedin && (
                  <a
                    href={ensureHttps(user.social_links.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                    LinkedIn
                  </a>
                )}
                {user.social_links?.github && (
                  <a
                    href={ensureHttps(user.social_links.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                  >
                    <Github className="w-6 h-6" />
                    GitHub
                  </a>
                )}
                {user.social_links?.twitter && (
                  <a
                    href={ensureHttps(user.social_links.twitter)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                  >
                    <Twitter className="w-6 h-6" />
                    Twitter
                  </a>
                )}
                {user.social_links?.website && (
                  <a
                    href={ensureHttps(user.social_links.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                  >
                    <Globe className="w-6 h-6" />
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/70">
          <p>© {new Date().getFullYear()} {user.name}. All rights reserved.</p>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget username={user.username} bio={user.bio} theme="dark" />
    </div>
  );
}
