const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // This is the main fix:
  publicPath: process.env.NODE_ENV === 'production' ? '/DSM-5-Dashboard/' : '/',

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  transpileDependencies: true
})

// I have REMOVED the second, conflicting module.exports block.
// This file is now complete.
