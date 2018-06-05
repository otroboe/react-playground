const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [autoprefixer()],
  },
});

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])],
});

// https://webpack.js.org/configuration/dev-server/
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host,
    port,
    overlay: true,
    historyApiFallback: true,
  },
});

exports.extractCSS = ({ include, exclude, use } = {}) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    allChunks: true,
    filename: '[name].[chunkhash:4].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.less$/,
          include,
          exclude,

          use: plugin.extract({
            fallback: 'style-loader',
            use,
          }),
        },
      ],
    },
    plugins: [plugin],
  };
};

exports.extractFont = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});

exports.minifyJavaScript = () => ({
  optimization: {
    minimizer: [new UglifyWebpackPlugin({ sourceMap: true })],
  },
});

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })],
});
