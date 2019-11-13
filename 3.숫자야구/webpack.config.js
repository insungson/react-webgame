const path = require('path');

module.exports = {
  name: 'number-baseball-dev',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: './client',
  },
  module: {
    rules:[{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets:[
          ['@babel/preset-env', {
            targets:{browsers: ['last 2 chrome versions']}, //browser 뒤에 s를 안붙였다..
            debug:true
          }],
          '@babel/preset-react',
        ],
        plugins: ['react-hot-loader/babel','@babel/plugin-proposal-class-properties'],
      },
      exclude: path.join(__dirname, 'node_modules'),
    }],
  },
  plugins: [],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist',
  },
};
