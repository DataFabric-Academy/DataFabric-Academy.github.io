import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Obsidian Integration: เรียกใช้ wiki-link plugin
// หมายเหตุ: การตั้งค่านี้จะทำให้ [[Wikilink]] ทำงานได้
const wikiLinkPlugin = require('remark-wiki-link');

const config: Config = {
  title: 'DataFabric Academy',
  tagline: 'Knowledge Fabric: Academy-as-Code System',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://datafabric.academy',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub Pages Deployment Config
  organizationName: 'DataFabric-Academy', // GitHub Org ของคุณ
  projectName: 'DataFabric-Academy.github.io', // ชื่อ Repo
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn', // เปลี่ยนเป็น 'throw' เมื่อมั่นใจว่าลิงก์ครบถ้วน
  onBrokenMarkdownLinks: 'warn',

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
          // เชื่อมโยง Obsidian Zettelkasten Style
          remarkPlugins: [
            remarkMath, 
            [wikiLinkPlugin, { hrefTemplate: (permalink: string) => `${permalink}` }] 
          ],
          rehypePlugins: [rehypeKatex],
          // ชี้ Route ไปที่ root เพื่อให้เข้าถึงง่าย (เช่น datafabric.academy/intro)
          routeBasePath: '/', 
        },
        blog: {
          showReadingTime: true,
          // สำคัญ: กำหนด path ให้ชัดเจนเพื่อให้จัดการใน Obsidian ง่าย
          path: 'blog', 
          routeBasePath: 'blog',
          
          // แนะนำให้เปิด feed เพื่อรองรับ RSS Reader
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} DataFabric Academy.`,
            createFeedItems: async (params) => {
              const {blogPosts, defaultCreateFeedItems, ...rest} = params;
              return defaultCreateFeedItems({
                // กรองเฉพาะ post ที่ public แล้วเท่านั้น
                blogPosts: blogPosts.filter((item) => item.metadata.frontMatter.draft !== true),
                ...rest,
              });
            },
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3yUy5gfv0CGX',
      crossOrigin: 'anonymous',
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'DataFabric Academy',
      logo: {
        alt: 'Knowledge Fabric Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Curriculum',
        },
        {
          to: '/blog',
          label: 'Tech Blog',
          position: 'left',
        },
        {
          href: 'https://github.com/DataFabric-Academy/main-portal',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Curriculum',
          items: [
            {
              label: 'Azure Fabric',
              to: '/category/azure-fabric', // ตัวอย่าง Link
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Organization',
              href: 'https://github.com/DataFabric-Academy',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DataFabric Academy. Built with Knowledge Fabric System.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['csharp', 'powershell', 'sql', 'bash', 'json'], // เพิ่มภาษาที่ใช้บ่อยใน Microsoft Stack
    },
  } satisfies Preset.ThemeConfig,
};

export default config;