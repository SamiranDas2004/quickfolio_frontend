"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import { SharedBackground } from "@/components/SharedBackground";
import { GridBackground } from "@/components/DynamicBackground";
import Carousel from "@/components/ui/carousel";

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
  image_url: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ProjectsPage() {
  const params = useParams();
  const username = params.username as string;
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [backgroundType, setBackgroundType] = useState("ripple");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [bgType, setBgType] = useState<"ripple" | "beams" | "lines">("ripple");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, projectsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${username}`),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${username}`)
        ]);
        
        if (userRes.ok) {
          const userData = await userRes.json();
          setBackgroundType(userData.background_preference || "ripple");
        }
        
        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          setProjects(projectsData);
          
          if (projectsData.length > 0) {
            setMessages([{
              role: "assistant",
              content: `I have ${projectsData.length} project${projectsData.length > 1 ? 's' : ''} to show you. Feel free to ask me anything about them!`
            }]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setSending(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/projects/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I couldn't process that question." },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const slides = projects.map((project, index) => ({
    title: project.title,
    button: project.live_url ? "View Live" : (project.github_url ? "View on GitHub" : ""),
    src: project.image_url || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    description: project.description,
    tech_stack: project.tech_stack,
    github_url: project.github_url,
    live_url: project.live_url,
    onClick: () => setSelectedProject(projects[index])
  }));

  return (
    <div className="relative flex min-h-screen flex-col font-sans overflow-hidden bg-white dark:bg-black">
      <SharedBackground backgroundType={backgroundType} />

      <main className="relative z-10 flex flex-col h-screen w-full px-8 py-8">
        <div className="mb-8 flex-shrink-0 max-w-7xl mx-auto w-full">
          <Navigation username={username} currentPage="/projects" />
        </div>

        {projects.length > 0 ? (
          <div className="flex-1 flex items-center justify-center max-w-7xl mx-auto w-full">
            <Carousel slides={slides} />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-zinc-400 text-xl">No projects available</p>
          </div>
        )}

        {/* Chat Widget */}
        <div>
          {!isChatOpen ? (
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
              <div className="bg-black/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-white/20">
                Ask About Projects
              </div>
              <button
                onClick={() => setIsChatOpen(true)}
                className="w-16 h-16 lg:w-20 lg:h-20 bg-white border-2 border-white/20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
              >
                <svg className="w-8 h-8 lg:w-10 lg:h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="fixed bottom-24 right-6 z-50 w-96 lg:w-[600px] max-w-[calc(100vw-3rem)]">
              <div className="bg-white border border-black/20 rounded-2xl shadow-2xl flex flex-col h-[600px] lg:h-[800px] max-h-[85vh]">
                <div className="p-4 border-b border-black/20 flex items-center justify-between">
                  <div>
                    <h3 className="text-black font-semibold text-base">Chat</h3>
                    <p className="text-zinc-600 text-xs">Ask about projects</p>
                  </div>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-black/10 flex items-center justify-center transition-all"
                  >
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div 
                  className="flex-1 overflow-y-auto p-4 space-y-3"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(0,0,0,0.2) transparent'
                  } as React.CSSProperties}
                >
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-50">
                      <svg className="w-12 h-12 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="text-black/40 text-xs">Start a conversation</p>
                    </div>
                  )}
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          msg.role === "user"
                            ? "bg-black text-white"
                            : "bg-black/10 text-black border border-black/20"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {sending && (
                    <div className="flex justify-start">
                      <div className="bg-black/10 text-black border border-black/20 rounded-lg px-3 py-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                          </div>
                          <span className="text-xs">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 border-t border-black/20">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type your message..."
                      disabled={sending}
                      className="flex-1 bg-black/5 border border-black/20 rounded-lg px-3 py-2 text-sm text-black placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-black/40 disabled:opacity-50"
                    />
                    <button
                      onClick={handleSend}
                      disabled={sending || !input.trim()}
                      className="px-3 py-2 bg-black text-white hover:bg-black/90 disabled:bg-black/50 rounded-lg transition-all disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedProject(null)}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden m-4 animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <div className="relative overflow-hidden">
                {selectedProject.image_url && (
                  <img src={selectedProject.image_url} alt={selectedProject.title} className="w-full h-72 object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                >
                  <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-8 max-h-[calc(90vh-18rem)] overflow-y-auto" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.2) transparent'} as React.CSSProperties}>
                <h2 className="text-4xl font-bold text-black mb-6">{selectedProject.title}</h2>
                
                {selectedProject.description && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Description</h3>
                    <p className="text-black text-lg leading-relaxed">{selectedProject.description}</p>
                  </div>
                )}
                
                {selectedProject.tech_stack && selectedProject.tech_stack.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech_stack.map((tech, idx) => (
                        <span key={idx} className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3">
                  {selectedProject.live_url && (
                    <a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-4 bg-black text-white rounded-xl text-center font-semibold hover:bg-black/90 transition-all hover:scale-105 active:scale-95"
                    >
                      View Live →
                    </a>
                  )}
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-4 bg-black/10 text-black rounded-xl text-center font-semibold hover:bg-black/20 transition-all hover:scale-105 active:scale-95"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}