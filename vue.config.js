module.exports = {
    devServer: {
      port: 8081
    },
    pwa: {
      workboxPluginMode: "injectManifest",
      workboxOptions: {
        swSrc: "src/service-worker.js",
        navigateFallback: 'index.html'
      }
    }
  }
