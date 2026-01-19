"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export const Vortex = ({
  children,
  className,
  containerClassName,
  particleCount = 700,
  rangeY = 400,
  baseHue = 0,
  backgroundColor = "black",
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  backgroundColor?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particleCount_ = particleCount;
  const particlePropCount = 9;
  const particlePropsLength = particleCount_ * particlePropCount;
  const rangeY_ = rangeY;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseSpeed = 0.1;
  const rangeSpeed = 2;
  const baseRadius = 1;
  const rangeRadius = 4;
  const baseHue_ = baseHue;
  const rangeHue = 100;
  const noiseSteps = 3;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;
  const backgroundColor_ = backgroundColor;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particleProps = new Float32Array(particlePropsLength);
    let center: [number, number] = [0, 0];
    let tick = 0;
    let simplex = createNoise3D();
    let animationFrameId: number;

    const setup = () => {
      const container = containerRef.current;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
      center[0] = canvas.width / 2;
      center[1] = canvas.height / 2;
    };

    const initParticles = () => {
      tick = 0;
      simplex = createNoise3D();
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        initParticle(i);
      }
    };

    const initParticle = (i: number) => {
      const x = Math.random() * canvas.width;
      const y = center[1] + (Math.random() - 0.5) * rangeY_;
      const vx = 0;
      const vy = 0;
      const life = 0;
      const ttl = baseTTL + Math.random() * rangeTTL;
      const speed = baseSpeed + Math.random() * rangeSpeed;
      const radius = baseRadius + Math.random() * rangeRadius;
      const hue = baseHue_ + Math.random() * rangeHue;

      particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    };

    const drawParticles = () => {
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i);
      }
    };

    const updateParticle = (i: number) => {
      const i2 = 1 + i;
      const i3 = 2 + i;
      const i4 = 3 + i;
      const i5 = 4 + i;
      const i6 = 5 + i;
      const i7 = 6 + i;
      const i8 = 7 + i;
      const i9 = 8 + i;

      const x = particleProps[i];
      const y = particleProps[i2];
      const n = simplex(x * xOff, y * yOff, tick * zOff) * noiseSteps * Math.PI * 2;
      const vx = Math.cos(n);
      const vy = Math.sin(n);
      let life = particleProps[i5];
      const ttl = particleProps[i6];
      const speed = particleProps[i7];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      const radius = particleProps[i8];
      const hue = particleProps[i9];

      drawParticle(x, y, x2, y2, life, ttl, radius, hue);

      life++;

      particleProps[i] = x2;
      particleProps[i2] = y2;
      particleProps[i3] = vx;
      particleProps[i4] = vy;
      particleProps[i5] = life;

      if (
        life > ttl ||
        x2 > canvas.width ||
        x2 < 0 ||
        y2 > canvas.height ||
        y2 < 0
      ) {
        initParticle(i);
      }
    };

    const drawParticle = (
      x: number,
      y: number,
      x2: number,
      y2: number,
      life: number,
      ttl: number,
      radius: number,
      hue: number
    ) => {
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsla(${hue},100%,60%,${Math.min(1, life / ttl)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    };

    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor_;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawParticles();
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      setup();
      initParticles();
    };

    setup();
    initParticles();
    draw();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    particleCount_,
    rangeY_,
    baseHue_,
    backgroundColor_,
  ]);

  return (
    <div className={cn("relative h-full w-full", containerClassName)} ref={containerRef}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
