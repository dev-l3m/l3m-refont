"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { PanelsSlider } from "@/components/transitions/panels-slider";

const SLIDER_PAGES = ["/", "/about", "/solutions"] as const;

function isSliderPage(pathname: string): boolean {
  return SLIDER_PAGES.some((page) => {
    // Cas spécial pour la home "/"
    if (page === "/") {
      return pathname === "/";
    }
    // Pour les autres routes, vérifier exact match ou sous-route
    return pathname === page || pathname.startsWith(page + "/");
  });
}

interface PanelsWrapperProps {
  panelViews: Record<string, ReactNode>;
  children: ReactNode;
}

export function PanelsWrapper({
  panelViews,
  children,
}: PanelsWrapperProps) {
  const pathname = usePathname();
  const shouldUseSlider = isSliderPage(pathname);

  if (shouldUseSlider) {
    return <PanelsSlider panelViews={panelViews} />;
  }

  // Pour les pages non-slider, rendre le contenu normal avec scroll
  return (
    <div className="w-full h-[100svh] overflow-y-auto bg-sand scrollbar-hide">
      {children}
    </div>
  );
}
