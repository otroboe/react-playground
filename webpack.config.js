// const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
};

const commonConfig = merge([
  {
    // Where to start bundling
    entry: './src/main.tsx',

    // Where to output
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: '/',
    },

    // Adjust module resolution algorithm
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],

      // mainFields: ['module', 'browser', 'main'],

      // A list of module name aliases
      alias: {
        app: path.resolve(__dirname, 'src/app/'),
        styles: path.resolve(__dirname, 'src/assets/styles'),
        vars: path.resolve(__dirname, 'src/assets/styles/variables.less'),
      },
    },

    // How to resolve encountered imports
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        // source-map-loader can come in handy if your dependencies provide source maps.
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
      ],
    },

    plugins: [
      // https://github.com/jantimon/html-webpack-plugin#options
      new HtmlWebpackPlugin({
        title: 'JS Playground !',
        template: 'index.html',
      }),
      new FaviconsWebpackPlugin(path.resolve(__dirname, 'src/assets/img/logo.png')),
      new DotenvPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  },

  parts.generateSourceMaps({ type: 'source-map' }),
  parts.extractFont(),
]);

const productionConfig = merge([
  parts.attachRevision(),
  parts.clean(PATHS.build),
  parts.minifyJavaScript(),

  parts.extractCSS({
    use: ['css-loader', 'less-loader', parts.autoprefix()],
  }),

  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[hash:4].[ext]',
    },
  }),

  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      // Run cssnano in safe mode to avoid potentially unsafe transformations.
      safe: true,
    },
  }),

  // @TODO check README
  // parts.purifyCSS({
  //   paths: glob.sync(`${PATHS.app}/**/*.{html,js,jsx,ts,tsx,css,less}`, { nodir: true }),
  // }),

  {
    output: {
      chunkFilename: '[name].[chunkhash:4].js',
      filename: '[name].[chunkhash:4].js',
    },
  },
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
          },
        },
      },
    },
  },
  {
    plugins: [
      new BundleAnalyzerPlugin(),
    ],
  },
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT || 8082,
  }),

  parts.extractCSS({
    use: ['css-loader', 'less-loader'],
  }),

  parts.loadImages(),
]);

module.exports = (mode) => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
