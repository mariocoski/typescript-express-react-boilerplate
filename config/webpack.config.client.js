const path = require("path");
const { ReactLoadablePlugin } = require("react-loadable/webpack");

module.exports = {
  // The main entry point of the application
  entry: ["babel-polyfill", path.join(__dirname, "..", "src", "client")],
  mode: "development",
  // The main entry point src/client/index.tsx
  // Main entry point plus each dynamic import generate a bundle
  // Ex: import(/* webpackChunkName: "about" */ "../pages/about") generate about.js
  output: {
    path: path.join(__dirname, "..", "client"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/static/js/"
  },

  // src files take into account
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },

  // Plugins in charge to transform the src code
  // Rules are applied from right to left (ts-loader then babel-loader)
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          // 2. babel-preset-react transform React jsx and babel-preset-env es2015 syntax into code understandable by the browser
          //    syntax-dynamic-import allow babel to parse dynamic import syntax but not transform it
          //    react-loadable/babel declare wich modules are being loaded
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: [
                "react",
                [
                  "env",
                  {
                    modules: false
                  }
                ]
              ],
              plugins: ["syntax-dynamic-import", "react-loadable/babel"]
            }
          },
          // 1. TypeScript type check and emit JavaScript es2015 (TypeScript without types) consumable by Babel
          {
            loader: "ts-loader",
            options: {
              configFile: require.resolve("./tsconfig.json"),
              context: __dirname
            }
          }
        ]
      }
    ]
  },

  // React Loadable generate stats for mapping modules to bundle
  // This file is used on server side rendering to determine which bundle need to be load
  // Webpack build server and client simultaneously so we need to commit reactLodable.json in src
  // this way Webpack will always find the file when the server build append before client
  plugins: [
    new ReactLoadablePlugin({
      filename: path.join(__dirname, "..", "src", "server", "stats", "reactLoadable.json")
    })
  ]
};
