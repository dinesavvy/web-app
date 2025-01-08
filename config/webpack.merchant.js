// config/webpack.admin.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/panels/merchant/index.js",
  output: {
    path: path.resolve(__dirname, "../dist/merchant"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match both .js and .jsx files
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/, // Match common image formats
        type: "asset/resource", // Emits a separate file and exports the URL
        generator: {
          filename: "images/[name][hash][ext]", // Custom output folder and name
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@panels": path.resolve(__dirname, "../src/panels"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    static: path.join(__dirname, "../dist/merchant"),
    port: 3001,
    open: true,
    historyApiFallback: true, // Ensures React Router routes work
  },
};
