const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development', //(개발모드, 실제배포모드 결정)
  devtool: 'eval', //(개발일때는 eval// production일때는 hidden-source-map 을 쓰면된다)
  resolve: {
    extensions: ['.jsx','.js'], //(이렇게 설정하면 entry에서 뒤에 파일명을 적을 필요가 없다)
  },
  entry:{//(시작하는 파일들)
    app: './client.jsx',
  },
  module:{ //Loaders 설정들 
    rules: [{
      test: /\.jsx?$/, //.jsx 확장자 파일에
      loader: 'babel-loader',
      options: {
        presets: [ //plugin들의 모음이 preset이다
          ['@babel/preset-env',{ //바벨로더의 룰을 적용시킬것이다 (최신문법을 예전문법에도 돌아가게 해줄것이다)
            targets:{
              browsers: ['> 1% in KR'], //browserlist https://github.com/browserslist/browserslist 체크해보기
            },
            debug: true,
          }],
          '@babel/preset-react', //기본적으론 preset만 하고 에러나면 아래 plugin을 추가한다
        ],
        plugins: [],
      },
    }],
  },
  plugins:[ //(추가적으로 하고 싶은 작업)
    new webpack.LoaderOptionsPlugin({debug: true}),
  ],
  output: { //(결과가 어떻게 될지)
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  },
};