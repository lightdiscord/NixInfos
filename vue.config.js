const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  pwa: {
    name: 'NixInfos',
    themeColor: '#363636',
  },

  configureWebpack: {
    plugins: [
      new WebpackPwaManifest({
        name: 'NixInfos',
        short_name: 'NixInfos',
        description: 'Get informations about nixos & nixpkgs',
        background_color: '#363636',
        theme_color: '#363636',
        crossorigin: 'anonymous',
        filename: 'manifest.json',
        fingerprints: false,
        ios: true,
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('img', 'icons')
          }
        ]
      })
    ]
  }
}
