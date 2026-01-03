"use client";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Spotlight } from "@/components/ui/spotlight";

interface SharedBackgroundProps {
  backgroundType: string;
}

export function SharedBackground({ backgroundType }: SharedBackgroundProps) {
  const imageThemes = ["blackpanther", "evil_linux", "linux", "windows_xp"];
  
  if (imageThemes.includes(backgroundType)) {
    return (
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(/themes/${backgroundType}.png)`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
    );
  }
  
  if (backgroundType === "ripple") {
    return (
      <div className="absolute inset-0 bg-white dark:bg-black">
        <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
      </div>
    );
  }
  
  if (backgroundType === "beams") {
    return (
      <BackgroundBeamsWithCollision className="absolute inset-0 min-h-screen w-full">
        <div />
      </BackgroundBeamsWithCollision>
    );
  }
  
  // Default to lines
  return (
    <div className="absolute inset-0 bg-black">
      <BackgroundLines className="absolute inset-0">
        <div />
      </BackgroundLines>
    </div>
  );
}

export function getTextColor(backgroundType: string) {
  const imageThemes = ["blackpanther", "evil_linux", "linux", "windows_xp"];
  
  if (imageThemes.includes(backgroundType)) {
    return "text-white";
  }
  
  if (backgroundType === "ripple") {
    return "text-neutral-600 dark:text-white";
  }
  
  return "text-neutral-600 dark:text-neutral-400";
}

export function getSecondaryTextColor(backgroundType: string) {
  const imageThemes = ["blackpanther", "evil_linux", "linux", "windows_xp"];
  
  if (imageThemes.includes(backgroundType)) {
    return "text-white/90";
  }
  
  if (backgroundType === "ripple") {
    return "text-neutral-500 dark:text-neutral-300";
  }
  
  return "text-neutral-500";
}