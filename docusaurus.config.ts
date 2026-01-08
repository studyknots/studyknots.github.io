import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Study Knots',
  tagline: 'Learn Bitcoin Knots - The enhanced Bitcoin node',
  favicon: 'img/favicon.ico',

  url: 'https://studyknots.com',
  baseUrl: '/',
  organizationName: 'studyknots',
  projectName: 'studyknots.github.io',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/studyknots/studyknots.github.io/tree/main/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/studyknots-social.png',

    metadata: [
      // Basic meta
      {name: 'keywords', content: 'bitcoin knots, bitcoin node, full node, bitcoin core alternative, luke dashjr, op_return, mempool policy'},
      {name: 'author', content: 'Study Knots'},

      // Open Graph
      {property: 'og:type', content: 'website'},
      {property: 'og:site_name', content: 'Study Knots'},
      {property: 'og:title', content: 'Study Knots - Learn Bitcoin Knots'},
      {property: 'og:description', content: 'The comprehensive guide to Bitcoin Knots. Understand the enhanced Bitcoin Core derivative powering 21% of the network.'},
      {property: 'og:image', content: 'https://studyknots.com/img/studyknots-social.png'},
      {property: 'og:image:width', content: '1200'},
      {property: 'og:image:height', content: '630'},
      {property: 'og:url', content: 'https://studyknots.com'},

      // Twitter Card
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'Study Knots - Learn Bitcoin Knots'},
      {name: 'twitter:description', content: 'The comprehensive guide to Bitcoin Knots. 200+ patches, policy control, and the OP_RETURN controversy explained.'},
      {name: 'twitter:image', content: 'https://studyknots.com/img/studyknots-social.png'},
    ],

    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    announcementBar: {
      id: 'latest_release',
      content: 'Bitcoin Knots 29.2 is now available! <a href="https://bitcoinknots.org/">Download from bitcoinknots.org</a>',
      backgroundColor: '#4A90A4',
      textColor: '#fff',
      isCloseable: true,
    },

    navbar: {
      title: 'Study Knots',
      logo: {
        alt: 'Study Knots Logo',
        src: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          to: '/getting-started/introduction',
          label: 'Getting Started',
          position: 'left',
        },
        {
          to: '/patches/overview',
          label: 'Patches',
          position: 'left',
        },
        {
          to: '/architecture/overview',
          label: 'Architecture',
          position: 'left',
        },
        {
          to: '/guides/running-a-node',
          label: 'Guides',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Resources',
          position: 'left',
          items: [
            {label: 'Bitcoin Knots', href: 'https://bitcoinknots.org'},
            {label: 'GitHub (Knots)', href: 'https://github.com/bitcoinknots/bitcoin'},
            {type: 'html', value: '<hr style="margin: 0.5rem 0;">'},
            {label: 'Bitcoin Core', href: 'https://bitcoincore.org'},
            {label: 'Bitcoin Wiki', href: 'https://en.bitcoin.it/wiki/'},
          ],
        },
        {
          href: 'https://github.com/studyknots/studyknots.github.io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {label: 'Introduction', to: '/getting-started/introduction'},
            {label: 'Installation', to: '/getting-started/installation'},
            {label: 'Quick Start', to: '/getting-started/quick-start'},
          ],
        },
        {
          title: 'Documentation',
          items: [
            {label: 'Patches Overview', to: '/patches/overview'},
            {label: 'Architecture', to: '/architecture/overview'},
            {label: 'Configuration', to: '/guides/configuration'},
          ],
        },
        {
          title: 'Bitcoin Knots',
          items: [
            {label: 'Official Website', href: 'https://bitcoinknots.org'},
            {label: 'Download', href: 'https://bitcoinknots.org/files/'},
            {label: 'GitHub', href: 'https://github.com/bitcoinknots/bitcoin'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Discord', href: 'https://discord.gg/bitcoin'},
            {label: 'Telegram', href: 'https://t.me/bitcoinknots'},
            {label: 'Contributing', to: '/reference/contributing'},
          ],
        },
      ],
      copyright: `Study Knots ${new Date().getFullYear()} — An educational resource for Bitcoin Knots`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'cpp', 'python', 'toml'],
    },

    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
