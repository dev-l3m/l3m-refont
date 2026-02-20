"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { TransitionLink } from "@/components/transitions/transition-link";
import { L3M_CONTENT } from "@/src/content/l3m-legacy-content";

// Ne pas afficher les rails pour les pages admin/login et admin/register
const ADMIN_AUTH_PAGES = ["/admin/login", "/admin/register", "/admin", "/admin/newsletter","/admin/users","/admin/settings","/admin/appointments"];

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "À Propos", href: "/about" },
  { name: "Solutions", href: "/solutions" },
];

// Rails droits fixes (2 colonnes)
const RIGHT_RAILS = [
  { href: "/about", label: L3M_CONTENT.nav.about },
  { href: "/solutions", label: L3M_CONTENT.nav.solutions },
] as const;

/**
 * Vérifie si une route est active (exact match ou sous-route)
 */
function isActiveRoute(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * Détermine le label à afficher dans le rail gauche selon la route active
 */
function getLeftRailLabel(pathname: string): string {
  // Solutions
  if (pathname === "/solutions" || pathname.startsWith("/solutions/")) {
    return L3M_CONTENT.nav.solutions;
  }
  // À propos
  if (pathname === "/about" || pathname.startsWith("/about/")) {
    return L3M_CONTENT.nav.about;
  }
  // Accueil
  if (pathname === "/") {
    return L3M_CONTENT.nav.home;
  }
  // Fallback par défaut pour les autres routes
  return L3M_CONTENT.nav.home;
}

/**
 * Détermine l'URL correspondant au label affiché dans le rail gauche
 */
function getLeftRailHref(pathname: string): string {
  // Solutions
  if (pathname === "/solutions" || pathname.startsWith("/solutions/")) {
    return "/";
  }
  // À propos
  if (pathname === "/about" || pathname.startsWith("/about/")) {
    return "/";
  }
  // Accueil
  return "/";
}

export function RailsLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Ne pas afficher les rails pour les pages admin/login et admin/register
  if (ADMIN_AUTH_PAGES.includes(pathname)) {
    return <>{children}</>;
  }
  
  const leftRailLabel = getLeftRailLabel(pathname);
  const leftRailHref = getLeftRailHref(pathname);
  
  // Vérifier si le label actif correspond à un des rails droits (donc cliquable)
  const isLeftRailLabelClickable = RIGHT_RAILS.some((rail) => rail.label === leftRailLabel);
  
  // Filtrer les rails droits pour masquer celui qui est actif
  // Le label actif doit apparaître UNIQUEMENT dans le rail gauche (au milieu), jamais dans les rails droits
  const visibleRightRails = RIGHT_RAILS.filter((rail) => {
    // Masquer le rail si son label correspond au label affiché dans le rail gauche
    return rail.label !== leftRailLabel;
  });
  const rightRailsWidth = visibleRightRails.length * 80; // 80px par rail

  return (
    <div className="min-h-screen flex">
      {/* Rail gauche UNIQUE - Desktop (64px fixe) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-16 bg-rail border-r border-rail-dark/20 flex flex-col items-center justify-between py-8 z-40 overflow-hidden">
        {/* Logo en haut */}
        <TransitionLink href="/" className="text-ink hover:opacity-80 transition-opacity duration-250">
          <Image
            src="/assets/logo/logo_l3m.png"
            alt="L3M Holding"
            width={70}
            height={100}
            className="object-contain"
            priority
          />
        </TransitionLink>
        
        {/* Label dynamique au centre (vertical-rl) - cliquable si c'est un rail droit */}
        <div className="flex flex-col items-center gap-6 flex-1 justify-center">
          <div className="h-px w-8 bg-rail-dark/40"></div>
          {isLeftRailLabelClickable ? (
            <TransitionLink
              href={leftRailHref}
              className="text-[10px] font-medium tracking-[0.15em] uppercase [writing-mode:vertical-rl] [text-orientation:mixed] text-ink hover:text-accent transition-colors duration-250 cursor-pointer"
            >
              {leftRailLabel}
            </TransitionLink>
          ) : (
            <div className="text-[10px] font-medium tracking-[0.15em] uppercase [writing-mode:vertical-rl] [text-orientation:mixed] text-ink">
              {leftRailLabel}
            </div>
          )}
          <div className="h-px w-8 bg-rail-dark/40"></div>
        </div>
        
        {/* "M" en bas */}
        <span className="text-5xl font-serif font-bold text-ink leading-none"></span>
      </aside>

      {/* Rails droits - Desktop (masquer le rail actif car il est dans le rail gauche) */}
      <aside className="hidden lg:flex fixed right-0 top-0 h-full z-40">
        {visibleRightRails.map((rail, index) => {
          return (
            <div
              key={rail.href}
              className="w-20 flex items-center justify-center border-l border-rail-dark/20 bg-rail-dark/10 text-muted"
            >
              <TransitionLink
                href={rail.href}
                className="text-[10px] font-medium tracking-[0.15em] transition-colors duration-250 [writing-mode:vertical-rl] [text-orientation:mixed] uppercase text-muted hover:text-ink hover:opacity-80"
              >
                {rail.label}
              </TransitionLink>
            </div>
          );
        })}
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sand/95 backdrop-blur-sm border-b border-rail-dark/30">
        <nav className="flex items-center justify-between px-6 py-4">
          <TransitionLink href="/" className="text-ink hover:opacity-80 transition-opacity duration-250">
            <Image
              src="/assets/logo/logo_l3m.png"
              alt="L3M Holding"
              width={80}
              height={40}
              className="object-contain h-8"
              priority
            />
          </TransitionLink>
          <button
            type="button"
            className="text-ink hover:text-accent transition-colors duration-250"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="border-t border-rail-dark/30 bg-sand">
            <div className="px-6 py-4 space-y-2">
              {navigation.map((item) => (
                <TransitionLink
                  key={item.name}
                  href={item.href}
                  className={`block py-2 text-sm font-medium transition-colors duration-250 ${
                    pathname === item.href
                      ? "text-accent"
                      : "text-muted hover:text-ink"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </TransitionLink>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Contenu central - Marges : gauche 64px, droite dynamique selon rails visibles */}
      <div 
        className="flex-1 lg:ml-[64px] overflow-hidden relative h-[100svh]"
        style={{ 
          marginRight: rightRailsWidth === 80 ? '80px' : rightRailsWidth === 160 ? '160px' : '0px'
        }}
      >
        {children}
      </div>
    </div>
  );
}
