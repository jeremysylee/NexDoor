/* eslint-disable */

const webpack = require('webpack');
const path = require('path');
require('dotenv').config();
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SRC_DIR = path.join(__dirname, '/src');
var PUBLIC_DIR = path.join(__dirname, '/public');

const clientConfig = {
  entry: SRC_DIR,
  output: {
    path: PUBLIC_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', {targets: { browsers: ['last 2 versions']}}]
          ]
        }
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: [
        //       ['@babel/preset-env', { modules: false, targets: {  node: 'current' } }],
        //       '@babel/preset-react'
        //     ],
        //     plugins: [
        //       'react-hot-loader/babel',
        //       '@babel/plugin-proposal-class-properties'
        //     ]
        //   }
        // }
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

const SERVER_SRC_DIR = path.join(__dirname, '/server');
const DIST_DIR = path.join(__dirname, '/dist');
const serverConfig = {
  entry: SERVER_SRC_DIR,
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
 },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', {targets: { browsers: ['last 2 versions']}}]
          ]
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        include: /stylesheets|node_modules/,
        use: [ 'css-loader' ],
        // use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],

  },
  externals: [nodeExternals({
    allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i]
  })],
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

module.exports = [serverConfig, clientConfig];
