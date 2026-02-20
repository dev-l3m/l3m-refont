"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const listeners = new Set<{ element: EventTarget; handler: () => void }>();

    const toggleVisibility = () => {
      // Vérifier le scroll sur tous les conteneurs possibles
      let scrollY = 0;
      
      // 1. Vérifier window et document
      scrollY = Math.max(
        scrollY,
        window.pageYOffset || 
        window.scrollY || 
        document.documentElement.scrollTop || 
        document.body.scrollTop || 
        0
      );
      
      // 2. Vérifier les panels scrollables
      const panels = document.querySelectorAll('[data-panel-index]');
      for (const panel of panels) {
        const htmlPanel = panel as HTMLElement;
        if (htmlPanel && htmlPanel.scrollTop > scrollY) {
          scrollY = htmlPanel.scrollTop;
        }
      }
      
      // 3. Vérifier les éléments avec overflow-y-auto
      const scrollables = document.querySelectorAll('.overflow-y-auto');
      scrollables.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl && htmlEl.scrollTop > scrollY) {
          scrollY = htmlEl.scrollTop;
        }
      });
      
      // 4. Vérifier le conteneur principal avec h-[100svh]
      const mainContainer = document.querySelector('[class*="h-[100svh]"]') as HTMLElement;
      if (mainContainer && mainContainer.scrollTop > scrollY) {
        scrollY = mainContainer.scrollTop;
      }
      
      // Afficher le bouton après avoir scrollé de 200px (seuil plus bas pour s'afficher plus tôt)
      setIsVisible(scrollY > 200);
    };

    // Fonction pour ajouter les listeners
    const setupListeners = () => {
      // Écouter le scroll sur window
      if (!Array.from(listeners).some(l => l.element === window)) {
        window.addEventListener("scroll", toggleVisibility, { passive: true });
        listeners.add({ element: window, handler: toggleVisibility });
      }
      
      // Écouter le scroll sur tous les panels
      const panels = document.querySelectorAll('[data-panel-index]');
      panels.forEach((panel) => {
        if (!Array.from(listeners).some(l => l.element === panel)) {
          panel.addEventListener("scroll", toggleVisibility, { passive: true });
          listeners.add({ element: panel, handler: toggleVisibility });
        }
      });
      
      // Écouter le scroll sur les éléments scrollables
      const scrollables = document.querySelectorAll('.overflow-y-auto');
      scrollables.forEach((el) => {
        if (!Array.from(listeners).some(l => l.element === el)) {
          el.addEventListener("scroll", toggleVisibility, { passive: true });
          listeners.add({ element: el, handler: toggleVisibility });
        }
      });
      
      // Écouter le scroll sur le conteneur principal
      const mainContainer = document.querySelector('[class*="h-[100svh]"]') as HTMLElement;
      if (mainContainer && !Array.from(listeners).some(l => l.element === mainContainer)) {
        mainContainer.addEventListener("scroll", toggleVisibility, { passive: true });
        listeners.add({ element: mainContainer, handler: toggleVisibility });
      }
    };

    // Initialiser les listeners
    setupListeners();
    
    // Vérifier au chargement
    toggleVisibility();
    
    // Vérifier périodiquement (fallback) et réinitialiser les listeners
    const interval = setInterval(() => {
      toggleVisibility();
      setupListeners();
    }, 500);

    return () => {
      // Nettoyer tous les listeners
      listeners.forEach(({ element, handler }) => {
        element.removeEventListener("scroll", handler);
      });
      listeners.clear();
      clearInterval(interval);
    };
  }, []);

  const scrollToTop = () => {
    const container = scrollContainerRef.current;
    
    // Essayer de scroller le conteneur interne d'abord
    if (container && container.scrollTop > 0) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    
    // Fallback: scroller window
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    
    // Fallback supplémentaire
    if (document.documentElement) {
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 lg:bottom-12 lg:right-[calc(80px+2rem)] xl:right-[calc(160px+2rem)] z-[100] w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group cursor-pointer"
          aria-label="Retour en haut de la page"
        >
          <i className="fi fi-rr-arrow-up text-xl lg:text-2xl group-hover:-translate-y-1 transition-transform"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
