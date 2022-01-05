const config = {
  components: true,

  head: {
    title: 'swiper-directive',
    htmlAttrs: {
      lang: 'en',
      class: 'h-full bg-gray-50',
    },
    bodyAttrs: {
      class: 'font-sans antialiased text-gray-600 min-h-full flex flex-col',
    },
  },

  plugins: ['~plugins/swiper'],

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  build: {
    standalone: true,
  },
}

export default config
