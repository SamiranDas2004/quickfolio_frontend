"use client";
import { useState, useEffect } from "react";
import { User, Project, Experience } from "@/types/user";
import ImageUpload from "@/components/ImageUpload";
import ThemeCustomizer from "@/components/ThemeCustomizer";
import SectionItemEditor from "@/components/SectionItemEditor";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [showProjectImageUpload, setShowProjectImageUpload] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [editingSection, setEditingSection] = useState<any>(null);
  const [newSectionData, setNewSectionData] = useState({ type: "", title: "", content: "", image: "", link: "" });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      fetchUserData(username, token);
    }
  }, []);

  const fetchUserData = async (username: string, token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
        
        // Fetch analytics
        const analyticsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/analytics/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (analyticsResponse.ok) {
          const analyticsData = await analyticsResponse.json();
          setAnalytics(analyticsData);
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", credentials.username);
        await fetchUserData(credentials.username, data.access_token);
        toast.success("Welcome back!");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleUpdate = async (field: string, value: any) => {
    if (!user) return;
    console.log("Updating field:", field, "with value:", JSON.stringify(value, null, 2));
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });
      
      if (response.ok) {
        const updated = await response.json();
        console.log("Updated user:", updated);
        setUser(updated);
        toast.success("Profile updated successfully");
      } else {
        const error = await response.text();
        console.error("Update failed:", error);
        toast.error("Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed. Please try again.");
    }
  };

  const handleAvatarUpload = async (croppedImage: Blob) => {
    if (!user) return;
    
    const formData = new FormData();
    formData.append("file", croppedImage, "avatar.jpg");
    
    try {
      const token = localStorage.getItem("token");
      toast.loading("Uploading avatar...", { id: "avatar" });
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload-avatar/${user.username}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser({ ...user, avatar_url: data.avatar_url });
        toast.success("Avatar updated successfully", { id: "avatar" });
      } else {
        toast.error("Avatar upload failed", { id: "avatar" });
      }
    } catch (error) {
      toast.error("Avatar upload failed", { id: "avatar" });
    }
  };

  const handleProjectImageUpload = async (croppedImage: Blob) => {
    if (!user || !selectedProjectId) return;
    
    const formData = new FormData();
    formData.append("file", croppedImage, "project.jpg");
    
    try {
      const token = localStorage.getItem("token");
      toast.loading("Uploading project image...", { id: "project-img" });
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload-project-image/${user.username}?project_id=${selectedProjectId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Update project with new image URL
        const updatedProjects = user.projects.map(p => 
          p.id === selectedProjectId ? { ...p, image_url: data.image_url } : p
        );
        setUser({ ...user, projects: updatedProjects });
        toast.success("Project image updated successfully", { id: "project-img" });
      } else {
        toast.error("Project image upload failed", { id: "project-img" });
      }
    } catch (error) {
      toast.error("Project image upload failed", { id: "project-img" });
    }
  };

  const handleThemeSave = async (theme: { background: string; color: string; font: string }) => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          background_preference: theme.background,
          theme_color: theme.color,
          font_family: theme.font,
        }),
      });
      
      if (response.ok) {
        const updated = await response.json();
        setUser(updated);
        toast.success("Theme customized successfully");
        setShowThemeCustomizer(false);
      } else {
        toast.error("Theme update failed");
      }
    } catch (error) {
      toast.error("Theme update failed. Please try again.");
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!user) return;
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      setUploadingImage(true);
      toast.loading("Uploading image...", { id: "section-img" });
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload-project-image/${user.username}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        setNewSectionData({ ...newSectionData, image: data.image_url });
        toast.success("Image uploaded", { id: "section-img" });
      } else {
        toast.error("Upload failed", { id: "section-img" });
      }
    } catch (error) {
      toast.error("Upload failed", { id: "section-img" });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddSection = () => {
    if (!user || !newSectionData.type) {
      toast.error("Please enter section type");
      return;
    }
    const newSection = {
      id: Date.now().toString(),
      type: newSectionData.type,
      title: newSectionData.type.charAt(0).toUpperCase() + newSectionData.type.slice(1),
      order: (user.custom_sections?.length || 0) + 1,
      visible: true,
      items: []
    };
    const updatedSections = [...(user.custom_sections || []), newSection];
    handleUpdate("custom_sections", updatedSections);
    setShowAddSectionModal(false);
    setNewSectionData({ type: "", title: "", content: "", image: "", link: "" });
    setEditingSection(newSection);
    toast.success("Section created. Add items now.");
  };

  const handleDeleteSection = (sectionId: string) => {
    if (!user) return;
    const updatedSections = user.custom_sections?.filter(s => s.id !== sectionId) || [];
    handleUpdate("custom_sections", updatedSections);
    toast.success("Section deleted");
  };

  const handleToggleSection = (sectionId: string) => {
    if (!user) return;
    const updatedSections = user.custom_sections?.map(s => 
      s.id === sectionId ? { ...s, visible: !s.visible } : s
    ) || [];
    handleUpdate("custom_sections", updatedSections);
  };

  const handleReorderSections = (sections: any[]) => {
    const reordered = sections.map((s, idx) => ({ ...s, order: idx + 1 }));
    handleUpdate("custom_sections", reordered);
  };

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-white dark:bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
        
        <div className="relative z-10 bg-black/50 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-zinc-400">Manage your portfolio</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {message && <p className="text-red-400 text-sm text-center">{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 font-medium"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Projects", value: user?.projects?.length || 0, icon: "📁" },
    { label: "Skills", value: user?.skills?.length || 0, icon: "⚡" },
    { label: "Experience", value: user?.experience?.length || 0, icon: "💼" },
    { label: "Profile Views", value: analytics?.view_count || 0, icon: "👁️" },
  ];

  return (
    <>
      {showAvatarUpload && (
        <ImageUpload
          onUpload={handleAvatarUpload}
          aspectRatio={1}
          title="Upload Avatar"
          onClose={() => setShowAvatarUpload(false)}
        />
      )}
      
      {showProjectImageUpload && (
        <ImageUpload
          onUpload={handleProjectImageUpload}
          aspectRatio={16/9}
          title="Upload Project Image"
          onClose={() => {
            setShowProjectImageUpload(false);
            setSelectedProjectId(null);
          }}
        />
      )}

      {showThemeCustomizer && (
        <ThemeCustomizer
          currentTheme={{
            background: user?.background_preference || "ripple",
            color: (user as any)?.theme_color || "blue",
            font: (user as any)?.font_family || "inter",
          }}
          onSave={handleThemeSave}
          onClose={() => setShowThemeCustomizer(false)}
        />
      )}

      {editingSection && (
        <SectionItemEditor
          section={editingSection}
          username={user?.username || ""}
          onSave={(updatedSection) => {
            const updatedSections = user?.custom_sections?.map(s =>
              s.id === updatedSection.id ? updatedSection : s
            ) || [];
            handleUpdate("custom_sections", updatedSections);
            setEditingSection(null);
          }}
          onClose={() => setEditingSection(null)}
        />
      )}
      
      <div className="relative min-h-screen bg-black flex overflow-hidden">
      <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Sidebar */}
      <aside className="relative z-10 w-64 bg-black/50 backdrop-blur-xl border-r border-white/10 flex flex-col">
        {/* User Profile */}
        <div className="p-6 border-b border-white/10">
          <div 
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-2xl mb-3 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setShowAvatarUpload(true)}
            title="Click to change avatar"
          >
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user?.name?.charAt(0) || "U"
            )}
          </div>
          <h2 className="text-white font-semibold text-lg">{user?.name}</h2>
          <p className="text-zinc-400 text-sm">@{user?.username}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          {["overview", "analytics", "profile", "projects", "skills", "social", "sections"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left py-3 px-4 rounded-xl font-medium transition-all capitalize mb-2 ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab === "social" ? "Social Links" : tab}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <a
            href={`/${user?.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-2 bg-white/5 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            View Portfolio
          </a>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        <div className="p-8">
          {message && (
            <div className="mb-6 p-4 bg-green-600/20 border border-green-500/50 rounded-xl text-green-400 text-center">
              {message}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-zinc-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
                      <div className="text-white text-lg">{user?.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Title</label>
                      <div className="text-white text-lg">{user?.title}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
                      <div className="text-white text-lg">{user?.email}</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Bio</label>
                    <div className="text-white">{user?.bio}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Analytics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                    <div className="text-4xl mb-2">👁️</div>
                    <div className="text-3xl font-bold text-white mb-1">{analytics?.view_count || 0}</div>
                    <div className="text-zinc-400 text-sm">Portfolio Views</div>
                  </div>
                  <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                    <div className="text-4xl mb-2">💬</div>
                    <div className="text-3xl font-bold text-white mb-1">{analytics?.chat_count || 0}</div>
                    <div className="text-zinc-400 text-sm">Chat Interactions</div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Popular Questions</h3>
                  {analytics?.popular_questions?.length > 0 ? (
                    <div className="space-y-3">
                      {analytics.popular_questions.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <span className="text-white">{item.question}</span>
                          <span className="text-blue-400 font-semibold">{item.count}x</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-zinc-400">No questions asked yet</p>
                  )}
                </div>

                <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Recent Chats</h3>
                  {analytics?.recent_chats?.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {analytics.recent_chats.map((chat: any, idx: number) => (
                        <div key={idx} className="p-4 bg-white/5 rounded-lg space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="text-blue-400 font-semibold text-sm">Q:</span>
                            <p className="text-white text-sm flex-1">{chat.question}</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-400 font-semibold text-sm">A:</span>
                            <p className="text-zinc-400 text-sm flex-1">{chat.response}</p>
                          </div>
                          <p className="text-zinc-500 text-xs">{new Date(chat.timestamp).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-zinc-400">No chat history yet</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      onBlur={(e) => handleUpdate("name", e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Title</label>
                    <input
                      type="text"
                      defaultValue={user?.title}
                      onBlur={(e) => handleUpdate("title", e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Bio</label>
                    <textarea
                      defaultValue={user?.bio}
                      onBlur={(e) => handleUpdate("bio", e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                <div>
  <label className="block text-sm font-medium text-white mb-2">
    Background Theme
  </label>

  <select
    defaultValue={user?.background_preference}
    onChange={(e) => handleUpdate("background_preference", e.target.value)}
    className="
      w-full px-4 py-3
      bg-black
      border border-white/20
      rounded-xl
      text-white
      focus:outline-none
      focus:ring-2 focus:ring-blue-500
    "
  >
    <option className="bg-black text-white" value="ripple">Ripple Effect</option>
    <option className="bg-black text-white" value="beams">Beams Effect</option>
    <option className="bg-black text-white" value="vortex">Vortex Effect</option>
    <option className="bg-black text-white" value="lines">Lines Effect</option>
    <option className="bg-black text-white" value="birds">Birds Effect</option>
    <option className="bg-black text-white" value="globe">Globe Effect</option>
    <option className="bg-black text-white" value="halo">Halo Effect</option>
    <option className="bg-black text-white" value="dots">Dots Effect</option>
    <option className="bg-black text-white" value="clouds">Clouds 2 Effect</option>
    <option className="bg-black text-white" value="clouds1">Clouds Effect</option>
    <option className="bg-black text-white" value="rings">Rings Effect</option>
    <option className="bg-black text-white" value="blackpanther">Black Panther</option>
    <option className="bg-black text-white" value="evil_linux">Evil Linux</option>
    <option className="bg-black text-white" value="linux">Linux</option>
    <option className="bg-black text-white" value="windows_xp">Windows XP</option>
  </select>
</div>
<div>
  <label className="block text-sm font-medium text-white mb-2">
    Portfolio Template
  </label>
  <select
    defaultValue={user?.template_type || "conversational"}
    onChange={(e) => handleUpdate("template_type", e.target.value)}
    className="
      w-full px-4 py-3
      bg-black
      border border-white/20
      rounded-xl
      text-white
      focus:outline-none
      focus:ring-2 focus:ring-blue-500
    "
  >
    <option className="bg-black text-white" value="conversational">Conversational (Minimal)</option>
    <option className="bg-black text-white" value="fullpage">Full Page (Dark)</option>
    <option className="bg-black text-white" value="professional">Professional (White)</option>
    <option className="bg-black text-white" value="modern">Modern (Glassmorphism)</option>
  </select>
  <p className="text-zinc-400 text-xs mt-2">Choose between minimal conversational style or traditional full-page portfolio</p>
</div>

                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Projects</h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                    Add Project
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user?.projects?.map((project: Project) => (
                    <div key={project.id} className="bg-white/5 border border-white/20 rounded-xl overflow-hidden">
                      {project.image_url ? (
                        <div className="relative h-40 group">
                          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                          <button
                            onClick={() => {
                              setSelectedProjectId(project.id);
                              setShowProjectImageUpload(true);
                            }}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                          >
                            Change Image
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedProjectId(project.id);
                            setShowProjectImageUpload(true);
                          }}
                          className="w-full h-40 bg-white/5 border-b border-white/20 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <span className="text-4xl">📷</span>
                        </button>
                      )}
                      <div className="p-6">
                        <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
                        <p className="text-zinc-400 text-sm mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech_stack?.map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Skills</h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                    Add Skill
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {user?.skills?.map((skill, idx) => (
                    <div key={idx} className="px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-white rounded-xl font-medium">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "social" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Social Links</h2>
                <p className="text-zinc-400 mb-6">Add your social media profiles and links. These will be displayed on your portfolio.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { key: "linkedin", label: "LinkedIn", icon: "💼", placeholder: "https://linkedin.com/in/username" },
                    { key: "github", label: "GitHub", icon: "💻", placeholder: "https://github.com/username" },
                    { key: "twitter", label: "Twitter / X", icon: "🐦", placeholder: "https://twitter.com/username" },
                    { key: "instagram", label: "Instagram", icon: "📸", placeholder: "https://instagram.com/username" },
                    { key: "facebook", label: "Facebook", icon: "👥", placeholder: "https://facebook.com/username" },
                    { key: "youtube", label: "YouTube", icon: "📺", placeholder: "https://youtube.com/@username" },
                    { key: "tiktok", label: "TikTok", icon: "🎵", placeholder: "https://tiktok.com/@username" },
                    { key: "medium", label: "Medium", icon: "✍️", placeholder: "https://medium.com/@username" },
                    { key: "dev", label: "Dev.to", icon: "👨‍💻", placeholder: "https://dev.to/username" },
                    { key: "hashnode", label: "Hashnode", icon: "📝", placeholder: "https://hashnode.com/@username" },
                    { key: "stackoverflow", label: "Stack Overflow", icon: "📚", placeholder: "https://stackoverflow.com/users/id" },
                    { key: "dribbble", label: "Dribbble", icon: "🎨", placeholder: "https://dribbble.com/username" },
                    { key: "behance", label: "Behance", icon: "🎭", placeholder: "https://behance.net/username" },
                    { key: "figma", label: "Figma", icon: "🎯", placeholder: "https://figma.com/@username" },
                    { key: "discord", label: "Discord", icon: "💬", placeholder: "username#0000" },
                    { key: "telegram", label: "Telegram", icon: "✈️", placeholder: "https://t.me/username" },
                    { key: "whatsapp", label: "WhatsApp", icon: "📱", placeholder: "+1234567890" },
                    { key: "portfolio", label: "Portfolio Website", icon: "🌐", placeholder: "https://yourwebsite.com" },
                    { key: "blog", label: "Blog", icon: "📰", placeholder: "https://yourblog.com" },
                    { key: "website", label: "Personal Website", icon: "🏠", placeholder: "https://yoursite.com" },
                  ].map((social) => (
                    <div key={social.key} className="bg-white/5 border border-white/20 rounded-xl p-4">
                      <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                        <span className="text-2xl">{social.icon}</span>
                        {social.label}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          defaultValue={user?.social_links?.[social.key] || ""}
                          placeholder={social.placeholder}
                          onBlur={(e) => {
                            const newLinks = { ...user?.social_links, [social.key]: e.target.value };
                            handleUpdate("social_links", newLinks);
                          }}
                          className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {user?.social_links?.[social.key] && (
                          <button
                            onClick={() => {
                              const newLinks = { ...user?.social_links };
                              delete newLinks[social.key];
                              handleUpdate("social_links", newLinks);
                            }}
                            className="px-3 py-2 bg-red-600/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors text-sm"
                            title="Remove link"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "sections" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Custom Sections</h2>
                    <p className="text-zinc-400 text-sm mt-1">Add custom sections to your portfolio</p>
                  </div>
                  <button 
                    onClick={() => setShowAddSectionModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    + Add Section
                  </button>
                </div>

                {user?.custom_sections && user.custom_sections.length > 0 ? (
                  <div className="space-y-4">
                    {user.custom_sections.sort((a: any, b: any) => a.order - b.order).map((section: any) => (
                      <div key={section.id} className="bg-white/5 border border-white/20 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="text-white font-semibold">{section.title}</h3>
                              <p className="text-zinc-400 text-sm capitalize">{section.type} • {section.items?.length || 0} items</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingSection(section)}
                              className="px-3 py-2 bg-blue-600/20 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm"
                            >
                              Manage Items
                            </button>
                            <button
                              onClick={() => handleToggleSection(section.id)}
                              className={`px-3 py-1 rounded-lg text-sm ${
                                section.visible 
                                  ? "bg-green-600/20 text-green-400 border border-green-500/50" 
                                  : "bg-zinc-600/20 text-zinc-400 border border-zinc-500/50"
                              }`}
                            >
                              {section.visible ? "Visible" : "Hidden"}
                            </button>
                            <button
                              onClick={() => handleDeleteSection(section.id)}
                              className="px-3 py-2 bg-red-600/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white/5 border border-white/20 rounded-xl">
                    <p className="text-zinc-400 mb-4">No custom sections yet</p>
                    <button 
                      onClick={() => setShowAddSectionModal(true)}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      Add Your First Section
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>

      {showAddSectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-black/90 border border-white/20 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Section</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Section Heading *</label>
                <input
                  type="text"
                  value={newSectionData.type}
                  onChange={(e) => setNewSectionData({ ...newSectionData, type: e.target.value })}
                  placeholder="e.g., Education, Awards, Hobbies, Languages"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-zinc-500 text-xs mt-1">This will be displayed as the section heading</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddSection}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
              >
                Create Section
              </button>
              <button
                onClick={() => {
                  setShowAddSectionModal(false);
                  setNewSectionData({ type: "", title: "", content: "", image: "", link: "" });
                }}
                className="px-6 py-3 bg-white/5 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
