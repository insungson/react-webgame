//4-1) React 조건문
//리엑트에서는 for, if문을 사용 못한다 (그래서 배열을 만들고 map을 써서 for문을 대체한 것이다)
//리엑트의 render(){return()} return안에서 즉 jsx안에서 if for을 쓸수 없다
//리엑트는 자바스크립트 역할만 담당하기 때문에 css를 헤드에 넣어도 되고, 아님 따로 분리하여 src로 가져와도 된다
//리엑트에서 조건문은 삼항연산자를 사용한다

//아래의 예시를 보자
import React,{Component} from 'react';

class ResponseCheck extends Component{
  state = {
    state : 'waiting',
    message : '클릭하세요',
    result:[],
  };
  onClickScreen = () => {};
  renderAverage = () => {       //이렇게 함수르 빼면 아래가 깔끔해진다
    return this.state.result.length === 0 
      ? null
      : <div>평균시간: {this.state.result.reduce((a,c) => a + c) / this.state.result.length}</div>
  };
  render(){
    return (
      <>
        <div
          id='screen'
          className={this.state.state}
          onClick={this.onClickScreen}>
          {this.state.message}
        </div>
        1번 방법: 삼항연산자
        {this.state.result.length === 0 
          ? null
          : <div>평균시간: {this.state.result.reduce((a,c) => a + c) / this.state.result.length}</div>}
{/*false, undefined, null은 jsx에서 태그없음을 의미하므로 위에서 그것을 이용한 삼항 연산자로 div 항목을 나타냈다   */}
        2번 방법: 보연산자
        {this.state.result.length !==0 
          && <div>평균시간: {this.state.result.reduce((a,c) => a + c) / this.state.result.length}</div>}
        {/* 보연산자를 쓰려면 위와 같이하면 된다 */}
        3번 방법: if문사용
        {(() => {
          if(result.length === 0){
            return null;
          }else{
            return <>
              <div>평균시간: {result.reduce((a,c) => a + c) / result.length}ms</div>
              <button onClick={onReset}>리셋</button>
            </>
          }
        })()}
        {/* {}안에서는 자바스크립트를 사용할 수 있기 때문에 () => {} 빈 함수를 만들고 그 안에서 if문을쓰면 된다
        그리고 IIFE 처럼 즉시 함수를 쓰면 바로 실행된다 하지만.. 코드가 지저분해진다 */}
        
        4번 방법: 1번의 코드를 변수로 따로 뺌
        {this.renderAverage()}
        {/* 위처럼 함수로 빼면 깔끔해진다 */}
      </>
    )
  }
}





//////////////////////////////////////////////////
//4-2)setTimeout 을 넣어 반응속도 체크
//클릭 게임의 로직을 onClickScreen 메서드에 짤 것이다.
//state는 const {state, message,result} = this.state;  로 구조화처리하면서 시작하면 편하다
//timeout 변수를 따로 뺀 이유는 clearTimeout(timeout)을 이렇게 사용해서 setTimeout()을 종료시키기 위함이다
//startTime, endTime을 밖으로 빼면 2개의 값이 변해도 랜더링 되지 않는다 
//(state에 넣으면 값이 변할때마가 같이 렌더링 된다)


///////////////////////////////////////////////////////
//4-3)성능체크와 Q&amp;A (리셋버튼 추가)
//브라우저에서 react부분 설정아이콘 클릭해서 Highlight Updates 를 클릭해서 랜더링할때 쓸데없는 랜더링 부분을 체크할
// 수 있다

//성능체크시 리셋 버튼을 누르면 스크린까지 같이 변하기 때문에 리셋버튼에 대한 코드는 다른 Component에 분리하는게 좋다
//예를들면 여기서는 onClickScreen() 과  renderAverage() 를 서로 다른 Component에 분리해준다

//여담으로 state값 변경에 따라 클래스는 랜더만 실해되지만  함수형인 Hooks는 전체가 실행되기 때문에 함수형은 랜더링에
//대해 최적화를 잘 해야 한다



////////////////////////////////////////////////////////
//4-4)반응속도체크 Hooks로 전환하기
//지금까지 class -> Hooks 바꾼것처럼 바꾸면 되는데... this.timeout, this.startTime, this.endTime 이 좀 다르다
//클래스에서 this.변수 처리한것들은 useRef()로 처리하면 된다
//그리고 함수 내에서는 this.변수  ->  변수.current   로 바꿔준다
//useRef는 무조껀 변수.current  로 접근한다!!

//그렇다면 useState() 와 useRef()  의 차이는 무었일까?
// 값이 변할때 useState()는 return 부분이 다시 실행(렌더링)되지만 
//            useRef()는 return 부분이 다시 실핼되지 않는다 
//즉!! 값이 바뀌어도 렌더링 시키고 싶지 않은 부분은 useRef()를 사용하면 된다
//(값은 바뀌지만 화면에는 영향을 미치고 싶지 않을때 useRef()를 사용한다)
//(ref는 DOM에 직접 접근한다)

////////////////////////////////////////////////
//ref(render메서드 안에 만들어진 DOM노드, React요소들에 접근하기 위해 사용)
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
///////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//4-5) return 내부에 for과 if 쓰기
// {(() => { return 코드 })()}

//위와 같이 IIFE를 사용해서 즉각적인 함수 사용이 가능하다