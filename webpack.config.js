const webpack = require("webpack");

module.exports = {
  entry: "./src/OverviewMap.tsx",
  output: {
    filename: "./widgets/OverviewMap.js",
    libraryTarget: "amd"
  },
  resolve: {
    extensions: [".webpack.js", ".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  externals: [
    function(context, request, callback) {
      if (
        /^dojo/.test(request) ||
        /^dojox/.test(request) ||
        /^dijit/.test(request) ||
        /^esri/.test(request)
      ) {
        return callback(null, "amd " + request);
      }
      callback();
    }
  ]
};
