module.exports = {
  theme: 'cosmos',
  title: 'KYVE',
  themeConfig: {
    logo: {
      src: '/logo.svg',
    },
    sidebar: {
      auto: true,
      nav: [
        {
          title: 'Resources',
          children: [
            {
              title: 'KYVE on Github',
              path: 'https://github.com/KYVENetwork',
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
  ],
};
