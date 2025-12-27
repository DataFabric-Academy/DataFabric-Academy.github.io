# DataFabric Academy - Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## 🌐 Internationalization (i18n)

This website supports multiple languages:
- **Default Locale**: Thai (`th`) - Files in `docs/` are automatically Thai
- **Other Locales**: English (`en`) - Add content in `i18n/en/` when needed

### Current Structure

```
docs/                    # Thai content (default locale)
i18n/                    # Other languages (create when needed)
  └── en/               # English content
```

**Important**: Files in `docs/` are treated as Thai content automatically. To add English content, create `i18n/en/docusaurus-theme-classic/docs/` structure.

See [i18n-STRUCTURE.md](./i18n-STRUCTURE.md) for detailed guide.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
