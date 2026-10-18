import { z } from 'zod';

// Site configuration - no .env needed
export const SITE_URL = 'https://mrbl4z3.github.io';
export const BASE_PATH = '';
export const SITE_FULL_URL = `${SITE_URL}${BASE_PATH}`;

// Google Analytics and Google Tag Manager IDs
export const GA_ID = '';
export const GTM_ID = '';

// Google AdSense Client ID
export const ADSENSE_CLIENT_ID = '';

// Schemas for validation
const SiteConfigSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  url: z.string(),
  baseUrl: z.string(),
  basePath: z.string(),
  version: z.string(),
  copyright: z.string(),
  defaultLocale: z.string(),
});

const OwnerSchema = z.object({
  name: z.string(),
  github: z.string().url(),
  instagram: z.string().url(),
  linkedin: z.string().url(),
  portfolio: z.string().url(),
  sponsor: z.string().url(),
  support: z.string().url(),
  email: z.string().email(),
  newPost: z.string().url(),
});

const GiscusSchema = z.object({
  repo: z.string(),
  repoId: z.string(),
  category: z.string(),
  categoryId: z.string(),
  mapping: z.enum(['pathname', 'url', 'title', 'og:title']),
  strict: z.enum(['0', '1']),
  reactionsEnabled: z.enum(['0', '1']),
  emitMetadata: z.enum(['0', '1']),
  inputPosition: z.enum(['top', 'bottom']),
  theme: z.string(),
  lang: z.string(),
  loading: z.enum(['lazy', 'eager']),
});

const LinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.string(),
  external: z.boolean().optional(),
});

const NavLinksSchema = z.array(LinkSchema);

// Raw config data
const rawSiteConfig = {
  name: 'Belajar Kode',
  tagline: 'Curated resources for developers',
  description:
    'A curated collection of developer resources, tutorials, and tools, hand-picked by E-Learning.',
  url: SITE_FULL_URL,
  baseUrl: SITE_URL,
  basePath: BASE_PATH,
  version: '1.0.0',
  copyright: `© ${new Date().getFullYear()} Belajar Kode`,
  defaultLocale: 'en',
};

const rawOwner = {
  name: 'E-Learning',
  github: 'https://github.com/MRBl4z3',
  instagram: 'https://www.instagram.com/bdiwjesgw/',
  linkedin: 'https://www.linkedin.com/in/rionurramadhan',
  portfolio: 'https://github.com/MRBl4z3',
  sponsor: 'https://saweria.co/Royyss',
  support: 'https://saweria.co/Royyss',
  email: 'rionuramadhan@gmail.com',
  newPost:
    'https://github.com/MRBl4z3/mrbl4z3.github.io/new/main/src/content/posts',
};

const rawGiscus = {
  repo: 'MRBl4z3/mrbl4z3.github.io',
  repoId: '',
  category: 'Q&A',
  categoryId: '',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'transparent_dark',
  lang: 'en',
  loading: 'lazy',
};

const rawNavLinks = [
  { label: 'Home', href: `${BASE_PATH}/`, icon: 'home' },
  { label: 'Explore', href: `${BASE_PATH}/explore/`, icon: 'explore' },
  { label: 'Posts', href: `${BASE_PATH}/posts/`, icon: 'article' },
  { label: 'News', href: `${BASE_PATH}/news/`, icon: 'news' },
  { label: 'Categories', href: `${BASE_PATH}/categories/`, icon: 'category' },
  { label: 'Tags', href: `${BASE_PATH}/tags/`, icon: 'sell' },
  { label: 'Authors', href: `${BASE_PATH}/authors/`, icon: 'person' },
  { label: 'Organisations', href: `${BASE_PATH}/organisations/`, icon: 'organisation' },
];

const rawDiscoverLinks = [
  { label: 'Featured', href: `${BASE_PATH}/featured/`, icon: 'star' },
  { label: 'Latest', href: `${BASE_PATH}/latest/`, icon: 'schedule' },
];

const rawCommunityLinks = [
  {
    label: 'Guide',
    href: `${BASE_PATH}/guide/`,
    icon: 'guide',
  },
  {
    label: 'RSS',
    href: `${BASE_PATH}/rss.xml`,
    icon: 'rss_feed',
    external: true,
  },
  { label: 'Support', href: rawOwner.support, icon: 'help', external: true },
  {
    label: 'Legal',
    href: `${BASE_PATH}/legal/privacy-policy/`,
    icon: 'policy',
  },
];

// Perform validations and export typed constants
export const SITE_CONFIG = SiteConfigSchema.parse(rawSiteConfig);
export const OWNER = OwnerSchema.parse(rawOwner);
export const GISCUS = GiscusSchema.parse(rawGiscus);
export const NAV_LINKS = NavLinksSchema.parse(rawNavLinks);
export const DISCOVER_LINKS = NavLinksSchema.parse(rawDiscoverLinks);
export const COMMUNITY_LINKS = NavLinksSchema.parse(rawCommunityLinks);

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type Owner = z.infer<typeof OwnerSchema>;
export type GiscusConfig = z.infer<typeof GiscusSchema>;
export type NavLink = z.infer<typeof LinkSchema>;
