// config/webpack.supplier.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development", // Change to "production" for production builds
  entry: "./src/panels/suppliers/index.js", // Entry point for your supplier panel
  output: {
    path: path.resolve(__dirname, "../dist/suppliers"), // Output directory
    filename: "bundle.js", // Output bundle file name
    publicPath: "/", // Public URL of the output directory when referenced in a browser
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match both .js and .jsx files
        exclude: /node_modules/,
        use: "babel-loader", // Use Babel to transpile JavaScript files
      },
      {
        test: /\.css$/, // Match CSS files
        use: ["style-loader", "css-loader"], // Use style-loader and css-loader
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/, // Match common image formats
        type: "asset/resource", // Emits a separate file and exports the URL
        generator: {
          filename: "images/[name][ext]", // Custom output folder and name for images
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve these extensions
    alias: {
      "@panels": path.resolve(__dirname, "../src/panels"), // Alias for easier imports
      "@assets": path.resolve(__dirname, "../src/assets"), // Add assets alias
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Template for the HTML file
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets/images/Favicon.png",
          to: "favicon.png",
        },
        {
          from: "src/assets/images",
          to: "images",
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "../dist/suppliers"),
    },
    port: 3003, // Port for the dev server
    open: true, // Automatically open the browser
    historyApiFallback: true, // Support for React Router
  },
};