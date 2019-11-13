//1) 리엑트를 왜 쓰는가?
// -> React createClass -> Class -> Hooks  를 써서 코드를 만들었다. 
//(Hooks는 페이스북이 밀고 있다.  하지만 Class가 대부분 사용되기 때문에 Class 개념도 배워본다)
//리엑트는 single page application 이다.(화면 깜박임 없이 사용된다)
//앱처럼 웹을 쉽게 사용하기 위해 쓴다  facebook이 react를 만든이유는 데이터처리를 쉽게 처리하기 위해 만들었다 
//Jquery로는 불가능하다 데이터 - 화면을 일치시키는게 어렵기 떄문에 이부분을 react가 해준다
//component 는 layout화 해서 중복을 피할 수 있다
//@리엑트 특징@
//1. 사용자 경험을 만들어준다(웹에서 앱과 같은 사용자경험을 만들어주는게 리엑트이다)
//2. 재사용 컴포넌트 (위에서 말한것 처럼 layout같은 틀을 만들어거 중복을 피해준다)
//3. 데이터-화면(데이터와 화면을 싱크로나이즈(일치)하는게 가능하다)

/////////////////////////////////////////////////
//2) 첫 리액드 컴포넌트
// 리엑트파일  -----웹팩--------> 자바스크립트 코드
//웹팩은 위와 같이 변환해주는 역할을 한다

//아래의 코드는 헤드에 넣는다
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
// react가 동작하는 핵심파일이 위에 있다(react)
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
// react 코드가 웹에서 돌아가게 해준다(react-dom)


const e = React.createElement;

class LikeButton extends React.Component {//리엑트 안에 컴포넌트가 있고 컴포넌트를 상속한다
  constructor(props) {
    super(props);
    this.state = {liked: false};     //여기서 초기 state를 설정한다
  }

  render() {                         //화면에 표시하는 부분이다
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e('button', {onClick: () => this.setState({liked: true})}, 'Like');
  }   //위는 <button>Like</button> 과 같이 Like가 들어간 태그를 만들겠다는 뜻이다
}


//아래가 화면에 랜더링하는 코드이다 ReactDOM.render로 렌더링을 한다는 뜻이고, 
//LikeButton클래스를  document.querySelector('#root')에 붙이겠다는 것이다 
<script>
  ReactDOM.render(e(LikeButton), document.querySelector('#root'));
</script>

//이제 컴포넌트가 전체적으로 작동방법을 살펴보자
//1) 해드에서 react(리엑트기능), react-dom(리엑트를 웹에서 사용하게만듬) 스크립트를 불러오고
//2) 바디에서 태그로 화면을 구성한다
//3) 스크립트에서 리엑트로 likebutton 컴포넌트를 만들 예정이다
//4) 아래 스크립트에서(reactDOM) root 안에다가 렌더링을 해서 화면에 띄운다

//////////////////////////////////
//3) HTML 속성과 상태(state)
//
return e('button', {onClick: () => this.setState({liked: true})}, 'Like'); //객체를 넣는다 
//위처럼 HTML 버튼 태그안에 자바스크립트코드인 onClick를 넣고 객체처럼 동작하게 만들어서 작동하게 할 수 있다.
//*** 보통 HTML은 onclick이지만... 리엑트에서 HTML태그안에 자바스크립트 코드를 넣을 땐 onClick으로 대문자를 쓴다

//컴포넌트의 강점은 state(상태)에 있다  위의 상황에서 like가 바뀌는것을 상태라고 한다
//즉!!! state(상태)는 바뀔 여지가 있는 부분이다!!!

constructor(props) {      
  super(props);
  this.state = {liked: false};  //여기서 초기 state를 설정한다
}

// 이후 아래의 랜더링 코드에서 setState()로 onClick을 발생시킬때 state 상태를 바꿔준다
return e(
  'button',
  {onClick: () => this.setState({liked: true}), type:'submit'},  //setState()로 state를 바꿀수 있다
  'Like',
); 

//https://chrome.google.com/webstore/search/react     여기서 크롬 react 툴을 추가해주는게 좋다
//https://kkiuk.tistory.com/291           (크롬에서 react확장프로그램 설정하는 방법)


//like <-> liked  로 바뀌는 리엑트 스크립트 코드를 살펴보자
//일단 아래는 그냥 기존코드...
<script>
  const e = React.createElement;

  class LikeButton extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        liked: false,
      };
    }

    render() {
      return e(
        'button',       //이건 HTML 태그명
        {onClick: () => {this.setState({liked: true})}, type: 'submit'}, //이벤트코드 (타입도 여서 정해줌)
        'like'          //content 문자로 보여주는 부분
      )
    }
  }
