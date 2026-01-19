"use client";
import { useEffect, useRef } from "react";

export default function VantaDots() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      // Load THREE.js from CDN
      const threeScript = document.createElement("script");
      threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
      threeScript.onload = () => {
        // Load Vanta Dots after THREE.js is loaded
        const vantaScript = document.createElement("script");
        vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js";
        vantaScript.onload = () => {
          // @ts-ignore
          if (window.VANTA && vantaRef.current) {
            // @ts-ignore
            vantaEffect.current = window.VANTA.DOTS({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              backgroundColor: 0x0,
              color: 0x3b82f6,
              color2: 0x8b5cf6,
              size: 3.0,
              spacing: 20.0,
            });
          }
        };
        document.head.appendChild(vantaScript);
      };
      document.head.appendChild(threeScript);
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return <div ref={vantaRef} className="absolute inset-0 w-full h-full" />;
}
