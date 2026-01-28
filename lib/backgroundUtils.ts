const imageThemes = ["blackpanther", "evil_linux", "linux", "windows_xp"];
const vantaThemes = ["birds", "globe", "halo", "dots", "clouds", "clouds1", "rings", "vortex"];

export function getTextColor(backgroundType: string) {
  if (vantaThemes.includes(backgroundType)) return "text-white";
  if (imageThemes.includes(backgroundType)) return "text-white";
  if (backgroundType === "ripple") return "text-neutral-600 dark:text-white";
  return "text-neutral-600 dark:text-neutral-400";
}

export function getSecondaryTextColor(backgroundType: string) {
  if (vantaThemes.includes(backgroundType)) return "text-white/80";
  if (imageThemes.includes(backgroundType)) return "text-white/90";
  if (backgroundType === "ripple") return "text-neutral-500 dark:text-neutral-300";
  return "text-neutral-500";
}
