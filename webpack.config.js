/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const slsw = require("serverless-webpack");
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require("webpack-node-externals");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const entries = {};

Object.keys(slsw.lib.entries).forEach(
  // @ts-ignore
  key => (entries[key] = ["./source-map-install.js", slsw.lib.entries[key]])
);

const babelLoader = {
  loader: "babel-loader",
  options: {
    plugins: [
      "@babel/plugin-proposal-async-generator-functions",
      "@babel/proposal-class-properties",
      "@babel/plugin-syntax-flow"
    ],
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage",
          corejs: "3",
          shippedProposals: true,
          targets: {
            node: "current"
          },
          modules: "commonjs"
        }
      ],
      "@babel/typescript",
      "@babel/preset-flow"
    ]
  }
};

module.exports = {
  stats: 'minimal',
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal ? "eval-source-map" : "source-map",
  resolve: {
    extensions: [".mjs", ".json", ".ts", ".tsx", ".js", ".jsx"],
    symlinks: false,
    cacheWithContext: false
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  target: "node",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  externals: [nodeExternals()],
  plugins: [new ForkTsCheckerWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        use: [
          babelLoader,
          {
            loader: "ts-loader"
          }
        ],
        exclude: [
          [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, ".serverless"),
            path.resolve(__dirname, ".webpack"),
            path.resolve(__dirname, "build"),
          ]
        ]
      }
    ]
  }
};
