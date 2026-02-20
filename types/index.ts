export type Page = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogImage?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Expertise = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  icon?: string;
  image?: string;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Subsidiary = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  content?: string;
  logo?: string;
  image?: string;
  website?: string;
  sector?: string;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  image?: string;
  author?: string;
  metaTitle?: string;
  metaDescription?: string;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type TeamMember = {
  id: string;
  slug: string;
  name: string;
  position: string;
  bio?: string;
  image?: string;
  email?: string;
  linkedin?: string;
  order: number;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Metric = {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  description?: string;
  order: number;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
};
