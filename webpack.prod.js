const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
    // splitChunks: {
    //   cacheGroups: {
    //     styles: {
    //       filename: "styles.[contentHash:8].css",
    //       test: /\.s?css$/,
    //       chunks: "all",
    //       minChunks: 1,
    //       reuseExistingChunk: true,
    //       enforce: true,
    //     },
    //   },
    // },
  },
  plugins: [
    // Clean output.path by default.
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].[contenthash:8].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          {
            // Extract CSS into files.
            // Do not include "style-loader" when this is used.
            // https://stackoverflow.com/a/57163539/23566
            loader: MiniCssExtractPlugin.loader,
          },
          {
            // Translate CSS into CommonJS modules.
            loader: "css-loader",
          },
          {
            // Run PostCSS actions, see postcss.config.js.
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Extract CSS into files.
            // Do not include "style-loader" when this is used.
            // https://stackoverflow.com/a/57163539/23566
            loader: MiniCssExtractPlugin.loader,
          },
          {
            // Translate CSS into CommonJS modules.
            loader: "css-loader",
          },
          {
            // Run PostCSS actions, see postcss.config.js.
            loader: "postcss-loader",
          },
          {
            // Compile Sass (scss) to CSS.
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
});
