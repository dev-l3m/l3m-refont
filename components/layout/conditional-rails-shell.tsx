"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ConditionalRailsShellProps {
  children: ReactNode;
  railsShell: ReactNode;
  footer: ReactNode;
}

export function ConditionalRailsShell({ children, railsShell, footer }: ConditionalRailsShellProps) {
  const pathname = usePathname();

  // Ne pas afficher les rails et footer pour les pages admin/login et admin/register
  if (pathname === "/admin/login" || pathname === "/admin/register") {
    return <>{children}</>;
  }

  return (
    <>
      {railsShell}
      {footer}
    </>
  );
}
