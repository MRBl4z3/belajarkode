import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';

const parser = new Parser();

const FEEDS = [
  {
    name: 'Google Developers',
    url: 'https://developer.googleblog.com/feeds/posts/default?alt=rss',
    org: 'google',
    category: 'web-development'
  },
  {
    name: 'GitHub Blog',
    url: 'https://github.blog/feed/',
    org: 'github',
    category: 'web-development'
  },
  {
    name: 'Microsoft Developer',
    url: 'https://devblogs.microsoft.com/feed/',
    org: 'microsoft',
    category: 'web-development'
  }
];

const OUTPUT_DIR = path.join(process.cwd(), 'src/content/news');
const HISTORY_FILE = path.join(process.cwd(), 'scripts/processed-news.json');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function cleanContent(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 250) + '...';
}

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let processedUrls = [];
  if (fs.existsSync(HISTORY_FILE)) {
    processedUrls = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
  }

  // Placeholder gambar tech jika feed tidak menyediakan thumbnail
  const DEFAULT_THUMBNAIL = "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=800&h=450&q=80";

  for (const source of FEEDS) {
    try {
      console.log(`fetching feed from: ${source.name}...`);
      const feed = await parser.parseURL(source.url);

      for (const item of feed.items.slice(0, 5)) {
        const itemUrl = item.link || item.guid;
        if (processedUrls.includes(itemUrl)) continue;

        const title = item.title ? item.title.replace(/"/g, '\\"') : 'Untitled';
        const date = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();
        const slug = `${slugify(title).slice(0, 50)}-${Date.now()}`;
        const description = cleanContent(item.contentSnippet || item.content || item.summary);

        // Frontmatter lengkap yang sesuai dengan template Belajar Kode
        const markdownContent = `---
title: "${title}"
description: "${description}"
pubDate: "${date}"
authors: ["e-learning"]
organisations: ["${source.org}"]
category: "${source.category}"
tags: ["${source.org}", "web-development"]
thumbnail: "${DEFAULT_THUMBNAIL}"
heroImage: "${DEFAULT_THUMBNAIL}"
keywords: ["${source.org}", "tech news", "developer"]
canonicalUrl: "${itemUrl}"
---

${description}

---
*Artikel ini otomatis diambil dari [${source.name}](${itemUrl}). Baca artikel selengkapnya di sumber asli.*
`;

        const filePath = path.join(OUTPUT_DIR, `${slug}.md`);
        fs.writeFileSync(filePath, markdownContent, 'utf-8');

        processedUrls.push(itemUrl);
        console.log(`+ Berita baru dibuat: ${title}`);
      }
    } catch (err) {
      console.error(`Gagal mengambil feed dari ${source.name}:`, err.message);
    }
  }

  fs.writeFileSync(HISTORY_FILE, JSON.stringify(processedUrls, null, 2), 'utf-8');
}

run();