import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { DotCursor } from "@/components/effects/dot-cursor";
import { Footer } from "@/components/layout/footer";
import { StructuredData } from "@/components/structured-data";
import RailsShell from "@/app/(site)/rails-shell";
import { ConditionalRailsShell } from "@/components/layout/conditional-rails-shell";
import { prisma } from "@/lib/prisma";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({ 
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findMany({
    where: {
      key: {
        in: ['site_name', 'site_description'],
      },
    },
  });

  const siteName = settings.find(s => s.key === 'site_name')?.value || 'L3M Holding';
  const siteDescription = settings.find(s => s.key === 'site_description')?.value || 'Investissement & Développement Stratégique';

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.l3m-holding.net'),
    icons: {
      icon: '/assets/logo/logo_l3m.png',
      apple: '/assets/logo/logo_l3m.png',
    },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      siteName,
      description: siteDescription,
    },
    twitter: {
      card: 'summary_large_image',
      description: siteDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      'flaticon-cdn': 'https://cdn-uicons.flaticon.com/2.1.0/uicons-regular-rounded/css/uicons-regular-rounded.css',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.1.0/uicons-regular-rounded/css/uicons-regular-rounded.css" />
        <link rel="icon" href="/assets/logo/logo_l3m.png" type="image/png" />
      </head>
      <body className="antialiased font-sans bg-sand text-ink">
        <StructuredData />
        <DotCursor />
        <ConditionalRailsShell 
          railsShell={<RailsShell>{children}</RailsShell>}
          footer={<Footer />}
        >
          {children}
        </ConditionalRailsShell>
        <Toaster />
      </body>
    </html>
  );
}
