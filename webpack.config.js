/* eslint-env node */

const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  context: __dirname,
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.json', '.vue']
  },
  entry: './src/index.js',
  externals: {
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "vue-confirm-button.min.js",
    library: 'VueConfirmButton',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {test: /\.scss?$/, loaders: ['css-loader']},
      {test: /\.css?$/, loaders: ['css-loader']}
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./dist'])
  ],
  devtool: false,
  performance: {
    hints: false
  }
}
