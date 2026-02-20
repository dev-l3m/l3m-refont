"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

// Pages du slider (home, À PROPOS et SOLUTIONS)
const SLIDER_PAGES = [
  "/",
  "/about",
  "/solutions",
] as const;

/**
 * Vérifie si une route est active (exact match ou sous-route)
 */
function isActiveRoute(pathname: string, href: string): boolean {
  // Cas spécial pour la home "/"
  if (href === "/") {
    return pathname === "/";
  }
  // Pour les autres routes, vérifier exact match ou sous-route
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * Détermine l'index actif depuis le pathname
 */
function getActiveIndex(pathname: string): number {
  const found = SLIDER_PAGES.findIndex((page) =>
    isActiveRoute(pathname, page)
  );
  // Si la route n'est pas dans SLIDER_PAGES, retourner 0 (home)
  // Pour la home exacte "/", on retourne 0
  if (found === -1) {
    return 0;
  }
  return found;
}

interface PanelsSliderProps {
  panelViews: Record<string, ReactNode>;
}

export function PanelsSlider({ panelViews }: PanelsSliderProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const activeIndex = getActiveIndex(pathname);
  
  // Garder en mémoire l'index précédent pour déterminer la direction
  const prevIndexRef = useRef<number>(activeIndex);
  const isFirstRenderRef = useRef<boolean>(true);

  // Refs pour chaque panel (pour le scroll interne)
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  // Déterminer la direction du slide (seulement si ce n'est pas le premier rendu)
  const direction = isFirstRenderRef.current 
    ? null 
    : (activeIndex > prevIndexRef.current ? "right" : "left");
  
  // Mettre à jour l'index précédent après avoir déterminé la direction
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
    }
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Scroll top du panel actif (scroll interne), pas window
  useEffect(() => {
    const activePanel = panelRefs.current[activeIndex];
    if (activePanel) {
      activePanel.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [activeIndex]);

  // Calculer translateX en % : -activeIndex * (100 / nombre de pages)%
  // Chaque panel fait 100 / SLIDER_PAGES.length % de la largeur totale
  // Pour slide vers le panel actif, on déplace de activeIndex * largeur d'un panel
  const x = `-${activeIndex * (100 / SLIDER_PAGES.length)}%`;
  
  // Position initiale selon la direction :
  // - Si slide de droite vers gauche (direction="right") : le contenu vient de la droite (x initial = position précédente)
  // - Si slide de gauche vers droite (direction="left") : le contenu vient de la gauche (x initial = position précédente)
  // - Si premier rendu (direction=null) : pas d'animation initiale, position directe
  const getInitialX = () => {
    if (prefersReducedMotion || direction === null) return x;
    const panelWidth = 100 / SLIDER_PAGES.length;
    // La position initiale est la position de l'index précédent
    return `-${prevIndexRef.current * panelWidth}%`;
  };

  return (
    <div className="relative w-full h-[100svh] overflow-hidden">
      <motion.div
        key={`${activeIndex}-${direction || 'initial'}`} // Key pour forcer le remount et réappliquer initial
        className="flex h-full"
        style={{
          width: `${SLIDER_PAGES.length * 100}%`, // Largeur totale = nombre de pages * 100%
          willChange: prefersReducedMotion ? "auto" : "transform",
        }}
        initial={{ x: getInitialX() }}
        animate={{ x }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.85, ease: [0.22, 1, 0.36, 1] } // Ease premium comme Temper
        }
      >
        {/* Tous les panels sont rendus (pas de lazy mount) pour une animation fluide */}
        {SLIDER_PAGES.map((route, idx) => (
          <section
            key={route}
            ref={(el) => {
              panelRefs.current[idx] = el;
            }}
            data-panel-index={idx}
            className="h-full overflow-y-auto bg-sand scrollbar-hide"
            style={{
              flexShrink: 0,
              width: `${100 / SLIDER_PAGES.length}%`, // Chaque panel = 100% / nombre de pages
            }}
          >
            {panelViews[route]}
          </section>
        ))}
      </motion.div>
    </div>
  );
}