</script>
//코드를 치면서 보니깐... 클래스 안에 렌더링 하는 부분도 다 들어간다

//여기가 바뀌는 코드이다
<script>
  const e = React.createElement;

  class LikeButton extends React.Component{
    constructor(props){
      super(props);
      this.state = {liked: false,};
    }

    render(){
      return e(
        'button',
        {onClick: () => {this.setState({liked: true})}, type:'submit'},
        this.state.liked === true ? 'Liked' : 'Like',    //content 부분에서 이렇게 바꿔주면 된다
      )   //클릭시 state에 따라 화면이 바뀐다 
    }     //jquery 에서는 $('button').text('Liked');  이렇게 직접 텍스트를 바꿔야만 했다..
  }       //하지만!!  리엑트는 state만 바꾸면 텍스트가 바뀐다
</script>

/////////////////////////////////////////////////////////////
//4) JSX와 바벨(babel)
// 이제 위에서 사용한 문법을 JSX로 바꿔보자 JSX는(javascript + XML)이다
// 바벨은 HTML 코드에 자바스크립트 코드가 들어가도록 변환해준다 (원래는 말이 안되는것이다..)
//예제는 like-button.html  VS   like-button-jsx.html   을 비교하면 된다


//우선 HTML 태그에 스크립트를 넣을수 있게 변환해주는 babel을 넣어야 한다
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>  //이게 추가한 부분이다

//기존코드와 비교해서 보자
<script type="text/babel">
  //이제 아래의 e는 필요가 없다 대신 script 타입을 text/babel 로 바꿔야한다
  //const e = React.createElement;

  class LikeButton extends React.Component {
    constructor(props){
      super(props);
      this.state = {liked: false,};
    }

    render(){
      return <button 
        type='submit' 
        onClick={() => {this.setState({liked: true})}}>
        {this.state.liked === true ? 'Liked' : 'Like'}    //텍스트부분은 HTML처럼 가운데 {}를 써서 넣으면 된다
        </button> ;
        //위와 같이 HTML태그 안에 자바스크립트 코드를 넣을 수 있다 아래처럼 e를 쓰는것 보다 버튼을 쓰고 있는게
        //더 명확하게 보인다
        //이제 위의 e는 필요가 없다
      //return e(
        //'button',
        //{onClick: () => {this.setState({liked:true})}, type: 'submit'},
        //this.state.liked === true ? 'Liked' : 'Like',
      //);
    }
  }
</script>



//물론 e가 없어진 만큼 랜더링 하는 부분도 바뀐다 e를 빼고 태그식으로 넣고, script 타입을 text/babel로 바꿔준다
<script type='text/babel'>
  ReactDOM.render(<LikeButton/>, document.quertSelector('#root'));
</script>
//<script>
//  ReactDOM.render(e(LikeButton), document.quertSelector('#root'));
//</script>

//!!!  재사용의 재발견!!!! 
//클래스로 만든 컴포넌트를 랜더링할때 연속해서 쓰면 클래스 컴포넌트만 바꾸면 다 바뀐다
//ex)
<script type='text/babel'>
  ReactDOM.render(
    <div><LikeButton/><LikeButton/><LikeButton/><LikeButton/></div>, 
    //LikeButton 같은 싱글태그는 끝에 /를 붙여줘야한다 그래서<LikeButton/> 가 되는것이다
  document.quertSelector('#root'));
</script>
//위와 같이 LikeButton을 4개 연속으로 넣을 수 있다. 다른 값을 바꾸고 싶을땐 클래스 컴포넌트만 바꾸면 다 바뀐다


//HTML 태그와 react 컴포넌트 비교방법...
//<div> 나 <button> 같이 소문자로 시작하면 HTML태그..
//<LikeButton/> 같이 대문자로 시작하면 react component 이다


//위에서 붙여넣은 바벨코드
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
//를 붙여넣고 스크립트에 <script type='text/babel'> 를 쓰면 바벨이 알아서 최신문법을 예전것으로 바꿔준다
//위에것은 문법만 최신으로 바꿔주고, 객체나 메소드까지 사용하려면 바벨폴리필을 추가해줘야한다
//https://www.zerocho.com/category/ECMAScript/post/57a830cfa1d6971500059d5a   바벨,폴리필 개념
//https://meetup.toast.com/posts/157    바벨,폴리필,웹팩 세팅... 좀 고차원적인 부분


