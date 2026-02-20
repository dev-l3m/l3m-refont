"use client";

import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function StickyCta() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    // Vérifier si le CTA a été dismissé
    const dismissed = localStorage.getItem("ctaDismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
      return;
    }

    setIsDismissed(false);

    // Fonction pour gérer le scroll
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage >= 25) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Écouter les événements de scroll
    window.addEventListener("scroll", handleScroll);
    
    // Vérifier immédiatement au chargement
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("ctaDismissed", "true");
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleContactClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Ne pas afficher si dismissé
  if (isDismissed || !isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 bg-white shadow-xl rounded-full px-4 py-2 border border-rail/30 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div className="flex items-center gap-3">
        <Link
          href="/solutions"
          className="text-sm font-sans font-medium text-ink hover:text-accent transition-colors duration-200 px-2 py-1"
        >
          Solutions
        </Link>
        <div className="w-px h-4 bg-rail" />
        <Link
          href="#contact"
          onClick={handleContactClick}
          className="text-sm font-sans font-medium text-ink hover:text-accent transition-colors duration-200 px-2 py-1"
        >
          Contact
        </Link>
        <button
          onClick={handleDismiss}
          className="ml-1 p-1 hover:bg-sand rounded-full transition-colors duration-200"
          aria-label="Fermer"
        >
          <X className="w-4 h-4 text-muted" />
        </button>
      </div>
    </div>
  );
}
