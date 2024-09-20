const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', 
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], 
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, 
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.svg$/, 
        use: ['@svgr/webpack', 'url-loader'], 
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', 
    }),
  ],
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000, 
    historyApiFallback: true, 
    open: true, 
  },
};
