// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const math = require("remark-math");
const katex = require("rehype-katex");

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

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
  },
  clientModules: [require.resolve("./globalClientModule.ts")],
  scripts: [
    {
      src: "https://widget.kapa.ai/kapa-widget.bundle.js",
      "data-website-id": "0d46a6d3-da82-402b-9073-fd024d4e0c9c",
      "data-project-name": "KYVE",
      "data-project-color": "#050D0B",
      "data-project-logo":
        "https://user-images.githubusercontent.com/62398724/137493477-63868209-a19b-4efa-9413-f06d41197d6d.png",
      async: true,
    },
  ],
  plugins: [
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
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: "G-SY5FWZVWK2",
          anonymizeIP: true,
        },
        docs: {
          remarkPlugins: [math],
          rehypePlugins: [katex],
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/KYVENetwork/docs/tree/main",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
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
            href: "https://github.com/KYVENetwork",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        logo: {
          alt: "KYVE logo",
          src: "img/favicon.ico",
          href: "https://docs.kyve.network",
        },
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
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

module.exports = config;
