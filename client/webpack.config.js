/* eslint-disable */

const webpack = require('webpack');
const path = require('path');
require('dotenv').config();
const nodeExternals = require('webpack-node-externals');

const SRC_DIR = path.join(__dirname, '/src');
var PUBLIC_DIR = path.join(__dirname, '/public');
const SERVER_SRC_DIR = path.join(__dirname, '/server');
var DIST_DIR = path.join(__dirname, '/dist');

const clientConfig = {
  entry: SRC_DIR,
  output: {
    path: PUBLIC_DIR,
    filename: 'bundle.js',
    // publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@': path.resolve(__dirname, 'src'),
      'config': path.resolve(__dirname, 'config.js'),
    },
  },
  devServer: {
    contentBase: PUBLIC_DIR,
    port: process.env.CLIENT_PORT || 8080,
  },
};

const serverConfig = {
  entry: SERVER_SRC_DIR,
  output: {
    path: DIST_DIR,
    filename: 'index.js',
 },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
      },
    ],

  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false,
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
  }
};

// module.exports = [serverConfig, clientConfig];
module.exports = clientConfig;
