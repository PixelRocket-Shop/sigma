const path = require('path');
const webpack = require('webpack');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

// Project config data.
const projectData = {
  config: require('./src/data/config.json'),
  blogs: require('./src/data/blogs.json'),
  features: require('./src/data/features.json'),
  integrations: require('./src/data/integrations.json'),
  logos: require('./src/data/logos.json'),
  'logos-two': require('./src/data/logos-two.json'),
  reviews: require('./src/data/reviews.json'),
  team: require('./src/data/team.json'),
};

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  output: {
    path: path.join(__dirname, 'dist'),
  },

  resolve: {
    alias: {
      '@images': path.join(__dirname, 'src/assets/images'),
      '@fonts': path.join(__dirname, 'src/assets/fonts'),
      '@scripts': path.join(__dirname, 'src/assets/js'),
      '@styles': path.join(__dirname, 'src/assets/scss'),
    },
  },

  plugins: [
    new webpack.ProgressPlugin(),

    new HtmlBundlerPlugin({
      // path to entry templates
      entry: 'src/views/pages',

      // OR define entry templates manually, e.g. for development a single page
      // entry: {
      //   index: 'src/views/pages/index.html',
      //   pricing: 'src/views/pages/pricing.html',
      //   about: 'src/views/pages/about.html',
      //   contact: 'src/views/pages/contact.html',
      // },

      js: {
        // output filename of extracted JS
        filename: 'assets/js/[name].[contenthash:8].js',
      },

      css: {
        // output filename of extracted CSS
        filename: 'assets/css/[name].[contenthash:8].css',
      },

      // render templates with the Handlebars template engine
      preprocessor: 'handlebars',

      preprocessorOptions: {
        partials: [
          'src/views/partials',
        ],
        helpers: {
          config: (data) => data,
        },
      },

      data: projectData,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|ico|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash:8][ext]',
        },
      },
      {
        test: /[\\/]fonts[\\/].+(woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]',
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/](node_modules)[\\/].+\.js$/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  performance: {
    // disable limit warnings
    hints: false,
  },

  // enable HMR with live reload
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },
};
