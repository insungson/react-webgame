import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
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

const Lotto = () => {
  const lottoNmbers = useMemo(() => getWinNumbers(),[]);//[]값이 안바뀌면 getWinNumbers가 1번 실행된다
  const [winNumbers, setWinNumbers] = useState(lottoNmbers);//기존은 getWinNumbers가 바로 들어감
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);// 보너스 공
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log('useEffect');
    for(let i = 0; i < winNumbers.length -1; i++){
      //for문에 let을 쓰면 setTimeout()이 들어가 비동기함수가 들어가도 클로저 문제가 발생하지 않는다
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);

  useEffect(() => {
    console.log('로또 숫자를 생성합니다.'); //업데이트에 따른 부분을 수행하기위한 코드
    // return () => { //리턴은 ComponentWillUnmount 에 해당하는 부분
    //   cleanup
    // };
  }, [winNumbers]);

  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  },[winNumbers]);

    //<Ball key={v} number={v} />)} 처럼 반복문을 기점으로 컴포넌트를 분리한다
    return (
      <>
        <div>당첨숫자</div>
        <div id='결과창'>
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus}/>}
        {redo && <button onClick={onClickRedo}>한번 더!</button>}
      </>
    );
}

export default Lotto;