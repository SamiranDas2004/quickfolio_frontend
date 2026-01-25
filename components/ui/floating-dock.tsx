"use client";
import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  hideLabels,
  iconSize,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
  hideLabels?: boolean;
  iconSize?: "sm" | "md" | "lg";
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} hideLabels={hideLabels} iconSize={iconSize} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative flex justify-center block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2 items-center"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: idx * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  key={item.title}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800">
                    <div className="h-6 w-6">{item.icon}</div>
                  </div>
                  <span className="text-xs text-neutral-400">{item.title}</span>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  hideLabels,
  iconSize = "lg",
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
  hideLabels?: boolean;
  iconSize?: "sm" | "md" | "lg";
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden items-end justify-center gap-4 px-4 pb-8 md:flex",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} hideLabel={hideLabels} iconSize={iconSize} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  hideLabel,
  iconSize = "lg",
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  hideLabel?: boolean;
  iconSize?: "sm" | "md" | "lg";
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizes = {
    sm: { base: [40, 60, 40], hover: [40, 60, 40], icon: [20, 30, 20] },
    md: { base: [55, 85, 55], hover: [55, 85, 55], icon: [30, 45, 30] },
    lg: { base: [70, 110, 70], hover: [70, 110, 70], icon: [40, 60, 40] },
  };

  const sizeConfig = sizes[iconSize];

  let widthTransform = useTransform(distance, [-150, 0, 150], sizeConfig.base);
  let heightTransform = useTransform(distance, [-150, 0, 150], sizeConfig.base);
  let widthTransformIcon = useTransform(distance, [-150, 0, 150], sizeConfig.icon);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], sizeConfig.icon);

  let width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  let heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} className="flex flex-col items-center gap-2">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-neutral-800"
      >
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
      {!hideLabel && <span className="text-xs text-neutral-400">{title}</span>}
    </a>
  );
}
