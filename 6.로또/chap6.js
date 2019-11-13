//6-1) 로또 추첨기 컴포넌트
//setTimeout을 사용하면서 Hooks에서 useCallback, useMemo를 사용해보자
//클래스 코드를 치자

//가장 자식인 컴포넌트는 PureComponent나 Memo를 써도 된다 (데이터를 담기보단 화면 역할을 하기 때문이다)

//ball.jsx는 Hooks가 아니다! Hooks는 useState, useEffect를 사용한 것이다
//이건 그냥 함수 컴포넌트이다 (state를 안쓰면 그냥 함수 컴포넌트를 사용하자)

////////////////////////////////////////////////////
//6-2) setTimeout 여러 번 사용하기
//주의 할 점은 클래스 안에 setTimeout() 같은 비동기 함수 가 있을때 종료를 안하고 부모컴포넌트가 해당 클래스 
//컴포넌트를 없앴는데 setTimout() 이 남아있으면 메모리가 낭비되기 때문에 반드시!! ComponentWillUnmount()에서
//제거해주자!!
//(예를 들면 Loto 클래스 부모 컴포넌트가 Loto클래스 컴포넌트를 제거할때 Loto클래스 안에 있는 setTimeout()를
//제거하지 않는다면 컴터메모리를 낭비하게 된다 그래서 ComponentWillUnmount에서 반드시 제거해야한다)



/////////////////////////////////////////////////////
//6-3) componentDidUpdate

//componentDidUpdate는 state의 이전과 현재값을 비교하여 업데이트하고 싶은 상황을 잘 처리해야한다
//setState()가 실행될때마다 componentDidUpdate가 계속 실행된다
//그래서!! 조건문을 넣어서 state값을 바꿔야 한다
componentDidUpdate(prevProps, prevState) {
  console.log('didUpdate');
  if (this.state.winBalls.length === 0) { //reDo버튼을 누를때 []이 없으므로 
    this.runTimeouts();
  }
  if (prevState.winNumbers !== this.state.winNumbers) { 
    console.log('로또 숫자를 생성합니다.');
  }
}
//위의 조건문에는 onClickRedo()에서 state값이 초기화일때 3개중 아무거나 골라서 조건문을 만들면 된다


//라이프사이클에 해당하는 함수에 console.log()를 넣었으니 실행하며 콘솔창을 보고 과정에 대해 알아보면 이해가 쉽다

//자식컴포넌트(함수 컴포넌트(ball.jsx))에 PureComponent, memo를 넣자


///////////////////////////////////////////////////////
//6-4) useEffect로 업데이트 감지하기
//*여담이지만 state가 안들어갔다면 따로 밖으로 뺴자 
//(예를 들면 LotoClass.jsx의 getWinNumbers()함수처럼 class밖으로빼자)

//class 부분은 그냥 hooks로 바꾸면 되는데 componentDidUpdate ,componentDidMount,componentWillUnmount 
//부분을 useEffect()를 써서 Hooks로 바꾸는게 어렵다

//일단 useEffect에 runtimeout을 넣는다
//빈배열만 있을땐 componentDidMount와 똑같다 배열에 인자가 있으면 componentDidUpdate 까지 수행한다
//배열은 state의 변화하는 부분인 redo, bonus, winBalls를 넣으면 componentDidUpdate의 역할을 한다
//여기서는 배열에 class에서 componentDidUpdate의 발동 조건을 넣는다
//return 부분이 componentWillUnmount를 수행하는 자리이다
useEffect(() => {
  console.log('useEffect');
  for (let i = 0; i < winNumbers.length - 1; i++) {
    timeouts.current[i] = setTimeout(() => { //여기서는 timeouts.current 배열의 요소가 바뀌는것이다
      setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);    //timeouts가 바뀌는것이 아니다
    }, (i + 1) * 1000);
  }
  timeouts.current[6] = setTimeout(() => {
    setBonus(winNumbers[6]);
    setRedo(true);
  }, 7000);
  return () => {  //return 부분이 componentWillUnmount를 수행하는 자리이다
    timeouts.current.forEach((v) => {
      clearTimeout(v);
    });
  };
}, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일


//배열 부분에 기존의(class) 조건인 this.state.winBalls.length === 0 를 넣으면 setWinBalls가 두번 실행되어
//처음에 같은 숫자가 2번 나온다. 하지만  timeouts.current = []; 은 timeouts 배열 자체가 바뀌는것이라  
//1번만 실행된다 

