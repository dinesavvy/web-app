// config/webpack.admin.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/panels/admin/index.js",
  output: {
    path: path.resolve(__dirname, "../dist/admin"),
    filename: "bundle.js",
    publicPath: "/", // Ensure the correct public path
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
      favicon: path.resolve(__dirname, "../public/favicon/favicon.ico"),
    }),
  ],
  devServer: {
    static: path.join(__dirname, "../dist/admin"),
    port: 3002,
    open: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/admin\/merchant/, to: "/index.html" }, // Ensure correct fallback
      ],
    },
  },
};
