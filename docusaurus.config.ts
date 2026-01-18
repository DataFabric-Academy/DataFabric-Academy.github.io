import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'DataFabric Academy',
  tagline: 'Learn Data Engineering, AI, and Microsoft Fabric',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://datafabric.academy',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'DataFabric-Academy', // Usually your GitHub org/user name.
  projectName: 'datafabric-academy.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'th',
    locales: ['th', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: {
          showReadingTime: true,
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, options: {wordsPerMinute: 300}}),
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} DataFabric Academy.`,
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // Course N8N - Multi-instance
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'course-n8n',
        path: 'docs-n8n',
        routeBasePath: 'course-n8n',
        sidebarPath: './sidebars-n8n.ts',
      },
    ],
    // Course Power BI - Multi-instance
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'course-power-bi',
        path: 'docs-power-bi',
        routeBasePath: 'course-power-bi',
        sidebarPath: './sidebars-power-bi.ts',
      },
    ],
    // Course MS SQL - Multi-instance
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'course-ms-sql',
        path: 'docs-ms-sql',
        routeBasePath: 'course-ms-sql',
        sidebarPath: './sidebars-ms-sql.ts',
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'DataFabric Academy',
      logo: {
        alt: 'DataFabric Academy Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Home',
        },
        {to: '/blog', label: 'Blog', position: 'right'},
        {
          type: 'doc',
          docId: 'intro',
          docsPluginId: 'course-n8n',
          label: 'Course: n8n',
          position: 'right',
        },
        {
          type: 'doc',
          docId: 'intro',
          docsPluginId: 'course-power-bi',
          label: 'Course: Power BI',
          position: 'right',
        },
        {
          type: 'doc',
          docId: 'intro',
          docsPluginId: 'course-ms-sql',
          label: 'Course: MS SQL',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} DataFabric Academy.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
