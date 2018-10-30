const path = require('path');
const webpack = require('webpack');

const plugins = {
  progress: require('webpackbar'),
  clean: require('clean-webpack-plugin'),
  extractCSS: require('mini-css-extract-plugin'),
  html: require('html-webpack-plugin'),
  copy: require('copy-webpack-plugin'),
  sri: require('webpack-subresource-integrity'),
};

module.exports = (env = {}, argv) => {
  const isProduction = argv.mode === 'production';

  const config = {
    context: path.resolve(__dirname, 'src'),

    entry: {
      vendor: './vendor/index.js',
      app: [
        './styles/index.scss',
        './index.js',
      ],
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '',
      filename: 'scripts/[name].js',
      crossOriginLoading: 'anonymous',
    },

    module: {
      rules: [
        {
          test: /\.(s[ac]|c)ss$/,
          use: [
            plugins.extractCSS.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: !isProduction,
                plugins: isProduction ? [
                  require('autoprefixer')(),
                  require('cssnano')({
                    preset: [
                      'default',
                      {
                        minifySelector: false,
                      },
                    ],
                  }),
                ] : [],
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ],
            },
          },
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          exclude: /fonts/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                publicPath: '..',
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: true,
              collapseWhitespace: true,
              removeScriptTypeAttributes: true,
              removeStyleTypeAttributes: true,
            },
          },
        },
        {
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          loader: 'elm-webpack-loader',
          options: {
            optimize: isProduction
          }
        },
      ],
    },

    devServer: {
      contentBase: path.join(__dirname, 'src'),
      port: 8080,
      overlay: {
        warnings: true,
        errors: true,
      },
      quiet: true,
    },

    plugins: (() => {

      const common = [
        new plugins.extractCSS({
          filename: 'styles/[name].css'
        }),

        new plugins.html({
          template: 'index.html',
          filename: 'index.html',
          minify: {
            minimize: true,
            removeComments: true,
            collapseWhitespace: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          },
        }),

        new plugins.progress({
          color: '#5C95EE',
        }),
      ];

      const production = [
        new plugins.clean(['dist']),
        new plugins.sri({
          hashFuncNames: ['sha384'],
          enabled: true,
        }),
      ];

      return [...common, ...(isProduction ? production : [])];

    })(),

    devtool: isProduction ? '' : 'source-map',

    resolve: {
      modules: [
        path.resolve(__dirname, 'src'),
        'node_modules',
      ],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };

  return config;
};
