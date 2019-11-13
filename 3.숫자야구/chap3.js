////////////////////////
//3-1) import와 require 비교
//리엑트에선 import를 쓰고 노드에서는  require을 쓴다
//require는 NODE의 모듈 시스템이다
//예를 들면 const Try = require('./Try');  <->  import Try from './Try';  으로 바꾸면 된다
//        module.exports = NumberBaseball  <->  export default NumberBaseball; // import NumberBaseball;   
//위와 같이 바꾼다
// ** 하나 주의할 점은 import 에서 export 할때 
// export const hello = 'hello';  는 가져올 때 import {hello} 로 가져오고
// export const bye = 'bye';  는 가져올 때 import {bye} 로 가져온다
// export default NumberBaseball; 은 가져올 때 import NumberBaseball;  로 가져온다
//한 파일 내에서 default는 한번만 쓰이지만 const 는 변수이름만 다르면 여러번 쓰인다
//**NumberBaseball.jsx 에서 import React, {useRef, useState} from 'react'; 부분은 
//**React는 default로 가져오는 것이고, useRef, useState는 const로 된것을 가져온것임을 알 수 있다

//*노드의 모듈시스템에서  
//module.exports = {hello:'a'}; 
//exports.hello = 'a' 는 같다

//원래 node에서 import를 쓰면 에러가 나는데... webpack.config.js 에서 바벨로 설정을 해뒀기 때문에 
//import도 노드에서 사용할 수 있는 것이다
//(하지만 webpack.config.js 에서는 const  노드방식으로 코딩해야한다 노드가 돌려주기 때문에)


//////////////////////////////////////////////////
//3-2) 리액트 반복문(map)
//숫자야구를 만들때 몇번 시도하는지에 대해 ul 태그에 li 태그를 여러번 넣을 것이다
//이때 li 태그에 빈 배열을 넣고 map을 사용하여 [].map((v)) => {return (<li>{v}<li/>)})  를 넣어 
//배열의 인자 수만큼 li태그가 생성되는것을 확인할 수 있다

//예를 들면 
<ul>
  {['사과','바나나','포도','귤','감','배','밤'].map((v) => {return (<li>{v}</li>)});}
</ul>

<ul>
  <li>사과</li>
  <li>바나나</li>
  <li>포도</li>
  <li>귤</li>
  <li>감</li>
  <li>배</li>
  <li>밤</li>
</ul>

//과같이 나온다

//////////////////////////////////////////////////
//3-3) 리엑트 반복문(key)
//리엑트는 반복문에서 key를 보고 같은 컴포넌트인지 아닌지를 판단한다!

//아래의 예를 보자 이번엔 바뀌는 부분이 2쌍이다
<ul>
  <li><b>사과</b> - 맛있다</li>
  <li><b>바나나</b> - 맛없다</li>
  <li><b>포도</b> - 시다</li>
  <li><b>귤</b> - 쓰다</li>
  <li><b>감</b> - 떫다</li>
  <li><b>배</b> - 달다</li>
  <li><b>밤</b> - 몰라</li>
</ul>
//이걸 반복문으로 만들다면 이중 배열을 쓰거나 객체를 쓰면 된다
//1) 이중배열로 할때
<ul>
  {[
    ['사과','맛있다'],
    ['바나나','맛없다'],
    ['포도','시다'],
    ['귤','쓰다'],
    ['감','떫다'],
    ['배','달다'],
    ['밤','몰라']
  ].map((v) => {
    return (<li><b>{v[0]}</b> - {v[1]}</li>);
  })}
</ul>

//2) 객체로 할때
<ul>
  {[
    [fruit: '사과', taste: '맛있다'],
    [fruit: '바나나', taste: '맛없다'],
    [fruit: '포도', taste: '시다'],
    [fruit: '귤', taste: '쓰다'],
    [fruit: '감', taste: '떫다'],
    [fruit: '배', taste: '달다'],
    [fruit: '밤', taste: '몰라']
  ].map((v) => {
    return (
      <li><b>{v.fruit}</b> - {v.taste}</li>
    );
  })}
</ul>

//화살표 함수에서는 아래와 같이 return 생략이 가능하다
].map((v) => (
      <li><b>{v.fruit}</b> - {v.taste}</li>
  );
)}


