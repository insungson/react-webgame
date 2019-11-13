import React, {Component} from 'react';
import Ball from './Ball';

function getWinNumbers(){
  console.log('getWinNumbers');//반복실행되는지 확인하기 위한 로그
  const candidate = Array(45).fill().map((v,i) => i + 1);
  //Array(45)는 45갯수의 배열 생성, 
  //fill()은 배열에 채워넣음,( Array(45).fill() 는 [undefined,..가 45개 채워짐]) 
  //(Array(45).fill(0, 2, 4)는 숫자0을 인덱스 2~4까지 채워넣음)
  //map()은 배열 인덱스 + 1을 해서 숫자가 생성
  const shuffle = [];
  while(candidate.length > 0){
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }//splice(시작할인덱스,제거할갯수,넣고싶은것) 
  //var months = ['Jan', 'March', 'April', 'June'];
  //months.splice(1, 0, 'Feb');  // Array ['Jan', 'Feb', 'March', 'April', 'June']
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
  //sort()를 사용하려면 (p,c) => p-c 를 사용해야 한다 그렇지 않으면 아래와 같이 정렬이 된다
  //var array1 = [1, 30, 4, 21, 100000];
  //[1, 100000, 21, 30, 4] 그냥 sort() 를 쓸때
  //[1, 4, 21, 30, 100000] sort((p,c) => p-c) 를 쓸때
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),// 당첨 숫자들 6개 + 1(보너스)
    winBalls: [], //당점 숫자 6개
    bonus: null,// 보너스 공
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    console.log('runTimeouts');
    const {winNumbers} = this.state;
    for(let i = 0; i < winNumbers.length -1; i++){
      //for문에 let을 쓰면 setTimeout()이 들어가 비동기함수가 들어가도 클로저 문제가 발생하지 않는다
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return{
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  }

  componentDidMount(){
    console.log('didMount');
    this.runTimeouts();
    console.log('로또 숫자를 생성합니다.');
  }

  componentDidUpdate(prevProps, prevState){
    console.log('didUpdate');
    if(this.state.winBalls.length === 0){
      this.runTimeouts();
    }
    if(prevState.winNumbers !== this.state.winNumbers){ //기존의 winNumbers가 변할때마다 실행
      console.log('로또 숫자를 생성합니다.');
    }
  }

  componentWillUnmount(){
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    console.log('onClickRedo');
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render(){
    const {winBalls, bonus, redo} = this.state;
    //<Ball key={v} number={v} />)} 처럼 반복문을 기점으로 컴포넌트를 분리한다
    return (
      <>
        <div>당첨숫자</div>
        <div id='결과창'>
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus}/>}
        {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
      </>
    );
  }

}

export default Lotto;