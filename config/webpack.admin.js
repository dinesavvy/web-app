// config/webpack.admin.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/panels/admin/index.js",
  output: {
    path: path.resolve(__dirname, "../dist/admin"),
    filename: "bundle.js",
    publicPath: "/", // Ensure the correct public path
    assetModuleFilename: 'assets/[name][ext]' // Add this line for better asset handling
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
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/, // Match common image formats
        type: "asset/resource", // Emits a separate file and exports the URL
        generator: {
          filename: "assets/images/[name][ext]", // Updated path for images
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@panels": path.resolve(__dirname, "../src/panels"),
      "@assets": path.resolve(__dirname, "../src/assets"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: path.resolve(__dirname, "../public/favicon/favicon.ico"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets/images",
          to: "images",
        },
        {
          from: "src/assets/images/Favicon.png",
          to: "favicon.png",
        }
      ],
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "../dist/admin"),
      },
      {
        directory: path.join(__dirname, "../src/assets"),
        publicPath: "/assets"
      }
    ],
    port: 3002,
    open: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/admin\/merchant/, to: "/index.html" }, // Ensure correct fallback
      ],
    },
  },
};
