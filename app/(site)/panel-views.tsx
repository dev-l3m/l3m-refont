import React from "react";
import HomePage from "@/app/page";
import AboutPage from "@/app/about/page";
import SolutionsPage from "@/app/solutions/page";
import type { ReactNode } from "react";

export type PanelViewMap = Record<string, ReactNode>;

/**
 * Récupère les vues des panels pour le slider (home, À PROPOS et SOLUTIONS)
 */
export async function getPanelViews(): Promise<PanelViewMap> {
  // Les pages sont des Server Components async, on les appelle directement
  const [homeContent, aboutContent, solutionsContent] = await Promise.all([
    HomePage(),
    AboutPage(),
    SolutionsPage(),
  ]);

  return {
    "/": homeContent,
    "/about": aboutContent,
    "/solutions": solutionsContent,
  };
}
