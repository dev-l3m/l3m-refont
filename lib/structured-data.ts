import { Metadata } from "next";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "L3M Holding",
    description: "Investissement & Développement Stratégique",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.l3m-holding.net",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.l3m-holding.net"}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
    },
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "L3M Holding",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.l3m-holding.net",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.l3m-holding.net"}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateArticleSchema(post: {
  title: string;
  excerpt?: string;
  image?: string;
  publishedAt?: Date;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt?.toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "L3M Holding",
    },
    publisher: {
      "@type": "Organization",
      name: "L3M Holding",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.l3m-holding.net"}/logo.png`,
      },
    },
  };
}
