module.exports = {
  pwa: {
    themeColor: '#FFFFFF',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'public\\service-worker.js'
    }
  },
  transpileDependencies: ['vuetify'],
  parallel: !process.env.NODE_ENV === 'production'
}
