//5-1) 리액트 라이프사이클 소개
//클레스로 처리할때는 크롬브라우저 devtools 에서 하일라이트 체크하고 성능체크를 하고 Component로 할지
//PureComponent를 쓸지 결정해서 적용시키면 된다
//가위,바위,보의 이미지는 1개이다. 여기서 화면전환으로 바꿔서 바뀌게 보이는 것이다
//(rspCoords 는 1개 이미지의 좌표를 나타낸다)

//라이프사이클
//지금의 코딩은 컴포넌트가 client.jsx에 불려와서 화면에 랜더링 된다

//컴포넌트가 DOM에 붙는 순간에(render() 가 실행되면 리엑트가 render()를 DOM에 붙여준다) 
//특정한 동작을 할수있게 만들 수 있다

//@@컴포넌트의 라이프 사이클은 아래와 같은 순서로 실행된다@@

//1) 컴포넌트 랜더가 처음으로 성공적으로 실행되었을때 componentDidMount(){여기다 코드적기} 가 실행된다
//   (여기에 비동기 요청을 많이 한다)

//2) 컴포넌트가 랜더된 후 리랜더링 될때(state값이 변경될때) componentDidUpdate(){코드적기} 가 실행된다

//3) 컴포넌트가 제거되기 직전엔 componentWillUnmount(){여기다 코드적기} 가 실행된다
//   (부모 컴포넌트가 자식 컴포넌트를 없앨 수 있는데 이때 사용된다)
//   (1번의 비동기 요청 정리는 여기서 한다)

//@@클래스의 경우 라이프 사이클@@
//constuctor() -> render -> ref -> componentDidMount
//-> setState/props 바뀔때 -> shouldComponentUpdate(true일때만.. false일땐 안넘어감) 
//-> render -> componentDidUpdate
//부모 컴포넌트가 자식 컴포넌트를 제거할때 -> componentWillUnmount -> 소멸



//*클래스 안에서 setState()를 사용하면 무한랜더링이 되기 때문에 사용하면 안된다
// 화면바뀌는 것을 처리하기 위해 위의 라이프사이클 패턴을 이용하는 것이다!


/////////////////////////////////////////////////////////////
//5-2) setInterval과 라이프사이클 연동하기

interval;

componentDidMount(){  //컴포넌트의 첫렌더링때 실행 
  this.interval = setInterval(() => { 
    console.log('asdf');    //여기서 비동기 요청을 하면 componentWillUnmount()에서 비동기를 제거해야한다
  }, 1000);                 //리엑트는 자동으로 비동기를 제거해주지 않는다
}             //여기서 가위바위보 이미지를 setInterval로 돌릴것이다

componentDidUpdate(){

}

componentWillUnmount(){
  clearInterval(this.interval);  //클래스 내에서 변수를 만들어 여기서 비동기 제거를 해야한다
}   //(이번예시는 componentDidMount에서만 요청을 했지만 componentDidUpdate에서도 비동기 요청을 할 수 있다)
    //(자식컴포넌트가 있을때 반드시 여기서 제거해야 메모리누수문제가 없어진다!!)

//꼭 componentDidMount() 안에서 setInterval을 돌릴 필요는 없다 하지만!!
//componentWillUnmount() 안에서 비동기 정리를 해줘야 한다


///////////////////////////////////////////////////////
//5-3) 가위바위보 게임 만들기
// 코드를친다





///////////////////////////////////////////////////////
//5-4) 고차 함수와 Q&amp;A

//리엑트 패턴 중 하나!!(고차함수 패턴) (순서가 중요하다)
//랜더링 부분에서 onClick메서드 안에 함수를 호출하는 메서드가 들어있다면 
<button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>

//아래처럼 그 함수의 메서드에 () => 부분을 넣고, 
onClickBtn = (choice) => () => {    //() => 를 넣는게.. 쌈빡하다

//기존의 랜더링 부분은 아래와 같이 () => 부분을 뺼 수 있다
<button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>


//만약 코드에서 setState()가 연달아 3개 있어도 리엑트는 랜더링을 1번한다 setState()-랜더링-setState()
//방식으로 처리하진 않는다


//@고차함수의 사용
function repeatedly(times, fun){
  return [...Array(times).keys()].map(fun)
}

repeatedly(3, () => 'foo');  // ['foo', 'foo', 'foo']
repeatedly(3, (i) => `foo${i}`);  // ['foo0', 'foo1', 'foo2']

function repeatUntil(fun, check, seed){
  let ret = [],
      result = fun(seed);
  while(check(result)){
    ret.push(result);
    result = fun(result);
  }
  return ret;
}

repeatUntil(
  n => n + n,
  n => n <= 1024,
  1,
); // [ 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024 ]
//(10) [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]



///////////////////////////////////////////
//5-5) Hooks와 useEffect
//Hooks는 라이프사이클이 없지만 비슷하게 흉내낼 수 있다


//class에서 쓰였던 아래의 코드들을 Hooks로 변환해야하는데 이때 쓰이는 것이 useEffect()이다
componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 해요
  this.interval = setInterval(this.changeHand, 100);
}
componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 해요
  clearInterval(this.interval);
}