//중요한건 여기에 키를 넣어야 한다
<ul>
  {[
    [fruit: '사과', taste: '맛있다'],
    [fruit: '바나나', taste: '맛없다'],
    [fruit: '포도', taste: '시다'],
    [fruit: '귤', taste: '쓰다'],
    [fruit: '감', taste: '떫다'],
    [fruit: '배', taste: '달다'],
    [fruit: '밤', taste: '몰라']
  ].map((v) => {
    return (
      <li key={v.fruit + v.taste}><b>{v.fruit}</b> - {v.taste}</li>   
      //여기에 고유의 값인 key를 넣어야 랜더링 후 에러가 안난다
      //key 값은 화면상엔 안뜨지만 리엑트가 판단하는 근거가 되기 때문에 절대!! 고유의 값을 선택해야한다
    );
  })}
</ul>


////map(v,i) 에서 i 는 배열의 위치값이다
<ul>
  {[
    [fruit: '사과', taste: '맛있다'],
    [fruit: '바나나', taste: '맛없다'],
    [fruit: '포도', taste: '시다'],
    [fruit: '귤', taste: '쓰다'],
    [fruit: '감', taste: '떫다'],
    [fruit: '배', taste: '달다'],
    [fruit: '밤', taste: '몰라']
  ].map((v,i) => {    //i는 배열값이다
    return (
      <li key={v.fruit + v.taste}><b>{v.fruit}</b> - {v.taste + i}</li>  //화면에 뿌리면 숫자가 뜬다 
    );  
  })}
</ul>

/// 위의것을 화면에 뿌리면 아래와 같이 배열의 숫자가 추가된다
<ul>
  <li><b>사과</b> - 맛있다0</li>
  <li><b>바나나</b> - 맛없다1</li>
  <li><b>포도</b> - 시다2</li>
  <li><b>귤</b> - 쓰다3</li>
  <li><b>감</b> - 떫다4</li>
  <li><b>배</b> - 달다5</li>
  <li><b>밤</b> - 몰라6</li>
</ul>

//map(v,i)에서 i는 고유의 값이지만... 절대!! 키에 쓰면 안된다 
//리엑트는 key를 기준으로 element를 수정 삭제 판단을 하기 때문에 배열의 순서가 바뀌면 문제가 생긴다!!!


/////////////////////////////////////////////////////////////////////
//3-4) 컴포넌트 분리와 props
//HTML에선 attribute, react에선 props 라고 부른다
//this.props.변수  로 값을 가져온다
//보통 반복문 형식으로 분리를 한다

//아래처럼 바꾸면 3-3의 코드보다 간결해진다
fruits = [
    [fruit: '사과', taste: '맛있다'],
    [fruit: '바나나', taste: '맛없다'],
    [fruit: '포도', taste: '시다'],
    [fruit: '귤', taste: '쓰다'],
    [fruit: '감', taste: '떫다'],
    [fruit: '배', taste: '달다'],
    [fruit: '밤', taste: '몰라']
  ];

<ul>
  {this.fruits.map((v,i) => {    //수정
    return (
      <li key={v.fruit + v.taste}>
        <b>{v.fruit}</b> - {v.taste + i}    //실무에선 리턴부분이 길어지기 때문에 다른곳으로 뺄 수 있다
        <div>컨텐츠1</div>
        <div>컨텐츠2</div>
        <div>컨텐츠3</div>
      </li>  
    );  
  })}
</ul>

//위의 리턴부분을 다른 파일로 빼자

<ul>
  {this.fruits.map((v,i) => {    //수정
    return (                                   
      <Try key={v.fruit+v.taste} value={v} index={i} /> //Map안에는 무조건 key를 넣어줘야 한다(map은 반복문이라서)
                //빠진부분에 컴포넌트를 가져오듯이 이렇게 HTML속성처럼 props를 넣는다
    );          //문제는 v,i가 떨어진 파일로 전달이 안되는데.. 이부분은 위의 코드에 변수(value,index)를 주고
  })}           //가져온 파일에서 this.porps.변수 로 값을 가져온다
</ul>


//파일하날 만들어서 뺀다(예시로 Try)
import React, {Component} From 'react';

class Try extends Component{
  render(){
    return (
      <li>
        <b>{this.props.value.fruit}</b> - {this.props.value.taste + this.props.index}  
        <div>컨텐츠1</div>      //this.props.변수로 부모컴포넌트에서 값을 가져온다
        <div>컨텐츠2</div>
        <div>컨텐츠3</div>
      </li> 
    );
  }
}

export default Try;



//Tryclass.jsx - NumberBaseballClass.jsx 를 비교해서 보면 알 수 있다


