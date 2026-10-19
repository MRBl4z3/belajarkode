import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';

const parser = new Parser();

// 1. Daftar RSS Feed yang mau diambil
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

// Folder tujuan file Markdown
const OUTPUT_DIR = path.join(process.cwd(), 'src/content/news');
const HISTORY_FILE = path.join(process.cwd(), 'scripts/processed-news.json');

// Helper untuk membuat slug ramah URL
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Helper untuk membersihkan HTML ringkasan
function cleanContent(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>?/gm, '') // Hapus tag HTML
    .replace(/\s+/g, ' ')       // Rapikan spasi
    .trim()
    .slice(0, 300) + '...';     // Ambil 300 karakter pertama
}

async function run() {
  // Pastikan folder output dan file riwayat ada
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let processedUrls = [];
  if (fs.existsSync(HISTORY_FILE)) {
    processedUrls = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
  }

  let newArticlesCount = 0;

  for (const source of FEEDS) {
    try {
      console.log(`fetching feed from: ${source.name}...`);
      const feed = await parser.parseURL(source.url);

      for (const item of feed.items.slice(0, 5)) { // Ambil 5 berita terbaru per feed
        const itemUrl = item.link || item.guid;

        // Skip jika artikel sudah pernah diproses
        if (processedUrls.includes(itemUrl)) continue;

        const title = item.title ? item.title.replace(/"/g, '\\"') : 'Untitled';
        const date = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();
        const slug = `${slugify(title).slice(0, 50)}-${Date.now()}`;
        const description = cleanContent(item.contentSnippet || item.content || item.summary);

        // Template Frontmatter untuk Astro
        const markdownContent = `---
title: "${title}"
description: "${description}"
pubDate: "${date}"
authors: ["${source.name}"]
organisations: ["${source.org}"]
category: "${source.category}"
tags: ["${source.org}", "tech-news", "web-development"]
canonicalUrl: "${itemUrl}"
---

${description}

---
*Artikel ini secara otomatis disinkronkan dari [${source.name}](${itemUrl}). Baca artikel selengkapnya di sumber asli.*
`;

        // Simpan file .md ke folder content Astro
        const filePath = path.join(OUTPUT_DIR, `${slug}.md`);
        fs.writeFileSync(filePath, markdownContent, 'utf-8');

        processedUrls.push(itemUrl);
        newArticlesCount++;
        console.log(`+ Berita baru dibuat: ${title}`);
      }
    } catch (err) {
      console.error(`Gagal mengambil feed dari ${source.name}:`, err.message);
    }
  }

  // Simpan kembali riwayat URL agar tidak terduplikasi nanti
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(processedUrls, null, 2), 'utf-8');
  console.log(`Selesai! Total ${newArticlesCount} berita baru ditambahkan.`);
}

run();