//클래스와 훅스가 코드상 차이가 좀 있다.. 그러므로 잘 생각해서 바꿔야 한다


/////////////////////////////////////////////////
//6-5) useMemo와 useCallback
//Hooks의 특징 때문에 getWinNumbers 함수가 여러번 실행된다 (메모리 사용량 많이 가져감)
//(여기서는 숫자state가 바뀔때마가 계속 실행된다)
//getWinNumbers가 많은 시간이 소요되는 함수라면 큰 문제가 발생된다

//useMemo를 사용하여 한번 사용된 함수가 다시 사용되지 않게 캐싱 작업을 해줘서 반복을 없애자

//useMemo: 복잡한 함수 결과값을 기억(함수의 리턴값을 기억)
//useRef: 일반 값을 기억

//useCallback: 함수들 자체를 기억
//(사용은 함수 자체를 생성하는것이 오래걸릴때 함수자체를 기억하여 사용한다)
//useEffect 처럼 함수 내의 배열에 인자가 들어가야 새로시작한다
//생산성을 위해 배열에 아무것도 안넣으면 같은 값을 리턴한다
//(자식컴포넌트에 함수를 넘길때 매번 새로운 함수가 생성되기 때문에 useCallback을 사용해야 한다)
//(useCallback을 안쓰고 자식컴포넌트에게 넘기면 새로운 함수가 실행되어 계속 바뀐 props를 자식컴포넌트에선
//매번 리랜더링을 하기 때문에 성능에 무리가 간다) (부모에게 받은 함수가 계속 같게 만들어 랜더링 줄임)

//** Hooks는 순서가 중요하다 함수형 언어이기 때문에 노드처럼 순서를 잘 맞춰야 한다


//////////////////////////////////////////////
//6-6) Hooks에 대한 자잘한 팁들
//Hooks를 설정할때 순서를 지켜야 하고 실행순서도 지켜야 하는데 만약 조건문을 넣는다면 순서가 바뀌기 때문에
//문제가 생긴다 (if문 같은것으로 실행이 안되는 순번도 생기면 에러가 생겨서 조건문은 넣지 말자)

//useEffect, useMemo, useCallback 안에서 useState()를 쓰면 안된다

//state별로 useEffect를 state별로 나눠서 사용해도 된다

//class에서 componentDidUpdate에서 조건문으로 나눈것을 Hooks에서 useEffect는 조건문 대신 그만큼 사용하면된다


//Hooks에서 ajax를 componentDidUpdate만 사용하고, componentDidMount는 사용하고 싶지 않다면 
//아래와 같은 패턴을 쓰자
const mounted = useRef(false);
useEffect(() => {
  if(!mounted.current){
    mounted.current = true;
  }else{
    //ajax 사용
  }
}, [바뀌는값])




//////////////////////////////////////////////////
//https://www.w3schools.com/react/react_css.asp
//React에서 css 사용방법
// 
//1) 객체로 스타일링을 묶을때는 {} 1번만 사용하지만 
class MyHeader extends React.Component {
  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };
    return (
      <div>
      <h1 style={mystyle}>Hello Style!</h1> //객체를 한번에 넣어서 처리해도 된다
      <p>Add a little style!</p>
      </div>
    );
  }
}

//2) 스타일링 속성을 사용할때는 {{}} 2번 사용한다 (객체로 묶어줘야 한다)
// 그리고 원래 css속성인 background-color: 을 사용하지 말고... backgroundColor 처럼 
// 카멜표기법(두번째 대문자사용)을 사용해야한다
class MyHeader extends React.Component {
  render() {
    return (
      <div>
      <h1 style={{backgroundColor: "lightblue"}}>Hello Style!</h1>  //2번 사용
      <p>Add a little style!</p>
      </div>
    );
  }
}

//3) css 파일을 불러올때는 객체처럼 쓰면 된다 (카멜 표기법 필요없음)

//mystyle.module.css 파일의 코드가 아래와 같고
.bigblue {
  color: DodgerBlue;
  padding: 40px;
  font-family: Arial;
  text-align: center;
}

//App.js 파일의 코드가 아래와 같을때 (위의 css 파일을 불러옴)
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './mystyle.module.css'; 

class Car extends React.Component {
  render() {
    return <h1 className={styles.bigblue}>Hello Car!</h1>;
  }
}

export default Car;

//styles.bigblue 여기처럼 사용하여 클래스이름을 바꿔서 css를 적용시켜도 된다