"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { IconExternalLink, IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export default function ExamplesPage() {
  const examples = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      category: "Design",
      image: "/assests/banner.png",
      url: "https://quickfolio.dev/sarahchen",
      description: "Minimalist portfolio showcasing UX/UI projects",
      tags: ["UI/UX", "Figma", "Design Systems"],
    },
    {
      name: "Alex Rodriguez",
      role: "Full Stack Developer",
      category: "Engineering",
      image: "/assests/c1.webp",
      url: "https://quickfolio.dev/alexrodriguez",
      description: "Interactive portfolio with live code demos",
      tags: ["React", "Node.js", "AWS"],
    },
    {
      name: "Maya Patel",
      role: "Data Scientist",
      category: "Data",
      image: "/assests/banner.png",
      url: "https://quickfolio.dev/mayapatel",
      description: "Data visualization and ML project showcase",
      tags: ["Python", "ML", "Analytics"],
    },
    {
      name: "James Wilson",
      role: "Marketing Director",
      category: "Marketing",
      image: "/assests/c1.webp",
      url: "https://quickfolio.dev/jameswilson",
      description: "Campaign portfolio with metrics and results",
      tags: ["Strategy", "Growth", "Analytics"],
    },
    {
      name: "Emily Zhang",
      role: "Content Writer",
      category: "Content",
      image: "/assests/banner.png",
      url: "https://quickfolio.dev/emilyzhang",
      description: "Writing samples and published articles",
      tags: ["Copywriting", "SEO", "Blogging"],
    },
    {
      name: "David Kim",
      role: "DevOps Engineer",
      category: "Engineering",
      image: "/assests/c1.webp",
      url: "https://quickfolio.dev/davidkim",
      description: "Infrastructure and automation projects",
      tags: ["Docker", "Kubernetes", "CI/CD"],
    },
  ];

  const categories = ["All", "Design", "Engineering", "Data", "Marketing", "Content"];

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-white">
            <img src="/logo.png" alt="Quickfolio" className="w-8 h-8" />
            Quickfolio
          </Link>
          
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-sm text-zinc-400 hover:text-white">Home</Link>
            <Link href="/examples" className="text-sm text-white">Examples</Link>
            <Link href="/designs" className="text-sm text-zinc-400 hover:text-white">Designs</Link>
            <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white">Pricing</Link>
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="/dashboard" className="text-sm text-zinc-400 hover:text-white">Dashboard</a>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          </div>
        </div>
      </header>

      <div className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Portfolio Examples
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-zinc-400 max-w-2xl mx-auto"
            >
              Get inspired by portfolios created with Quickfolio. From designers to developers, see how professionals showcase their work.
            </motion.p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <motion.div
                key={example.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-zinc-700 transition"
              >
                <div className="aspect-video relative overflow-hidden bg-zinc-800">
                  <img
                    src={example.image}
                    alt={example.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center pb-4">
                    <a
                      href={example.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white text-sm font-semibold"
                    >
                      View Portfolio <IconExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{example.name}</h3>
                      <p className="text-zinc-400 text-sm">{example.role}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold">
                      {example.category}
                    </span>
                  </div>

                  <p className="text-zinc-400 text-sm mb-4">{example.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {example.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to create yours?</h2>
            <p className="text-zinc-400 mb-8">Join thousands of professionals showcasing their work with Quickfolio</p>
            <Link href="/">
              <HoverBorderGradient
                containerClassName="rounded-full"
                className="bg-blue-500 text-white px-8 py-3 inline-block font-semibold"
              >
                Get Started Free
              </HoverBorderGradient>
            </Link>
          </div>
        </div>
      </div>

      <footer className="w-full bg-black border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-zinc-400 text-sm">
              &copy; 2026 quickfolio. All rights reserved. A product by{" "}
              <a
                href="https://42vectors.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-white transition"
              >
                42vectors
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
