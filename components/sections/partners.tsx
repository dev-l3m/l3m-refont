"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface PartnersProps {
  title?: string;
  text?: string;
}

// Liste des logos des partenaires
const partnerLogos = [
  "cpermis.png",
  "DLM.png",
  "DMP.avif",
  "EBHI.png",
  "ethni.png",
  "excellence.jpg",
  "FONDATION.png",
  "groupeDPM.jpg",
  "GWH.jpeg",
  "lba.png",
  "MBD.png",
  "RSEConseil.png",
  "SARAN.png",
  "signeParis.png",
  "transsouflE.jpg",
];

export function Partners({ title, text }: PartnersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(true);

  // Auto-scroll horizontal
  useEffect(() => {
    if (!isScrolling || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels par frame

    const scroll = () => {
      if (scrollContainer) {
        scrollPosition += scrollSpeed;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0; // Retour au début
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isScrolling]);

  const handleMouseEnter = () => setIsScrolling(false);
  const handleMouseLeave = () => setIsScrolling(true);

  return (
    <section className="py-24 lg:py-32 bg-sand">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
        <FadeIn>
          <div className="max-w-5xl mb-12">
            {title && (
              <h2 className="font-serif text-display font-medium text-ink leading-[1.05] mb-6">
                {title}
              </h2>
            )}
            {text && (
              <p className="font-sans text-lg leading-relaxed text-ink/70 max-w-3xl">
                {text}
              </p>
            )}
          </div>
        </FadeIn>

        {/* Carousel horizontal avec scroll infini */}
        <div
          ref={scrollRef}
          className="overflow-x-hidden flex gap-6 py-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Dupliquer les logos pour un scroll infini */}
          {[...partnerLogos, ...partnerLogos].map((logo, index) => (
            <PartnerLogo
              key={`${logo}-${index}`}
              logo={logo}
              index={index}
            />
          ))}
        </div>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}

interface PartnerLogoProps {
  logo: string;
  index: number;
}

function PartnerLogo({ logo, index }: PartnerLogoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBounced, setHasBounced] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBounced) {
            setIsVisible(true);
            setHasBounced(true);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px",
      }
    );

    const currentLogo = logoRef.current;
    if (currentLogo) {
      observer.observe(currentLogo);
    }

    return () => {
      if (currentLogo) {
        observer.unobserve(currentLogo);
      }
    };
  }, [hasBounced]);

  return (
    <div
      ref={logoRef}
      className="flex-shrink-0 w-[200px] lg:w-[240px]"
    >
      <motion.div
        className="relative h-32 lg:h-40 bg-white rounded-lg shadow-sm border border-rail/50 p-6 flex items-center justify-center hover:shadow-md transition-shadow"
        initial={{ opacity: 0, y: 30 }}
        animate={
          isVisible
            ? {
                opacity: 1,
                y: 0,
              }
            : { opacity: 0.3, y: 30 }
        }
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        whileHover={{ scale: 1.05, y: -5 }}
      >
        <Image
          src={`/assets/logo-partners/${logo}`}
          alt={`Logo partenaire ${logo.replace(/\.[^/.]+$/, "")}`}
          width={200}
          height={120}
          className="object-contain max-w-full max-h-full"
          unoptimized
        />
      </motion.div>
    </div>
  );
}
