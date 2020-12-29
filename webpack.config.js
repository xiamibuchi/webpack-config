const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EndWebpackPlugin = require("./src/plugins/EndWebpackPlugin");
const docsLoader = require.resolve("./src/plugins/vueDocsLoader");

module.exports = function (env = {}, argv) {
  return {
    // JavaScript 执行入口文件
    entry: "./src/main.js",
    output: {
      // 把所有依赖的模块合并输出到一个 bundle.js 文件
      filename: "bundle.js",
      // 输出文件都放到 dist 目录下
      path: path.resolve(__dirname, "./dist"),
    },
    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      port: 9000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
      },
      extensions: [".js", ".json"],
      descriptionFiles: ["package.json"],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              cacheDirectory: false,
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        },
        { test: /\.js$/i, resourceQuery: /type=docs/, loader: docsLoader },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
          include: path.resolve(__dirname, "src"),
        },
        {
          // 对非文本文件采用 file-loader 加载
          test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
          use: ["file-loader"],
        },
      ],
    },
    plugins: [
      new EndWebpackPlugin({
        option: true,
        doneCallback: () => console.log("compile end"),
        failCallback: () => console.log("compile fail"),
      }),
      new CopyPlugin({
        patterns: [{ from: "public", to: "./" }],
      }),
      new MiniCssExtractPlugin({
        filename: `[name]_[contenthash:8].css`,
      }),
    ],
    devtool: "source-map",
  };
};
