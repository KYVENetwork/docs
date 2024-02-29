// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

function defineSection(section, options = {}) {
  return [
    "@docusaurus/plugin-content-docs",
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
      path: `docs/${section}`,
      routeBasePath: section,
      id: section,
      sidebarPath: "./sidebars.js",
      breadcrumbs: true,
      editUrl: "https://github.com/KYVENetwork/docs/tree/main",
      ...options,
    }),
  ];
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "KYVE",
  tagline: "Making data a public good for a trustless ecosystem",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.kyve.network",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  customFields: {
    kyve: {
      rpc: "https://rpc-eu-1.kyve.network",
      rest: "https://api-eu-1.kyve.network",
      denom: "ukyve",
      decimals: 6,
    },
    kaon: {
      rpc: "https://rpc-eu-1.kaon.kyve.network",
      rest: "https://api-eu-1.kaon.kyve.network",
      denom: "tkyve",
      decimals: 6,
    },
    korellia: {
      rpc: "https://rpc-eu-1.korellia.kyve.network",
      rest: "https://api-eu-1.korellia.kyve.network",
      denom: "tkyve",
      decimals: 9,
    },
    errorMsg: "error",
    pools: require("./pools.js"),
  },
  clientModules: [require.resolve("./globalClientModule.ts")],
  scripts: [
    {
      src: "https://widget.kapa.ai/kapa-widget.bundle.js",
      "data-website-id": "0d46a6d3-da82-402b-9073-fd024d4e0c9c",
      "data-project-name": "KYVE",
      "data-project-color": "#050D0B",
      "data-project-logo": "https://docs.kyve.network/img/favicon.ico",
      async: true,
    },
    {
      defer: true,
      "data-dw-id": "2cde9461633b4e03bbb8a36c3854f7df",
      "data-dw-c": "Docs",
      src: "https://api.web3tools.net/js/d.js",
    },
  ],
  plugins: [
    defineSection("learn"),
    defineSection("community"),
    defineSection("validators"),
    defineSection("developers"),
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/ksync",
            from: [
              "/tools/KSYNC/overview",
              "/tools/KSYNC/installation",
              "/tools/KSYNC/usage",
              "/tools/KSYNC/protocol_validators",
              "/tools/KSYNC/settings",
            ],
          },
        ],
      },
    ],
    async function loadTailwind(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          sidebarPath: "./sidebars.js",
          breadcrumbs: true,
          path: "docs/home",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/KYVENetwork/docs/tree/main",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-SY5FWZVWK2",
          anonymizeIP: true,
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "KYVE Network",
        logo: {
          alt: "KYVE Logo",
          src: "img/favicon.ico",
          style: {
            borderRadius: "7px",
          },
        },
        items: [
          {
            position: "left",
            label: "Learn",
            to: "/learn",
          },
          {
            position: "left",
            label: "Community",
            to: "/community",
          },
          {
            position: "left",
            label: "Validators",
            to: "/validators",
          },
          {
            position: "left",
            label: "Developers",
            to: "/developers",
          },
          {
            href: "https://github.com/KYVENetwork/",
            className: "pseudo-icon discord-icon",
            position: "right",
          },
          {
            href: "https://github.com/KYVENetwork/",
            className: "pseudo-icon github-icon",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/kyve",
              },
              {
                label: "Telegram",
                href: "https://t.me/KYVENet",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/KYVENetwork",
              },
              {
                label: "Reddit",
                href: "https://reddit.com/r/kyve",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Medium",
                href: "https://kyve.medium.com/",
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/channel/UCThrQRlVd2KKy2-e0tBgfpQ",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/KYVENetwork",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BCP Innovations UG. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "08VTEK2AEZ",

        // Public API key: it is safe to commit it
        apiKey: "d42641774cb613121c37dcd07732c587",

        indexName: "kyve",

        contextualSearch: true,
        searchParameters: {},
      },
    }),
};

export default config;