//////////////////////////////////////////
//3-5) 주석과 메서드 바인딩
//3-4에서 부모 - 자식간에 데이터를 주고 받을 때 this.props를 썻는데... 할아버지 - 손자 간 데이터를 주고 받을때
//사용하는것이 리덕스, 컨텍스트, 모뱁스  같은 것들이다 (손자 - 할아버지) 이런것들을 쓸때 

//**리엑트 자체에 컨택스트가 있고 컨택스트가 좀더 복잡하게 일을할 수 있게 하는게 리덕스(은행역할)이다

//리엑트에서 주석은 {/*코드*/}  이다 

//보통 리엑트에서 화살표 함수를 쓰는데 안쓰면 input 필드같은건 작동을 안한다 
onSubmitForm(e) => {
  e.preventDefault();
  console.log(this.state.value);
}


//다만 클래스에서 constructor()를 추가하고 몇 개 세팅을 하면 된다
Class NumberBaseball extends Component{
  constructor(props){
    super(props);
    this.state = {
      result = '',
      ~~변수들
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);  //constructor() 안에 이 코드를 넣으면
  }
}
// 아래와 같이 화살표를 빼도 에러없이 작동한다
onSubmitForm(e) {
  e.preventDefault();
  console.log(this.state.value);
}
//즉! 화살표 함수는 bind this를 대신하는 것이다


/////////////////////////////////////////////////////////////////////
//3-6) 숫자야구 만들기
//getNumbers() 함수를 만들어서 랜덤값을 주고 값을 만든다

//리엑트에서 state의 변수에서 [] 배열이 들어갈때.. push를 쓰면 안된다! 
//리엑트에서는 push를 사용해서 넣으면 뭐가 바뀌었는지 감지를 못한다
//그래서 리엑트에선 const array2 = [...array, 1] // ...array로 기존array 배열을 복사하고 1(새로운값)을 넣어준다
//위의 방식으로 배열에 값을 넣어야 한다
//리엑트가 기존것과 새로 바뀐것을 비교해서 렌더링 하기 때문에 push를 사용하면 기존값 자체가 바뀌어버려서 
//바뀐것을 감지하지 못한다(예전state, 지금state에 대해 true, false로 구분을 한다)

//그래서 state의 변수인 tries: [], 는 [...예전것, {새로운것}] 으로 state 변화를 줘야한다

//TryClass.jsx 에서 try,result 부분이 이해가 안됬었는데...
<div>{tryInfo.try}</div>
<div>{tryInfo.result}</div>
//이부분은..... NumberBaseballClass.jsx 에서
this.setState((prevState) => {
    return {
      tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
      value: '',
    };
  });
  this.inputRef.current.focus();
//// 여기서 기존의 배열인 ...prevState.tries에 
//{ try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}], 추가해주는 부분인 이것이다... 
//위처럼 변화를 줬고 그 state를 tries로 가져온것이고, tries를 tryInfo로 줬기 때문에 위처럼 나타낸것이다


// render(){ } 에서 this.state를 여러번 쓰는데.. 이부분은 구조분해로 const {result,value,tries} = this.state;
// 로 처리하면 앞으로 result, value, tries 만 쓰면 된다
// 마찬가지로 TryClass.jsx 에서도 this.props.tryInfo.try, this.props.tryInfo.result 부분도 
// const {tryInfo} = this.props;  로 비구조할당 처리하면 tryInfo.try, tryInfo.result 로 쓰면 된다

//setState에서 예전꺼 + 최신꺼 => 최신꺼 로 할때는 아래와 같이 prevState를 쓰자(함수형 setState 사용)
this.setState((prevState) => {
          return {
            tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
            value: '',
          };
        });
//아래가 원래의 코드이다
this.setState(()
  return {
    tries: [...this.State.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
    value: '',
});
/////////////////////////////////////////////////
//3-8) 숫자야구 Class -> Hooks 로 바꾸기 (두개가 같은 것이다. 구조분해를 쓰냐 안쓰냐의 차이이다)
//Try.jsx 에서
const Try = ({tryInfo}) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
};
//에서 {tryInfo} => props 로 바꾸면 그 아래도 props를 붙여야 한다
const Try = (props) => {
  return (
    <li>
      <div>{props.tryInfo.try}</div>
      <div>{props.tryInfo.result}</div>
    </li>
  );
};

// 1,2장 처럼 class로 먼저 만들고 Hooks로 바꾸는 연습을 꾸준히 하자



////////////////////////////////////////////////////////
//3-9) React Devtools
//props를 활용하다 보면 렌더링이 자주 일어나서 성능이 안좋아지는 부분이 있다

