const path = require("path");
const slsw = require("serverless-webpack");
// @ts-ignore
const nodeExternals = require("webpack-node-externals");
// @ts-ignore
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const entries = {};

Object.keys(slsw.lib.entries).forEach(
  // @ts-ignore
  key => (entries[key] = ["./source-map-install.js", slsw.lib.entries[key]])
);

let babelLoader = {
  loader: "babel-loader",
  options: {
    plugins: [
      "@babel/plugin-proposal-async-generator-functions",
      "@babel/proposal-class-properties"
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
      "@babel/typescript"
    ]
  }
};

module.exports = {
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
    minimize: false
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
            path.resolve(__dirname, ".webpack")
          ]
        ]
      }
    ]
  }
};
