// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes } from "prism-react-renderer";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { updatePoolsPlugin } from "./pools.js";

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
  onBrokenMarkdownLinks: "throw",

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
    stylesheets: [
        {
            href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
            type: "text/css",
            integrity:
                "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
            crossorigin: "anonymous",
        },
    ],
  plugins: [
      "docusaurus-plugin-hotjar",
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/access-data-sets/ksync/overview",
            from: [
              "/validators/ksync",
              "/tools/KSYNC/overview",
              "/tools/KSYNC/installation",
              "/tools/KSYNC/usage",
              "/tools/KSYNC/protocol_validators",
              "/tools/KSYNC/settings",
              "/ksync",
              "/access-data-sets/ksync/"
            ],
          },
          {
            to: "/run-a-node/protocol-nodes/supervysor",
            from: [
              "/validators/protocol_nodes/supervysor",
              "/tools/supervysor",
              "/supervysor",
              "/tools/supervysor/overview",
            ],
          },
          {
            to: "/access-data-sets/trustless-api/overview",
            from: [
              "/developers/data_engineers/accessing_data/trustless_api/overview",
            ],
          },
          {
            to: "/access-data-sets/data-load-tool",
            from: [
              "/developers/data_engineers/accessing_data/elt_pipeline/overview",
              "/data_engineers/accessing_data/elt_pipeline/overview"
            ]},
          {to: "/run-a-node/protocol-nodes/pools/cosmos_hub/installation",
            from: ["/validators/protocol_nodes/pools/cosmos_hub/installation"]},
          {to: "/learn/protocol-structure/advanced-concepts/uploader-selection",
            from: ["/protocol_devs/advanced_concepts/uploader_selection"]},
          {to: "/run-a-node",
            from: ["/node/running", "/intro/protocol-node"]},
          {to: "/learn/architecture",
            from: ["/architecture"]},
          {to: "/build/development/developing-runtime",
            from: ["/protocol_devs/development/developing_runtime"]},
          {to: "/community",
            from: ["/token_holders/overview", "/basics/kyve", "/token_holders/governance"]},
          {to: "/access-data-sets", from: ["/access-data-sets/data-directory"]},
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
    updatePoolsPlugin,
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
          sidebarCollapsible: true,
          showLastUpdateTime: true,
          path: "docs",
          routeBasePath: "/",
          editUrl: "https://github.com/KYVENetwork/docs/tree/main",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-WB2K8PYJE4",
        },
        sitemap: {
          priority: null,
          changefreq: null
        }
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {

      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
        colorMode: {
            respectPrefersColorScheme: true,
        },
      navbar: {
        title: "KYVE Network",
        logo: {
          alt: "KYVE Logo",
          src: "img/favicon.ico",
          style: {
            borderRadius: "10px",
          },
        },
        items: [
          {
            type: "docSidebar",
            label: "Learn",
            sidebarId: "learnSidebar",
            position: "left",
            to: "/learn",
          },
          {
            type: "docSidebar",
            label: "Community",
            sidebarId: "communitySidebar",
            position: "left",
            to: "/community",
          },
          {
            type: "docSidebar",
            sidebarId: "accessDataSetsSidebar",
            position: "left",
            label: "Access Blockchain Data Sets",
            to: "/developers",
          },
          {
            type: "docSidebar",
            sidebarId: "buildSidebar",
            position: "left",
            label: "Build",
            to: "/developers",
          },
          {
            type: "docSidebar",
            sidebarId: "runANodeSidebar",
            position: "left",
            label: "Run a Node",
            to: "/developers",
          },
          {
            href: "https://discord.gg/PATvZvEmxF",
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
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                to: "https://discord.gg/kyve",
              },
              {
                label: "Telegram",
                to: "https://t.me/KYVENet",
              },
              {
                label: "Twitter",
                to: "https://twitter.com/KYVENetwork",
              },
              {
                label: "Reddit",
                to: "https://reddit.com/r/kyve",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Medium",
                to: "https://blog.kyve.network/",
              },
              {
                label: "YouTube",
                to: "https://www.youtube.com/channel/UCThrQRlVd2KKy2-e0tBgfpQ",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "KYVE Network",
                to: "https://kyve.network",
              },
              {
                label: "App",
                to: "https://app.kyve.network",
              },
              {
                label: "Blog",
                to: "https://kyve.network/blog",
              },
              {
                label: "GitHub",
                to: "https://github.com/KYVENetwork",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} KYVE Foundation. Built with Docusaurus.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.oneDark,
        additionalLanguages: ["bash", "diff", "json"],
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
      hotjar: {
        applicationId: "5046420",
      }
    },
};

export default config;
