module.exports = {
  theme: 'cosmos',
  title: 'KYVE',
  themeConfig: {
    logo: {
      src: '/logo.svg',
    },
    sidebar: {
      auto: false,
      nav: [
        {
          title: 'About KYVE',
          children: [
            {
              title: 'Introduction',
              directory: true,
              path: '/intro',
            },
          ],
        },
        {
          title: 'For Users',
          children: [
            {
              title: 'Basic Concepts',
              directory: true,
              path: '/basics',
            },
            {
              title: 'Advanced Concepts',
              directory: true,
              path: '/advanced',
            },
          ],
        },
        {
          title: 'For dApp Devs',
          children: [
            {
              title: 'Accessing data',
              directory: true,
              path: '/developers/accessing-data',
            },
            {
              title: 'Adding data',
              directory: true,
              path: '/developers/adding-data',
            },
            {
              title: 'Runtimes',
              directory: false,
              path: '/developers/runtimes',
            },
            {
              title: 'Cosmos gRPC & REST',
              path: 'https://api.korellia.kyve.network/',
            },
            {
              title: 'Tendermint RPC',
              path: 'https://docs.tendermint.com/v0.34/rpc/',
            },
          ],
        },
        {
          title: 'For Protocol Devs',
          children: [
            {
              title: 'Modules',
              directory: true,
              path: '/modules',
            },
            {
              title: 'Module Accounts',
              directory: false,
              path: '/protocol/moduleaccounts',
            },
            {
              title: 'IBC Channels',
              directory: false,
              path: '/protocol/ibc',
            },
            {
              title: 'KYVE Go API',
              path: 'https://pkg.go.dev/github.com/KYVENetwork/chain',
            },
          ],
        },
        {
          title: 'For Validators',
          children: [
            {
              title: 'Protocol Node Overview',
              directory: false,
              path: '/validators/protocol-node',
            },
            {
              title: 'Chain Node Overview',
              directory: false,
              path: '/validators/chain-node',
            },
          ],
        },
        {
          title: 'Block Explorers',
          children: [
            {
              title: 'Block Explorers',
              path: '/developers/explorers',
            },
          ],
        },
      ],
    },
    topbar: {
      banner: false,
    },
    custom: true,
    footer: {
      logo: '/wordmark.svg',
      textLink: {
        text: 'kyve.network',
        url: 'https://kyve.network',
      },
      services: [
        {
          service: 'github',
          url: 'https://github.com/KYVENetwork/docs',
        },
        {
          service: 'discord',
          url: 'https://discord.gg/kyve',
        },
        {
          service: 'telegram',
          url: 'https://t.me/kyvenet',
        },
        {
          service: 'twitter',
          url: 'https://twitter.com/KYVENetwork',
        },
        {
          service: 'medium',
          url: 'https://blog.kyve.network/',
        },
      ],
    },
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'G-SY5FWZVWK2',
      },
    ],
    [
      'sitemap',
      {
        hostname: 'https://docs.kyve.network',
      },
    ],
    [
      'vuepress-plugin-mathjax',
      {
        target: 'svg',
        macros: {
          '*': '\\times',
        },
      },
    ],
  ],
};