///////////////////////////////////////////////////////////////
//5) 구구단 리엑트 만들기
// 구구단.html 파일을 만들고,  state가 변하는 부분을 캐치해서 class의 state에서 초기값을 설정한다(여기선 4개)
// 렌더에 {} 부분은 state의 변수가 들어갈 자리이므로 그부분만 빼고 html 태그식으로 코드를 작성한다
// form 태그에서 input에 들어갈 값이 바뀌므로 setState()를 써서 입력값을 바꿔야 한다 
// input 태그에 onChange() DOM 이벤트를 넣어서 컨트롤 해야 input에 값이 들어간다
// (수동으로 바꿀값들만 setState()를 만들면 된다)

// submit 버튼을 누를때 이벤트가 발생하도록 onSubmit()을 form태그에 넣는다 
// https://developer.mozilla.org/en-US/docs/Web/Events   DOM 이벤트 관련 문서

// form태그에 넣는 onSubmit()이벤트는 리엑트 클래스 컴포넌트 안에 메서드로 넣어서 그 메서드를 form 태그에 넣으면
// 나중에 재사용도 되고 코드가 간결해진다 input태그에 들어가는 onChange() 도 메서드를 빼자

////////////////////////////////////////////////////////////
//6)Fragment와 기타 팁들
//앞에서 ReactDOM.render()를 할때 div를 앞뒤로 붙여줬다 (div 안붙이면 에러발생)
<script type='text/babel'>
  ReactDOM.render(
    <div><LikeButton/><LikeButton/><LikeButton/><LikeButton/></div>, 
    //LikeButton 같은 싱글태그는 끝에 /를 붙여줘야한다 그래서<LikeButton/> 가 되는것이다
  document.quertSelector('#root'));
</script>

//위와 같이 div를 붙일때 그냥 빈 div가 생성되므로 나중에 css를 먹이거나 여러모로 힘들다
// 그래서 Fragment를 적용시키면 없어진다 
// 기존의 div 대신 앞뒤로 <React.Fragment></React.Fragment> 로 앞뒤를 감싸면 페이지에서 element를 확인할때
// 빈 div 태그가 없어진것을 확인할 수 있다 (여담으로 바벨2를 쓰면 <> </> 빈태그를 써도 된다)

//return 뒤에 () 는 안 써도 되긴한다. ()는 그룹연산자와 같은 의미이다 ()는 우선순위를 높일때 쓰인다

//***팁!! form 태그가 있을 때 
<form onSubmit={this.onSubmit}>
  <button type='submit'></button>
</form>
// form 태그가 없을 땐
<button onClick={this.onSubmit}></button>
//이런식으로 처리를 한다

//클래스 컴포넌트 안에서의 메서드는 화살표함수로 써야 에러가 안난다

//실무에서 클래스 컴포넌트 안에서 constructor 대신 state에 바로 변수들을 선언한다
//like-button.html  과 Gugudan-class.html의 클래스 컴포넌트의 state 정의 부분을 확인해보자


//////////////////////////////////////////////////
//9) 함수형 setState
//Gugudan-class.html 에서 setState() 안에 바꾸고 싶은 상태를 입력하면 되는데...
// onSumit() 메서드에서 setState() if문의 setState()는 입력값을 다시 받아서 출력하기 때문에 이전의 값을 받는다
// setState()는 비동기 방식이다.
// 그래서 입력값을 한번더 받는형식으로 써야 한다

//예를 들면 클릭시 숫자가 +1이 되는 setState()를 만들때
this.setState({
  value: this.state.value + 1,
});
this.setState({
  value: this.state.value + 1,
});
this.setState({
  value: this.state.value + 1,
});
//이렇게 3번 연달아쓰면 새로운 value + 3 으로 예상되지만... 비동기방식이라 1이될수도 있고 3이하의 랜덤값이 된다
//(그래서 Class방식의 React는 state를 한군대로 모아놓는것이다(한번에 처리하기 위해서))

**예전 state의 값으로 새로운 state값을 만들땐 기존값을 받아 리턴하자!!!




///////////////////////////////////////////////////////
//10) ref(render메서드 안에 만들어진 DOM노드, React요소들에 접근하기 위해 사용)
//리엑트에서 input 태그에 focus() 이벤트를 사용하고 싶다면 랜더링하는 함수의 input태그에 ref 를 넣고
//클래스 컴포넌트의 메서드에서(setState로 state를 바꾸는부분) focus()를 쓰면 focus DOM 이벤트가 작동되는것을
//볼 수 있다

