"use client";
import { useEffect, useRef } from "react";

export default function VantaHalo() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      // Load THREE.js from CDN
      const threeScript = document.createElement("script");
      threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
      threeScript.onload = () => {
        // Load Vanta Halo after THREE.js is loaded
        const vantaScript = document.createElement("script");
        vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js";
        vantaScript.onload = () => {
          // @ts-ignore
          if (window.VANTA && vantaRef.current) {
            // @ts-ignore
            vantaEffect.current = window.VANTA.HALO({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              backgroundColor: 0x0,
              baseColor: 0x3b82f6,
              amplitudeFactor: 1.0,
              size: 1.5,
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