//크롬앱스토어에서 react 툴을 설치하면  리엑트의 props나 key들이 보이기 때문에 디버깅이 수월해진다

//배포판으로 바꿀땐 webpack.config.js 에서  앞서 한것들을 적용하고, process.env.NODE_ENV = 'production'; 도
//추가로 적어야 한다

//여담으로 다방 웹사이트는 리덕스로 보면 어떤 구조로 만들어졌는지 알 수 있다


////////////////////////////////////////////////////////
//3-10) shouldComponentUpdate
//input 필드에 값을 넣을때 state변수중 tries까지 전부 랜더링 되는것을 볼 수 있다
//즉 다른 컴포넌트까지 같이 렌더링 되는것이다
//입력할때마다 기존의 것까지 렌더링되고 있다
//(입력하면 브라우저 창윗 부분 색상이 변화함 빨강색이 될 수록 랜더링에 무리가 가는거임)

//리엑트는 setState()만 호출하면 state의 값이 바뀌든 안바뀌든 자동으로 render()가 실행된다 
//그래서 개발자가 원하는 경우에만 랜더링이 일어나도록 설정하는것이
//shouldComponentUpdate이다 

//예를 들면
shouldComponentUpdate(nextProps, nextState, nextContext){
  if(this.state.counter !== nextContext.counter){ //현재counter 가  입력한 counter와 다를때
    return true;         //리턴값을 true로 줘서 렌더링 시킨다
  }
  return false;          //리턴값을 false로 주면 렌더링이 안된다
}

//위의 것으로 렌더링에 있어 최적화를 시키는 연습을 하자!!

//여담으로 하나 알아두자 여기서 nextContext는 예를들어 아래처럼 props를 자식에게 전달할때 
//A -> B -> C -> D -> E -> F -> G 
//A -> F  로 props를 보내려면 중간에 B ~ E 까지 전부 props를 써야한다.. 
//(render()작업을 다 해야하고 코드도 많아진다) 그래서 context는 한번에 F로 넘겨주는 역할을한다
//이와 비슷한 일을 하는게 리덕스이다 (props의 진화형이 context이다)
 

//////////////////////////////////////////////////////////
//3-11)PureComponent와 React.memo
//위의 것들이 복잡하다면 PureComponent를 이용하면 된다
//PureComponent를 사용할때는 예전 객체나 배열을 가져오지 말고 새로운것을 가져오자! (아니면 비교가 안된다)
//PureComponent를 적용시킬때는 작은 단위의 Component로 쪼개서 props 처리하는게 좋다(계속 자식으로 쪼갠다)

//PureComponent는 앞에서 배운 shouldComponentUpdate를 자동으로 true, false로 나눠서 구현한 것이다
//사용방법은 그냥 
import React, {PureComponent} from 'react'; //리엑트에서 불러와서

class Test extends PureComponent{  //이렇게 클래스에 적용시키면 된다
  state = {
    counter:0,
    string:'hello',
    number:1,
    boolean:true,
    object:{},
    array:[],
  };
} 

//**PureComponent 는 state의 변수들이 number, string, boolean 같이 단순하면 state값을 비교하여 구분할 수 있지만
//[], {} 같이 배열, 객체구조일떈 구분을 어려워 한다(실무에선 데이터형태가 [],{} 이므로 shouldComponentUpdate를 쓴다)
//**꼭 PureComponent만 해당하는게 아니라 리액트가 객체일경우는 이전값을 얕은 복사 후 값을 바꿔야한다

//예를 들면 아래와 같이 원래 state 의 배열에 push를 사용하여 추가한다면.. 
onClick= () => {
  const array = this.state.array;
  array.push(1);
  this.setState({
    array:array,
  });
}
// 위의 메서드는 PureComponent가 인식을 하지 못한다 비교할 대상이 없어서 그렇다 아래와 같이 바꾸면 된다
onClick = () => {
    this.setState({
      array: [...this.state.array, 1],// 기존의 배열에 추가하는 방법이다
    });
}

//state{object:{a:1}} 에서  setState(object:{a:1}) 을 할 때 새로 랜더링하므로 state에 객체 구조를 안 쓰는게 좋다!
// 객체안에 배열이 있는 구조는 나중에 힘들어진다
//객체나 배열 모두 object:{a: 'b', c:'d'} 나 array:[5,4,6] 같은 간단한 구조로 만드는것이 좋다


