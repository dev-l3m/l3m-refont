"use client";

import { useEffect } from "react";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Ajouter la classe pour permettre le scroll sur desktop
    document.body.classList.add("allow-scroll");
    
    return () => {
      // Retirer la classe quand on quitte la page
      document.body.classList.remove("allow-scroll");
    };
  }, []);

  return <>{children}</>;
}
