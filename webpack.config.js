const path = require("path");
module.exports = {
  entry: "./src/frontend.tsx",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build/static"),
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  }
};
