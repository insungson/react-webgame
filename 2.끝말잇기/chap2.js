//2-8) 끝말잇기 class 만들기
//WordRelayClass.jsx      파일을 만들고 class 방식으로 끝말잇기 프로그램을 만들어보자
//              input 태그에서 value, onChange는 세트이다  그게 아니면 defaultValue를 넣어야 한다
//client.jsx              파일을 만들고 WordRelayClass.jsx 파일을 가져오고 
//webpack.config.js       파일을 만들고 웹팩 설정을 하여 app.js 파일을 만든다
//index.html              파일을 만들고 만들어진 app.js 파일을 가져와서 실행한다


////////////////////////////////////////////////
//2-9)webpack-dev-server와 hot-loader
//jsx 파일을 수정할때마가 npx webpack 이나 npm run dev 로 항상 빌드를 해줘야 하기 때문에 자동으로 하는법을알아보자
//npm i -D react-hot-loader webpack-dev-server        를 추가적으로 설치하자
//package.json  파일에서 scripts/"dev":"webpack-dev-server --hot" 으로 수정해주자
//webpack-dev-server는 webpack.config.js 를 확인하고 항상 업데이트 해준다 localhost포트 하날 잡는다
//(앞으로 그 주소로 들어가면 작업한것을 확인하면 된다)

//client.jsx    파일에서 const {hot} = require('react-hot-loader/root'); 를 추가해주고
//              render 부분에서 render(<Hot />) 로 바꾸고 위에 const Hot = hot(WordRelay); 를 추가해주자
//webpack.config.js     에서 babeloader/option/plugins에 'react-hot-loader/babel' 을 추가해준다
//                      그리고 output에 publicPath:'/dist/' 를 설정하면 된다
//                      publicPath 는 node에서 app.use('/dist', express.static(__dirname, dist)) 와 같다
//                      가상패스
//이제 npm run dev     로 다시 빌드한 후 localhost 주소로 들어가면 된다
//(이제 jsx 파일을 바꾸고 저장을 하면 nodemon 처럼 저장되고 반영이 될 것이다)


////////////////////////////////////////////////
//2-10) 끝말잇기 Class -> Hooks 로 바꿔보자
//WordRelay.jsx 와 WordRelayClass.jsx 를 비교하면된다
//브라우저 콘솔창에서 [HMR] 는 코드를 바꾼 것이다   [WDS] 는 웹팩 데브 서버이다 (디버그시 유용)
