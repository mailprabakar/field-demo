const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

let htmlPageArray = [
  "contact",
  "electric",
  "feature",
  "field-service",
  "gas",
  "help",
  "insights",
  "partners",
  "partners-account",
  "partners-login",
  "playbook",
  "privacy-policy",
  "water",
  "team",
  "careers",
  "marketing",
];
let multipleHtmlCompress = htmlPageArray.map((name) => {
  return new HtmlWebpackPlugin({
    favicon: "./src/favicon.ico",
    meta: {
      charset: "UTF-8",
      viewport: "width=device-width, initial-scale=1",
      "X-UA-Compatible": {
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge,chrome=1",
      },
    },
    template: `./src/pages/${name}.html`, // relative path to HTML files
    chunks: [name],
    inject: true,
    filename: `${name}.html`, // output HTML files
    minify: {
      removeAttributeQuotes: false,
      collapseWhitespace: true,
      removeComments: true,
    },
  });
});

module.exports = {
  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    contact: "./src/pages/contact.js",
    electric: "./src/pages/electric.js",
    feature: "./src/pages/feature.js",
    "field-service": "./src/pages/field-service.js",
    gas: "./src/pages/gas.js",
    help: "./src/pages/help.js",
    index: "./src/pages/index.js",
    insights: "./src/pages/insights.js",
    partners: "./src/pages/partners.js",
    "partners-login": "./src/pages/partners-login.js",
    "partners-account": "./src/pages/partners-account.js",
    playbook: "./src/pages/playbook.js",
    "privacy-policy": "./src/pages/privacy-policy.js",
    water: "./src/pages/water.js",
    team: "./src/pages/team.js",
    careers: "./src/pages/careers.js",
    marketing: "./src/pages/marketing.js",
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080,
    writeToDisk: false, // https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "assets/images",
            attrs: [
              ":srcset",
              ":data-srcset",
              "img:data-src",
              "img:src",
              "audio:src",
              "video:src",
              "track:src",
              "embed:src",
              "input:src",
              "object:data",
              "script:src",
            ],
          },
        },
      },
      {
        test: /\.(svg|png|jpg|gif|pdf|mp4|webp)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "assets/images",
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false,
              name: "[name].[ext]",
              outputPath: "assets/fonts",
            },
          },
        ],
      },
    ],
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new CopyPlugin({
      patterns: [
        { from: "_redirects", to: "" },
        { from: "src/assets/videos", to: "assets/videos" },
        { from: "src/assets/webfonts", to: "assets/webfonts" },
        { from: "src/assets/casestudies", to: "assets/casestudies" },
      ],
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg|MP4|WebP|pdf)$/i,
      cacheFolder: "./.cache",
      minFileSize: 5000, // Only apply this one to files over 5kb
      plugins: [
        imageminJpegtran({ progressive: true }),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    }),
    new HtmlWebpackPlugin({
      favicon: "./src/favicon.ico",
      meta: {
        charset: "UTF-8",
        viewport: "width=device-width, initial-scale=1",
        "X-UA-Compatible": {
          "http-equiv": "X-UA-Compatible",
          content: "IE=edge,chrome=1",
        },
      },
      template: "./src/pages/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html", // output file
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      // All scripts set to async
      defaultAttribute: "async",
    }),
  ].concat(multipleHtmlCompress),
};