//ref : 리액트에서 부모 컴포넌트 - 자식 컴포넌트 데이터를 연결하는건 props가 유일하다
//      자식을 수정하기 위해선 부모에게 new props 로 리랜더링을 해서 바꿔야 한다 
//      ref는 직접적으로 외부에서 자식을 수정할 수 있게 만들어준다

//ref를 사용하기 좋은 경우들
//1) Managing focus, text selection, or media playback.
//2) Triggering imperative animations.
//3) Integrating with third-party DOM libraries.

//처음 시작할때 render() 가 실행되고 이후 
//**setState()로 state값을 변경 할 때 render()가 실행된다  (문제는 render를 자주하면 느려질 수 있다) 성능최적화문제
//render() 내부의 메서드를 클래스 컴포넌트 안으로 빼는 이유는 render()가 자주 실행되기 때문이다


////////////////////////////////////////////////////////
//2-1) React Hooks 사용하기(명확하게하자면... 함수 컴포넌트이다)
//Hooks 와 클래스 컴포넌트를 사용한것의 차이는 Gugudan.html(Hooks) VS Gugadan-class.html(클래스 컴포넌트)를 비교

//Hooks는 기존의 클래스를 사용하기 싫은 개발자들이 함수형 개발을 하기 위해 고안한 것이다
//(니꼴라스말 들어보면 Hooks 개발하던 사람 React 팀에서 스카웃함)

//Hooks 는 리엑트에서 권장하는 방법임!

//클래스형, 함수형 비교
//1) 정의할때
//간단하게 비교하면 클래스는 
class Gugudan extends React.Component{}
//함수형은 
const Gugudan = () => {
  return <div>Hello Hooks</div>;
}
//위와 같은 방법이다  물론 state나 setState도 클래스처럼 함수 내부에서 정의한다


