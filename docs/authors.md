# Authors

Each author is a Markdown file defining a contributor profile.

## File Location

```
src/content/authors/<slug>.md
```

The filename (without `.md`) becomes the author slug used in post front matter.

Example:
```
src/content/authors/e-learning.md
```

## How to Create an Author

1. Fork the [repository](https://github.com/MRBl4z3/belajarkode)
2. Create a new `.md` file in `src/content/authors/`
3. Add front matter and optional body content (see template below)
4. Submit a Pull Request

See the [How to Publish](/belajarkode/guide/) guide for detailed instructions.

## Front Matter Fields

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Author's display name |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `avatar` | string | — | Path to profile image (relative to `public/` or full URL) |
| `organisation` | string | — | Organisation slug matching filenames in `src/content/organisations/` |
| `bio` | string | — | Short biography |
| `title` | string | — | Job title or role |
| `location` | string | — | Geographic location |
| `website` | string | — | Personal website URL |
| `github` | string | — | GitHub profile URL |
| `twitter` | string | — | Twitter/X profile URL |
| `instagram` | string | — | Instagram/X profile URL |
| `linkedin` | string | — | LinkedIn profile URL |
| `portfolio` | string | — | Portfolio URL |
| `sponsor` | string | — | Sponsor/donation URL |
| `support` | string | — | Support page URL |

## Example Author

```markdown
---
name: "E-Learning"
avatar: "https://github.com/MRBl4z3.png"
bio: "Full-stack developer passionate about open source and developer tools."
title: "Software Engineer & Open Source Enthusiast"
location: "Balikpapan, Indonesia"
website: "https://github.com/MRBl4z3"
github: "https://github.com/MRBl4z3"
twitter: "https://x.com/username"
instagram: "https://www.instagram.com/bdiwjesgw/"
linkedin: "https://www.linkedin.com/in/rionurramadhan"
portfolio: "https://github.com/MRBl4z3"
sponsor: "https://saweria.co/Royyss"
support: "https://github.com/MRBl4z3/belajarkode/issues"
---

Optional markdown body content for extended author bio.
```

## File Naming Rules

- Use lowercase letters, numbers, and hyphens only
- Example: `e-learning.md`, `john-doe.md`
- Do NOT use spaces, underscores, or special characters
- The filename becomes the author slug used in posts: `authors: ["e-learning"]`

## Tips

- Add a clear avatar image for recognition
- Include social links for discoverability
- All social links will appear on your author page
- Use the author slug in post front matter: `authors: ["your-slug"]`
