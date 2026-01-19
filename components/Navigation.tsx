"use client";
import { NoiseBackground } from "@/components/ui/noise-background";
import { useRouter } from "next/navigation";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome, IconBriefcase, IconMail, IconFileText, IconCode, IconUser } from "@tabler/icons-react";

interface NavigationProps {
  username: string;
  currentPage?: string;
}

export default function Navigation({ username, currentPage }: NavigationProps) {
  const router = useRouter();

  const navItems = [
    { label: "Me", path: `/me`, icon: <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { label: "Skills", path: `/skills`, icon: <IconCode className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { label: "Contact", path: `/contact`, icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { label: "Resume", path: `/resume`, icon: <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { label: "Projects", path: `/projects`, icon: <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  ];

  const dockItems = navItems.map(item => ({
    title: item.label,
    icon: item.icon,
    href: `/${username}${item.path}`,
  }));

  return (
    <FloatingDock items={dockItems} />
  );
}
