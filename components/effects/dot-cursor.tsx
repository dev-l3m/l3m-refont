"use client";

import { useEffect, useState } from "react";

export function DotCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Vérifier si on est sur mobile (pointer: coarse)
    const checkMobile = () => {
      const mobile = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(mobile);
      return mobile;
    };
    
    const mobile = checkMobile();
    if (mobile) return;

    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const handleMediaChange = () => {
      const isMobileNow = checkMobile();
      if (isMobileNow) {
        setIsVisible(false);
      }
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    let animationFrameId: number;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateCursor = () => {
      // Smoothing avec lerp (factor 0.15 pour un mouvement fluide)
      currentX = lerp(currentX, targetX, 0.15);
      currentY = lerp(currentY, targetY, 0.15);

      setPosition({ x: currentX, y: currentY });

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Démarrer l'animation
    animationFrameId = requestAnimationFrame(updateCursor);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  // Ne pas afficher sur mobile
  if (isMobile) return null;

  return (
    <div
      className="fixed pointer-events-none z-[55] transition-opacity duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div className="w-2 h-2 rounded-full bg-ink/60"></div>
    </div>
  );
}
