const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Входной файл
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // Для корректной работы с маршрутизацией в React Router
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // Поддержка расширений файлов
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Для TypeScript файлов
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Для CSS файлов
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/, // Для JavaScript/React файлов
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Babel для поддержки ES6+ и JSX
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.svg$/, // Для загрузки SVG
        use: ['@svgr/webpack', 'url-loader'], // Используем @svgr для обработки SVG как React-компонентов
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // путь к твоему HTML файлу
    }),
  ],
  devtool: 'source-map', // Для отладки
  devServer: {
    static: path.join(__dirname, 'dist'), // Статические файлы из папки dist
    compress: true,
    port: 3000, // Порт для dev-сервера
    historyApiFallback: true, // Для корректной работы React Router
    open: true, // Автоматически открывает браузер при старте
  },
};
