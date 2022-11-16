import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Jenova Store",
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: "msapplication-TileColor", content: "#ffffff" },
        { name: "msapplication-TileImage", content: "/ms-icon-144x144.png" },
        { name: "theme-color", content: "#1c5291" }
      ],
      link: [
        //FAVICON        
        { rel: "icon", type: "image/svg+xml", href: "https://api.jenova.store/images/favicon.svg", sizes: "any" },
        //FONT
        /* { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" }, */
      ]
    }
  },

  runtimeConfig: {
    public: {
      appName: '',
      appTokenName: '',
      apiBase: '',
      rootUrl: '',
      // appName: 'Jenova Store',
      // appTokenName: 'jenova_store_token',
      // apiBase: 'https://api.jenova.store',
      // rootUrl: 'https://jenova.store',
    }
  },

  css: [
    '~/assets/css/main.scss'
  ],

  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
        ]
      })
    ]
  },
  
  modules: [
    // ...
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
})