//다만... 클래스는 state에서 변수들을 한번에 정의하고
this.setState((prevState) => {
  return {
    result: '정답: ' + prevState.value,
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: '',
  };
});
//함수형은 각 변수마다 setState가 있다.
const GuGuDan = () => {
  const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = React.useState('');
  const [result, setResult] = React.useState('');
  //배열쓰고 객체를 할당하는건 구조화할당이라한다


//2) state 변화시킬때(메소드 실행하여 state값을 변화시킬때)
//클래스는 setState()로 state값을 바꾸지만(불필요한건 선언안하면됨)
//함수형은 변수에 맞는 state만 씀
//ex)  const [value, setValue] = React.useState(''); 로 state 변수를 선언할때
//setValue(바꿀값) 로 state를 변화시킨다


//3) ref를 사용할때
//그냥 약간 사용방법이 다르다... Gugudan.html  과  Gugudan-class.html을 비교하면 안다
// 클래스에서는 this.input.focus(); 로 DOM에 접근했지만
// HOOKS에서는 const inputEl = React.useRef(null);  리엑트의 userRef()를 써서 DOM에 접근한다


//4) state값이 바뀔때
// class는 render() 함수만 재실행되는데 
// Hooks는 함수 전체가 재실행된다
//그래서 Hooks가 좀더 오래걸린다는게 단점이다

//////////////////////////////////////////////////
//2-2) Class VS Hooks

//리엑트에서는 태그에 클래스를 아래와 같이 쓴다 
<button id='button' className='btn'>입력!</button>
//class는 className, for는 htmlFor 로 쓴다

//클래스는 메서드에서 state값을 변경할때 setState()를 통해 해당 변수만 쓰면된다
this.setState({
  result: '땡',
  value: '',
});
//만약 Hooks에서 state를 분리하지 않고 하나의 객체로 합치고 위와 같이 setState()를 쓴다면
//모든 state값을 다 적어줘야 한다... 하나라도 빠진다면 아예 state값이 안들어간다
//(Hooks는 state를 변수마다 나눠주기 때문에 걱정안해도 된다)

//@** 아래의 Hook 코드에서 함수가 4번 들어가니깐 랜더링이 4번일어날까? 
const onSubmitForm = (e) => {
  e.preventDefault();
  if (parseInt(value) === first * second) {
    setResult('정답');                        //함수
    setFirst(Math.ceil(Math.random() * 9));   //함수
    setSecond(Math.ceil(Math.random() * 9));  //함수
    setValue('');                             //함수
    inputEl.current.focus();
// => 아니다!!! Hooks 에서 랜더링 시 4개의 setState를 하나로 모아 비동기식으로 처리하기 때문에 랜더링은 1번일어난다

//이와 마찬가지로 Class에서 state()에 변수를 다 넣는 이유가.. 한번에 모아서 비동기식으로 처리하려고 객체로 합친것이다
state = {
  first: Math.ceil(Math.random() * 9),
  second: Math.ceil(Math.random() * 9),
  value: '',
  result: '',
};
//class에서 state를 객체 하나에 모아놓은 이유!!!!


////////////////////////////////////////////////////////////////////
//2-3) 웹팩 설치하기
//웹팩을 쓰는 이유
//=> 여러개의 자바스크립트 파일을(바벨등 여러자바스크립트들) 하나로 합쳐서 적용시키는게 웹팩의 역할이다
//노드는 자바스크립트 실행기 이다 (웹팩을 적용시키려면 노드로 실행해야하기 때문에 리엑트를 하려면 노드를 알아야한다)
//(웹팩도 자바스크립트인데 웹팩을 돌리기 위해 노드를 실행해야한다)
// npm init                         으로 package.json 설정을 한다
// npm react react-dom              을 설치하고
// npm i -D webpack webpack-cli     로 웹팩을 개발자모드로 설치한다

//webpack.config.js           파일을 만들고 그 안에 코딩을 한다
//index.html                  파일에서 script 부분에 src="./dist/app.js" 로 webpack.config.js 설정을 연결한다
//client.jsx                  jsx로 확장자를 바꿔서 react 코드 전용파일로 개발자들끼리 알아보기 쉽게 하자

////////////////////////////////////////////////////////////////////////
//2-4) 모듈 시스템과 웹팩 설정
//웹팩은 js, jsx 파일을 하나의 app.js 합쳐서 html파일이 실행할수 있도록 하는 도구이다
//(최신문법을 옛날 브라우져에서도 사용할 수 있게 만들어준다)
//module.exports , require() 로 필요한 소스코드만 블럭 조립하듯이 가져올수 있다
//index.html  에서 src작업이 적게 이뤄지는데 이는 webpack에서 설정하여 파일을 하나로 합쳐서 깔끔하게 만든 것이다

//webpack.config.js  에서 웹팩 설정을 살펴보자 (client.jsx, GuGudan.jsx를 합치는 설정을 보자)
//name: 프로젝트이름
//mode: development, 실서비스: prduction
//devtool: eval (개발일때는 eval// production일때는 hidden-source-map 을 쓰면된다)
//resolve: {extensions: ['.js','.jsx']}  (이렇게 설정하면 entry에서 뒤에 파일명을 적을 필요가 없다)
//**entry, output 이 가장 중요하다 
//entry:  (입력을 담당한다)(입력에 해당되는 파일은 client.jsx, GuGudan.jsx)
//  app:['client.jsx',//'GuGudan.jsx'//]   입력하는 파일을 배열로 넣어준다  
//                                        (위의 resolve extension에서 설정하면 확장자명 안써도 된다)
//  client.jsx에서 GuGudan.jsx를 불러오므로 client.jsx만 넣어도 웹팩에서 알아서 불러온다
//output:  (출력을 담당한다)(출력에 해당되는 파일은 dist/app.js)
//  path: path.join(__dirname + 'dist') 로 경로설정
//  filename: 'app.js'      으로 출력되는 파일 설정


//////////////////////////////////////////////////////////////////////
//2-5) 웹팩으로 빌드하기
//웹팩 명령어를 설정하여 명령어 프롬프트에 위에 설정한 webpack.config.js를 실행시켜야 한다
//명령어 설정 방법은 3가지가 있다
//1) package.json 에서 scripts 항목에서 "dev": "webpack" 을넣고 명령어창에 
//   npm run dev 를치면 webpack이 실행된다
//2) npx webpack  을 명령어 창에 쳐도 실행이 된다

//위의 명령어가 실행되면 dist/app.js 파일이 생성된다
// 그리고 에러가 발생하는데 jsx 파일은 바벨로 처리해야하기 때문이다, webpack에 바벨 설정을 해보자
//npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader 
//(에러 발생시 설치할것)npm i -D @babel/plugin-proposal-class-properties
//로 개발자모드로 바벨을 설치하자 (코어는 바벨(최신문법으로 바꿔줌), preset-env는 내컴터 환경에 맞게 바꿔준다, 
//preset-react는 jsx설치를 가능하게 해준다, babel-loader는 바벨과 웹팩을 연결해준다)
//(에러가 날때만 설치해주자)babel~~properties는 jsx 파일에서 react의 state변수설정을 사용하도록 해준다

//이제 webpack.config.js 에서 웹팩 설정을 추가해주자
//entry, output 사이에 넣는다 //의미는 entry의 파일을 읽고, modules을 적용하고, output으로 파일을 생성한다
//module: { 
//  rules: [{
//    test: /\.jsx?/,         //.jsx 확장자 파일에
//    loader: 'babel-loader',  //바벨로더의 룰을 적용시킬것이다 (최신문법을 예전문법에도 돌아가게 해줄것이다)
//    options: {
//      presets: [{'@babel/preset-env','@babel/preset-react'}], //기본적으론 preset만 하고 에러나면
//    //  plugins: ['@babel/plugin-proposal-class-properties']  //plugin을 설치하자
//    // 위의 것은 바벨에서 classProperties를 사용하도록 만들어준다
//}
// }],}   

//위의 설정을 하고 npm run dev, npx webpack 를 쳐서 다시 실행해보자
//(jsx 파일을 수정할때마다 위의 명령어 재실행으로 app.js 를 만들어야 한다)


///////////////////////////////////////////////////////////////
//2-6) 구구단을 웹팩으로 빌드하기
//npm init                           으로 package.json을 만들어주자
//npm i -D webpack webpack-cli       를 설치하고
//npm i -D babel-loader @babel-core @babel/preset-env @babel/preset-react   를 설치하자
//webpack.config.js      파일을 만들고 파일 설정을 하자 (플러그인은 에러가 나면 설정을 하자)
//package.json  에서 scripts 부분에 "dev":"webpack"  으로 바꿔주자
//GuGudan.jsx 파일을 만들고 기존의 리엑트 구구단 코드를 가져온다
//            (script src 를 안쓰고 node의 require 기능을 쓴다)
//client.jsx 파일을 만들고 GuGudan.jsx 를 가져온다 
//            (몇가지 수정한다 fragment는 node require 기능을 쓰므로 빼도됨)<>는 fragment의 간략한 방법이다
//npm run dev       를 명령창에 쓰고 app.js를 생성한다
//index.html        파일을 만들고 웹팩으로 빌드한 app.js를 불러오면 실행된다

///////////////////////////////////////////////////////////////////////
//2-7)@babel/preset-env와 plugins
//webpack.config.js     에서 module/rules/options에서 plugin들의 모음이 preset이다 
//                    (예를 들면 presets의 @babel/preset-env 는 수십개의 plugin들이 합쳐진 것이다)
//                    @babel/preset-env의 설정을 해보자
//                    preset:['@babel/preset-env'] 를 배열을 주고 그안에 {}를 만들어 추가 설정을 해보자
//            preset:[['@babel/preset-env',{targets:{browsers:['> 5% in KR','last 2 chrome versions']},}]]
//            위와 같이 구체적으로 브라우저 버전까지 설정해줄 수 있다 
//            (위의 예시는 한국에서 5%이상 사용하는 브라우저를 지원해주고, 지난 크롬2버전까지 지원한다는 뜻)
//(구체적으로 명시하는 이유는.. 바벨을 써서 예전 버전을 지원할 수록 느려지기 때문에 회사가 지향하는 방법으로 설정하자)
//https://github.com/browserslist/browserslist    여기서 브라우저를 사용하는 인구의 퍼센트를 생각해서 개발하면 좋다
//            debug: true  를 추가해주면 디버그도 나오게 할 수 있다

//webpack.config.js    에서 아래의 5개 컨셉을 중요시 여기는데.. 
//https://webpack.js.org/concepts/  웹팩 공식홈
// Entry (시작하는 파일들)
// Output (결과가 어떻게 될지)
// Loaders (module 들)
// Plugins (추가적으로 하고 싶은 작업)
// Mode   (개발모드, 실제배포모드 결정)
// 여기서 plugins 에 들어간 옵션들을 다빼고 실행하면서 에러들을 살피면 정말 필요한 plugin들만 고르고 나머진
// 제거할 수 있다

//위의 설정을 아래처럼 정렬하면 이해하기 쉽다
//mode              (개발자/배포 모드인지 결정)
//Entry             (넣을 파일들 결정)
//module(Loaders)   (Entry 파일에 모듈 적용)
//plugins           (추가적으로 plugins 를 적용)
//output            (하나의 파일로 합침)
//