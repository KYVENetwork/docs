module.exports = {
  theme: 'cosmos',
  title: 'KYVE',
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'en-US' // this will be set as the lang attribute on <html>
    },
    '/ru/': {
      lang: 'ru-RU'
    }
  },
  themeConfig: {
    logo: {
      src: '/logo.svg'
    },
    sidebar: {
      auto: true,
      nav: [
        {
          title: 'Languages',
          children: [
            { title: 'Russian', path: 'https://docs.kyve.network/ru/' },
          ]
        },
        {
          title: 'Resources',
          children: [
            {
              title: 'KYVE on Github',
              path: 'https://github.com/KYVENetwork'
            }
          ]
        }
      ]
    },
    custom: true,
    footer: {
      logo: '/wordmark.svg',
      textLink: {
        text: 'kyve.network',
        url: 'https://kyve.network'
      },
      services: [
        {
          service: 'discord',
          url: 'https://discord.gg/kyve'
        },
        {
          service: 'telegram',
          url: 'https://t.me/kyvenet'
        },
        {
          service: 'twitter',
          url: 'https://twitter.com/KYVENetwork'
        }
      ]
    }
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'G-SY5FWZVWK2'
      }
    ],
    [
      'sitemap',
      {
        hostname: 'https://docs.kyve.network'
      }
    ],
    [
      'vuepress-plugin-mathjax',
      {
        target: 'svg',
        macros: {
          '*': '\\times'
        }
      }
    ]
  ]
};
