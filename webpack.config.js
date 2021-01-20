const path = require('path');


module.exports = {
  entry: './src/index.ts',





  module: {
    rules: [

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
        exclude: /\.module\.scss$/
      },


      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          'sass-loader'
        ],
        include: /\.module\.scss$/
      },


      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

    ],
  },


  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },


  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },



};