import React from 'react';
//{useState, useEffect} 가 들어간게 Hooks 이다. 
//아래의 코드는 Hooks가 아닌 그냥 함수 컴포넌트이다(state를 안쓰면 함수형 컴포넌트가 좋다)

//가장 자식인 컴포넌트는 PureComponent나 Memo를 써도 된다
let background;
const Ball = React.memo(({number}) => {
  //const {number} = this.props;    //이 코드 대신에 위에 number를 넣어도 된다 
  //memo(()) 컴포넌트안에 컴포넌트는 HOC(하이오더컴포넌트)라고 부른다
  if(number <= 10){
    background = 'red';
  }else if(number <= 20){
    background = 'orange';
  }else if(number <= 30){
    background = 'yellow';
  }else if(number <= 40){
    background = 'blue';
  }else{
    background = 'green';
  }
  return (
    <div className='ball' style={{background}}>{number}</div>
  )
});
// 위의 <div className='ball' style={{background}}>{number}</div> 에서
// 아래와 같이 객체로 묶는다면 {mystyle} 로 {} 한번만 쓰면 되지만.. color: "white"을 바로 사용하려면
// {{color: "white"}} 처럼 {{}} 두번 써야한다
// const mystyle = {
//   color: "white",
//   backgroundColor: "DodgerBlue",
//   padding: "10px",
//   fontFamily: "Arial"
// };
export default Ball;