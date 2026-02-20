import React from "react";
import { headers } from "next/headers";
import { getPanelViews } from "./panel-views";
import { RailsLayoutClient } from "@/components/layout/rails-layout-client";
import { PanelsWrapper } from "@/components/layout/panels-wrapper";

export default async function RailsShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  
  // Ne pas afficher les rails pour les pages admin/login et admin/register
  if (pathname === "/admin/login" || pathname === "/admin/register") {
    return <>{children}</>;
  }

  const panelViews = await getPanelViews();
  return (
    <RailsLayoutClient>
      <PanelsWrapper panelViews={panelViews}>{children}</PanelsWrapper>
    </RailsLayoutClient>
  );
}
