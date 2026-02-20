"use client";

import { ReactNode, MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  "aria-label"?: string;
  target?: string;
  rel?: string;
}

export function TransitionLink({
  href,
  children,
  className,
  prefetch,
  onClick,
  "aria-label": ariaLabel,
  target,
  rel,
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Si target="_blank" ou autre, laisser le comportement par défaut
    if (target === "_blank" || rel === "noopener" || rel === "noreferrer") {
      return;
    }

    // Si c'est un lien externe, laisser le comportement par défaut
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return;
    }

    e.preventDefault();
    
    // Appeler le onClick personnalisé si fourni
    onClick?.(e);
    
    // Navigation avec scroll: false (le TabsShell gère le slide)
    router.push(href, { scroll: false });
  };

  return (
    <Link
      href={href}
      className={cn(className)}
      prefetch={prefetch}
      onClick={handleClick}
      aria-label={ariaLabel}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  );
}
