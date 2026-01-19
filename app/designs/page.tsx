"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { BackgroundLines } from "@/components/ui/background-lines";
import { BackgroundBeams } from "@/components/ui/background-beams";
import VantaBirds from "@/components/VantaBirds";
import VantaGlobe from "@/components/VantaGlobe";
import VantaHalo from "@/components/VantaHalo";
import VantaDots from "@/components/VantaDots";
import VantaClouds from "@/components/VantaClouds";
import VantaClouds1 from "@/components/VantaClouds1";
import VantaRings from "@/components/VantaRings";
import { Vortex } from "@/components/ui/vortex";

export default function DesignsPage() {
  const [selectedDesign, setSelectedDesign] = useState("ripple");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDesign, setModalDesign] = useState<string | null>(null);

  const designs = [
    { id: "ripple", name: "Ripple Effect", description: "Smooth ripple animations" },
    { id: "beams", name: "Beams Effect", description: "Dynamic light beams" },
    { id: "beamsalt", name: "Beams Alt Effect", description: "Gradient light beams" },
    { id: "vortex", name: "Vortex Effect", description: "Swirling particle vortex" },
    { id: "lines", name: "Lines Effect", description: "Animated line patterns" },
    { id: "birds", name: "Birds Effect", description: "Flying birds animation" },
    { id: "globe", name: "Globe Effect", description: "3D rotating globe" },
    { id: "halo", name: "Halo Effect", description: "Glowing halo rings" },
    { id: "dots", name: "Dots Effect", description: "Particle dot matrix" },
    { id: "clouds", name: "Clouds 2 Effect", description: "Floating cloud layers" },
    { id: "clouds1", name: "Clouds Effect", description: "Soft cloud movement" },
    { id: "rings", name: "Rings Effect", description: "Concentric ring waves" },
  ];

  const renderDesign = (designId: string) => {
    switch(designId) {
      case "ripple": return <BackgroundRippleEffect />;
      case "beams": return <BackgroundBeamsWithCollision><div /></BackgroundBeamsWithCollision>;
      case "beamsalt": return <BackgroundBeams />;
      case "vortex": return <Vortex backgroundColor="black" baseHue={120} particleCount={500} rangeY={800} className="absolute inset-0" />;
      case "lines": return <BackgroundLines><div /></BackgroundLines>;
      case "birds": return <VantaBirds />;
      case "globe": return <VantaGlobe />;
      case "halo": return <VantaHalo />;
      case "dots": return <VantaDots />;
      case "clouds": return <VantaClouds />;
      case "clouds1": return <VantaClouds1 />;
      case "rings": return <VantaRings />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Modal */}
      {modalOpen && modalDesign && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="relative w-full h-full max-w-7xl max-h-[90vh] bg-black border border-zinc-800 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition"
            >
              ✕
            </button>
            <div className="w-full h-full">
              {renderDesign(modalDesign)}
            </div>
          </div>
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-white">quickfolio</Link>
          
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-sm text-zinc-400 hover:text-white">Home</Link>
            <Link href="/examples" className="text-sm text-zinc-400 hover:text-white">Examples</Link>
            <Link href="/designs" className="text-sm text-white">Designs</Link>
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
              Background Designs
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-zinc-400 max-w-2xl mx-auto"
            >
              Choose from 12 stunning animated backgrounds to make your portfolio stand out
            </motion.p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">            {designs.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setSelectedDesign(design.id);
                  setModalDesign(design.id);
                  setModalOpen(true);
                }}
                className={`group relative rounded-2xl border overflow-hidden cursor-pointer transition ${
                  selectedDesign === design.id
                    ? "border-blue-500 ring-2 ring-blue-500/50"
                    : "border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="h-[500px] relative bg-black overflow-hidden">
                  {renderDesign(design.id)}
                  
                  {selectedDesign === design.id && (
                    <div className="absolute top-4 right-4 bg-blue-500 rounded-full p-2">
                      <IconCheck className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                <div className="p-6 bg-zinc-900/50">
                  <h3 className="text-xl font-bold text-white mb-2">{design.name}</h3>
                  <p className="text-zinc-400 text-sm">{design.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to customize your portfolio?</h2>
            <p className="text-zinc-400 mb-8">Sign up and choose your favorite design</p>
            <Link href="/signup">
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
