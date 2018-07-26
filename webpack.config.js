var webpack = require('webpack');

/*
* Production Webpack config
*/

module.exports = {
  entry: "./index.js",
  output: {
    library: 'AlphaScrollFlatList',
    libraryTarget: 'umd',
    path: __dirname + "/dist/",
    filename: "alpha-scroll-flat-list.js"
  },
  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      },
      "react-native": {
        root: "ReactNative",
        commonjs2: "react-native",
        commonjs: "react-native",
        amd: "react-native"
      },
      "prop-types": {
        root: "PropTypes",
        commonjs2: "prop-types",
        commonjs: "prop-types",
        amd: "prop-types"
      },
      "lodash": {
        root: "lodash",
        commonjs2: "lodash",
        commonjs: "lodash",
        amd: "lodash"
      }
    }
  ],
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  // resolve: {
  //   extensions: ['.js', '.jsx']
  // }
};