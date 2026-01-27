"use client";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function LoginContent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src="/logo.png" alt="Quickfolio" className="w-6 h-6" />
              </div>
              <span className="text-white text-2xl font-bold">Quickfolio</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-2">Login to your account</h2>
            <p className="text-zinc-400">Enter your username or email below to login</p>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-zinc-900 text-zinc-400">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Username or Email</label>
              <input
                type="text"
                value={formData.identifier}
                onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                placeholder="johndoe or m@example.com"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-zinc-300">Password</label>
                <a href="#" className="text-sm text-zinc-400 hover:text-zinc-300">Forgot your password?</a>
              </div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-black rounded-xl hover:bg-zinc-100 transition-colors font-medium"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-zinc-400 text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:text-blue-400 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center p-12">
        <div className="text-center max-w-2xl">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-8">
            <img src="/logo.png" alt="Quickfolio" className="w-20 h-20" />
          </div>
          <h1 className="text-white text-7xl font-bold mb-8">Quickfolio</h1>
          
          <div className="relative max-w-xl mx-auto mb-6">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full px-6 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          
          <p className="text-zinc-400 text-xl">
            Conversational portfolio that answers questions about you 24/7
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