//맨위 'react'에서 useEffect를 가져와서 메인 함수안에 넣는다
//useEffect가 componentDidMount,componentWillUnmount 의 역할을 대신 해줄 것이다
//(1:1대응은 아니다)
//아래의 코드를 보자

useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
  console.log('다시 실행');
  interval.current = setInterval(changeHand, 100);
  return () => { // componentWillUnmount 역할
    console.log('종료');
    clearInterval(interval.current);
  }
}, [imgCoord]);  //componentDidUpdate와 대충 비슷한 역할을 한다
//2번째 인자인 배열에 바뀌는 값을 넣어줘야 useEffect가 계속 실행된다
//2번째 인자인 배열에 저 함수를 넣지 않는다면 클로저문제가 발생하는것처럼 실행이 안된다(그림이 안바뀜)
//(처음한번만 실행된다)

//**배열에는 꼭!! useEffect를 다시 실행하는 값만 넣어주자
//(예를들면 이미지를 바꾸는데 관련없는 state를 넣으면 이상해진다)

//@@** 아래 개념 햇깔리지 말자
//위의 코드에서 콘솔로그에 다시실행,종료를 찍었는데 랜더링 함수만 실행되는 클래스와 달리
//Hooks는 함수형이기 때문에 전체함수가 실행되어 다시실행, 종료가 계속 반복되는것을 볼 수 있다
//그러므로 interval.current = setInterval(changeHand, 100) 가 class에서 componentDidMount역할과는 다르다

//Hooks에서 useEffect(,[])는 []값이 있다면 setInterval() -> clearInterval -> setInterval ... 계속 반복된다
// [] 값이 아무것도 없으면 처음만 실행하고 뭐가 바뀌든 실행하지 않는다 



//////////////////////////////////////////////////////////////////////////
//5-6) 클래스와 Hooks 라이프사이클 비교
// Hooks의 경우
// useEffect()는 붙여서 여러번 사용할 수 있고 state마다 다른 효과를 줄 수 있다
// class의 경우
// ComponentDidMount나 ComponentDidUpdate에서 모든 state를 조건문으로 분기 처리한다

//useEffect()는 화면이 랜더링 되고 난 후 실행된다
//useLayoutEffect() 는 화면이 리사이징되기 전에 실행된다(화면의 layout 변화를 감지한다)

//class는 가로로 보고, Hooks는 세로로 봐라
//                        result, imgCoord, score
// componentDidMount
// componentDidUpdate
// componentWillUnmount
//                      useEffect,useEffect,useEffect

//위의 표처럼 class 처리는 각 메서드가 state를 한번에 처리 가능!
//           Hooks 처리는 state를 각각 처리 가능!(state를 2개 이상 처리하는것도 가능하다!!)
//componentDidMount 는 result, imgCoord, score를 처리
//componentDidUpdate는 result, imgCoord, score를 처리
//componentWillUnmount는 result, imgCoord, score를 처리
//useEffect는 result를 처리 
//useEffect는 imgCoord 처리
//useEffect는 score 처리

//클래스에서 state를 한번에 처리한다면
// componentDidMount() {
//   this.setState({
//     imgCoord: 3,
//     score: 1,
//     result: 2,
//   })
// }

//Hooks에서 state를 구분해서 나눠서 처리할 수 있다
// useEffect(() => {
//   setImgCoord();
//   setScore();
// }, [imgCoord, score]); //원하는 state만 골라서
// useEffect(() => {
//   setResult();
// }, [result]);





///////////////////////////////
// () => 부분의 함수 리턴 이해
//() => 를 제거하고 로그를 찍어보면 너무 많은 리 랜더링을 한다고 뜬다
onClickBtn = (choice) => () => { //아래setState()안에서() =>{} 내부함수가 들어갔기 때문에 
    const {imgCoord} = this.state; //onClickBtn는 함수가 아니라 함수를 실행한 결과물이다
    clearInterval(this.interval); //누가이기는지 잠시 멈춰서 확인시킴
    const myScore = scores[choice]; //내가 선택한 가바보
    const cpuScore = scores[computerChoice(imgCoord)]; //컴터가 선택한 가바보
    const diff = myScore - cpuScore;
    if(diff === 0){//가바보 비긴 경우
      this.setState({
        result:'비겼습니다!',
      });
    }else if([-1,2].includes(diff)){ //가바보를 통한 이긴 경우
      this.setState((prevState) => {
        return {
          result: '이겼습니다',
          score: prevState.score + 1,
        };
      });
    }else{//그외... 가바보 진 경우
      this.setState((prevState) => {
        return {
          result:'졌습니다',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand,100);
    }, 1000);
  };

//////////////////////////////
//이해를 돕기 위한 코드

//고차함수의 이해
var buyCar = (carName) => () => { // () => 로 고차함수를 추가했기 때문에  
  console.log('내가 구매한 차는 ' + carName + '입니다.');
};

buyCar('소나타');
//아래가 출력됨
// () => {  
//   // "내가 구매한 차는 sonata입니다." 출력
//   console.log('내가 구매한 차는 ' + carName + '입니다.');
// }

buyCar('소나타')();
//아래가 출력됨
//내가 구매한 차는 소나타입니다.

car = () => console.log('gogo');
car;//() => console.log('gogo')
car(); //gogo