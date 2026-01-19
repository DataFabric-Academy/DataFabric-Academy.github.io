import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Course configurations for multi-instance docs
const COURSES = [
  {id: 'course-n8n', path: 'docs-n8n', routeBasePath: 'course-n8n', sidebarPath: './sidebars-n8n.ts', label: 'คอร์ส: n8n'},
  {id: 'course-power-bi', path: 'docs-power-bi', routeBasePath: 'course-power-bi', sidebarPath: './sidebars-power-bi.ts', label: 'คอร์ส: Power BI'},
  {id: 'course-ms-sql', path: 'docs-ms-sql', routeBasePath: 'course-ms-sql', sidebarPath: './sidebars-ms-sql.ts', label: 'คอร์ส: MS SQL'},
] as const;

const config: Config = {
  title: 'DataFabric Academy',
  tagline: 'เรียนรู้ Data Engineering, AI, และ Microsoft Fabric',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://DataFabric-Academy.github.io',
  baseUrl: '/',
  organizationName: 'DataFabric-Academy',
  projectName: 'DataFabric-Academy.github.io',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

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
    ...COURSES.map((course) => [
      '@docusaurus/plugin-content-docs',
      {
        id: course.id,
        path: course.path,
        routeBasePath: course.routeBasePath,
        sidebarPath: course.sidebarPath,
      },
    ]),
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
          label: 'เอกสาร',
        },
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'หน้าแรก',
        },
        {to: '/blog', label: 'บล็อก', position: 'right'},
        ...COURSES.map((course) => ({
          type: 'doc' as const,
          docId: 'intro',
          docsPluginId: course.id,
          label: course.label,
          position: 'right' as const,
        })),
        {
          type: 'localeDropdown',
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
