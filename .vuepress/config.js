module.exports = {
  theme: 'cosmos',
  title: 'KYVE Documentation',
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
            {
              title: 'Governance',
              directory: true,
              path: '/users/governance',
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
              title: 'Client libraries',
              directory: true,
              path: '/developers/client-libraries',
            },
            {
              title: 'Runtimes',
              directory: false,
              path: '/developers/runtimes',
            },
            {
              title: 'Cosmos gRPC & REST',
              path: '/developers/grpc',
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
    ['tabs'],
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
  head: [
    [
      'script',
      {},
      `
            (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:3099667,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `,
    ],
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-SY5FWZVWK2',
      },
      '',
    ],
    [
      'script',
      {},
      `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SY5FWZVWK2');
    `,
    ],
  ],
};