//숫자야구에 적용시켜보자
//Try.jsx에 적용시켜보자 아래와 같이 적용시키면 웹브라우저에서 실행할때 아래 부분은 랜더링이 발생하지 않는다
//(다만 실무에선 Component가 복잡할 경우 PureComponent가 작동이 안될 수 있기 때문에 shouldComponentUpdate로
//조건을 넣어 원하는 부분만 렌더링을 다시 해준다)
import React, { PureComponent } from 'react';

class Try extends PureComponent {
  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

export default Try;

//아래는 Hooks 에서는 **memo를 사용하면 된다  
import React, {PureComponent, memo} from 'react';

const Try = memo({tryInfo} => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});



//////////////////////////////////////////////
//3-12) React.createRef 
//class에서 ref를 메서드를 안쓰고 createRef를 써서 만들어보자

//class에서 focus()를 사용하기 위해서 기존의 input 태그에 ref를 줬다
<input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
//그리고 아래처럼 ref에 들어갈 onRefInput 을 위로 뺐다
input; // this.input을 생성
onRefInput = (c) => {
  this.input = c;
};
//그리고 다른 메서드에서 focus()를 쓸때는 아래와 같이 사용하였다
this.input.focus();

//Hooks에서 focus는 아래와 같이 사용하였다
const inputEl = React.useRef(null);
inputEl.current.focus();


//이제 class에서 createRef를 사용해보자
//맨위에서 아래와같이 선언을 하고
import React, {Component, createRef} from 'react';
//그리고 기존의 input에 createRef()메서드를 가져온다
input = createRef();
//input 필드에는 아래와 같이 넣는다
<input ref={this.input} value={this.state.value} onChange={this.onChangeInput} />
//다른 메서드에서 focus()를 쓰는 방법이 Hooks와 같이 current 를 쓴다
input.current.focus();

//장점은 class와 hooks에서 focus()를 사용하는 방법이 같아 코드상 통일성을 가질 수 있다
//class상 메서드를 사용할때는 아래와 같이 원하는 방식으로 컨트롤 할 수 있다는게 장점이다
input; // this.input을 생성
onRefInput = (c) => {
  console.log('원하는거 가능'); //콘솔 로그를 넣어도 되고 함수화 하면 커스터마이즈할 수 있다
  this.input = c;
};


//////////////////////////////////////
//3-13 Props와 state 연결하기

//setState()는 render()를 실행시키고 render()는 setState()를 실행시키기 때문에 무한반복이 일어난다
//그러므로!! render(){ setState() } //render()안에 setState()를 넣으면 안된다

//**부모에서 받은 props는 바로 넣어서 수정하면 안된다(차라리 부모에서 변수를 수정해서 props로 보내야한다)
//**부모에게 받은 props를 자식이 수정하면 부모쪽 state도 문제가 생길수 있기 때문에 자식에서는 수정하지 않는다
//**하지만 자식에서 바꿔야할 상황이 되면 부모의 props를 자식의 state에 넣고 그 state를 바꾸면 자식에서도 바꿀수 있다

//우선 자식에 props를 넣는 잘못된 예를 먼저 보자(Try.jsx 이다))
const Try = memo(({tryInfo}) => {
  tryInfo.try = 'hello';        //여기서 처럼 자식에서 바로 수정하면 안된다(부모의 state도 문제가 생길 수 있다)
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  )
});

//이걸 앞에서 설명한 state를 넣어서 바꿔보자
//자식에서도 state를 사용해야 하므로 우선 react에서 useState를 가져온다
//Hooks일때 
import React,{memo, useState} from 'react'; //useState 추가

const Try = memo(({tryInfo}) => { //tryInfo 가 부모에게 받은 props이고 아래처럼 state를 만들어서 자식에서도 변경
  const [result, setResult] = useState(tryInfo.result); //이부분 추가해서 조정

  const onClick = () => {
    setResult('1');
  };

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onClick}>{result}</div>
    </li>
  )
})

//Class 일때 props 를 state로 만들고 싶을때
import React,{memo, useState} from 'react'; //useState 추가

class Try extends PureComponent{
  state = {                       //여기서 state를 설정해도 된다
    result: this.props.result,
    try: this.props.try,
  };

  render(){
    ~~~~
  }
}

//class 일때 constructor()를 사용하면 활용범위가 더 넓어진다(자바스크립트의 콜백함수기능)
class Try extends PureComponent{
  constructor(props){
    super(props);
    //다른문장
    const filtered = this.props.filter(() => {});

    this.state = {
      result: filtered, //이런식으로 result는 filter를 거쳐 원하는 데이터를 넣을 수 있다
      try: this.props.try,
    }
  }
}

