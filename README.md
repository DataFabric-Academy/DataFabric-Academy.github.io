# DataFabric Academy

Modern documentation site built with Docusaurus, featuring multi-instance docs for multiple courses.

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
pnpm install
```

### Local Development

```bash
# Start dev server
pnpm run start

# Build for production
pnpm run build

# Serve build locally
pnpm run serve
```

## 📚 Content Management

### Sync from Obsidian Vault

```bash
# One-time sync
pnpm run sync

# Watch mode (auto-sync on changes)
pnpm run sync:watch
```

**Obsidian Vault Location**: `D:\Obsidian\Knowledge-Fabric-Vault\90_Academy\`

## 🏗️ Architecture

- **Single Docusaurus Site** with **Multi-Instance Docs**
- **Obsidian Vault** → Sync Script → **Docusaurus**
- **GitHub Actions** → Build & Deploy → **GitHub Pages**

### Course Structure

- **Main Portal**: `docs/` → `/`
- **Course n8n**: `docs-n8n/` → `/course-n8n`
- **Course Power BI**: `docs-power-bi/` → `/course-power-bi`
- **Course MS SQL**: `docs-ms-sql/` → `/course-ms-sql`

## 🚀 Deployment

See [Deployment Guide](docs/deployment.md) for detailed instructions.

### Quick Deploy

```bash
# Sync content
pnpm run sync

# Commit and push
git add .
git commit -m "docs: update content"
git push origin master
```

GitHub Actions will automatically build and deploy to GitHub Pages.

## 📖 Documentation

- [Deployment Guide](docs/deployment.md) - Setup, troubleshooting, and deployment
- [Project Summary](PROJECT_SUMMARY.md) - Complete project overview

## 🔗 URLs

- **Production**: https://DataFabric-Academy.github.io
- **Custom Domain**: https://datafabric.academy

## 🛠️ Tech Stack

- [Docusaurus](https://docusaurus.io/) - Static site generator
- [pnpm](https://pnpm.io/) - Package manager
- [GitHub Actions](https://github.com/features/actions) - CI/CD
- [GitHub Pages](https://pages.github.com/) - Hosting

## 📝 License

Copyright © 2026 DataFabric Academy.
