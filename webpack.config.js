const path = require('path');
const webpack = require('webpack');

const src = path.resolve(__dirname, './src');
const build = path.resolve(__dirname, './public'); // output worker.js to public folder


const tsLoader = {
  loader: 'ts-loader',
  options: { compilerOptions: { module: 'esnext', noEmit: false } }
}


const babelLoader ={
    loader: 'babel-loader',
    options: {
    presets: ['@babel/preset-env']
    }
}

module.exports = {
  mode: 'none',
  target: "webworker", //Importan! Use webworker target
  entry: './src/dexie.worker.js',
  output: {
    filename: 'dexie.worker.js',
    path: build
  },
  resolve: {
    modules: ["node_modules", src],
    extensions: [".js", ".json", ".jsx", ".ts", ".tsx"],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') })
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [tsLoader]
      },
      {
        test: /\.js?$/,
        use: [babelLoader]
      },
    ]
  }
};
