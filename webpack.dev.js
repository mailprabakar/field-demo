const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: "eval-cheap-module-source-map",
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    sourceMapFilename: "[name].js.map",
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          {
            // Inject CSS to page
            loader: "style-loader",
          },
          {
            // Translate CSS into CommonJS modules
            loader: "css-loader",
          },
          {
            // Run PostCSS actions, see postcss.config.js
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Inject CSS to page
            loader: "style-loader",
          },
          {
            // Translate CSS into CommonJS modules
            loader: "css-loader",
          },
          {
            // Run PostCSS actions, see postcss.config.js
            loader: "postcss-loader",
          },
          {
            // Compile Sass (scss) to CSS
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
});
