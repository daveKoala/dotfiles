const path = require('path');
const fs = require('fs');
const nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });


module.exports = {
  entry: './src/server.ts',
  target: 'node',
  devtool: 'inline-source-map',
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        // exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  }
};
