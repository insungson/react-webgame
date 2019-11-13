//7-1. 틱택토와 useRedcuer 소개
//틱택토 : 3목이다(5목이 아닌 3목)
//useRedcuer :  리엑트에서 리덕스 부분을 가져온 것이다 
//              (리덕스와 비슷한 props를통해서 컴포넌트로 전달하는게 아닌 컴포넌트간 데이터를 공유하게된다)
//              (비동기 부분 처리를 위해 결국 리덕스를 사용해야한다)
//테이블 전체, tr, td를 컴포넌트라고 생각하고 코드를 짤 것이다 
//(td<tr<table)의 범위로 구성된다 그러므로 틱택토는 table을 불러오고 table은 tr을 불러오고 tr은 td를 불러온다
//앞에서 얘기한것처럼 작동되는 부분을 잘게 쪼개서 컴포넌트로 바꾸고 생각하자

//실제로 클릭하는건 td 이지만...  td -> tr -> table -> 틱택토 을 거쳐 state값을 연결해야한다
//(위의 관계로 연결되므로 연결시 상위 태그로 감싸야 한다)(예를 들면 tr은 <table><tr/></table> 이렇게 감싼다)
//useReducuer 는 useState, setState로 바뀌는 state값을 하나로 통일 시켜준다

//다음장에서 배우는 context API는 컴포넌트간 state 데이터 변화를 props가 아닌 
//const {변수} = useContext(createContext로만든객체)   로 쉽게 가져다 쓸수 있게 만든거고 
//useReducer는 기존의 useState대신 reducer로 state 데이터를 바꾸는 역할을 해준다 

import React, { useReducer } from 'react';
import Table from './Table';

const initialState = {
  winner: '',  //승자
  turn: 'O',   //사용자 턴(o,x)
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

const reducer = (state, action) => {  //state를 어떻게 바꿀지 적어준다

};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState); 
  //dispatch: 에 들어가는것은 액션이기 때문에 액션객체를 만들어주고 액션객체안에 action type, 데이터를 넣어
  //          reduce에 정의되어 있는 액션에 데이터를 넣고 호출하여 component를 작동시킨다
  //reduce: 함수로 state을 어떻게 바꿀지 결정
  //initialState: state 초기값
  const { tableData, turn, winner, recentCell } = state;    
  //useReducer(reducer, initialState)를 통해 state에 접근하기 때문에 위와 같이 구조분해처리한다
  
  //지금까지 해온것과 다르게 아래와 같이 정의하여 사용하지 않고 위에서 설정한다(2줄위)
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  //useState, setState는 개별 컴포넌트에서 데이터를 바꿀때 사용하고, 컴포넌트간 데이터를 공통으로 사용하는건
  //redux, mobx이다 (여기선 useReducer 사용)

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  )
};

export default TicTacToe;


/////////////////////////////////////////////////////////////////
//7-2) reducer, action. dispatch의 관계
//컴포넌트에 들어가는 함수들은 전부 useCallback()을 쓴다 (자식으로 props 데이터를 보낼때 쓸때없는 리랜더링 줄임)

dispatch({ type: SET_WINNER, winner: 'O' }); //이게 액션 객체인것이다 
//(나중엔 return으로 {}를 불러와 액션메서드로 만든다)
//객체({}로 감싸서 객체화한다) 안에서 type으로 액션을 고르고 reducer에 정의된 액션에서 state를 변경해준다
//액션을 dispatch 할때마다 reducer 에서 정의한 액션에 winner:'0' 데이터가 들어간 부분이 실행된다 (아래부분)

const reducer = (state, action) => { 
switch (action.type) { 
  case SET_WINNER:
    // state.winner = action.winner; 이렇게 하면 안됨. (initial state를 직접 바꾸면 안된다)
    return {        //기존 state(initial state)를 바꾸는게 아니라 기존것을 복사한 객체에서 state 값을 바꾼다
      ...state, //객체를 복사해서 ({}로 감싼건 객체로 만들어서 그 객체를 return 한다)
      winner: action.winner, //값을 바꾼다

//위와 같이 switch문을 이용하여 action을 type별로 구분하여 return을 통해 state를 변경한다
//dispatch({ type: SET_WINNER, winner: 'O' });  의 type, winner는 앞에 action을 붙인다
//**reducer의 기본 원리는 기존 state를 바꾸는게 아니라 기존 state를 복사한 객체에서 state를 변경하여 return한다


//작동원리                              /////////
                                       //이벤트//
//////////  dispatch //////////        /////////          
//state //  <<----   //action//
//////////           //////////
//                   |
//                   |
//                   v
//                 reducer


//이벤트가 발생할때 state는 직접 수정하면 안된다
//그래서 action을 만들고  action을 dispatch 해서 state에 접근한다
//state를 어떻게 바꿀지에 대한 처리는 reducer에서 한다

//state를 바꾸고 싶다 -> 이벤트 발생 시 action을 dispatch 해서 state를 바꾼다
//state를 어떻게 바꿀지는 reducer에서 정한다


/////////////////////////////////////////////////////////////////
//7-3) action 만들어 dispatch 하기
// td에 onClick 이벤트를 발생시켜 클릭한 component에 대해 작동시켜야 한다
tableData: [
  ['', '', ''], 
  ['', '', ''],
  ['', '', ''],
],
//테이블 데이터 구조가 위와 같기 때문에 Table.jsx에서 아래의 i 는 줄을(tr) 나타내고 이중배열의 첫번째 배열
{Array(tableData.length).fill().map((tr, i) => (
  useMemo(
    () => <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />,
    [tableData[i]],
  )
))}
//Tr.jsx에서 아래의 i 는 가로의 한칸한칸을(td) 의미한다
{Array(rowData.length).fill().map((td, i) => (
  useMemo(
    () => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
    [rowData[i]],
  )
))}

//TicTecTo.jsx 에서 액션에 대한 정의를 하고 아래와 같이 export로 빼서 다른 곳에서 사용할 수 있게 만들자
//문자열을 변수화 하는 이유는 오타에 대한 에러 발생을 줄이기 위해서이다 (switch문 사용시 에러줄임)
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';


//action이 발생할때 tableData의 배열안에 o,x(turn state임) 를 넣어주면 된다
tableData: [
  ['', 'o', ''],  turn state를 넣는다(o,x)
  ['', '', 'x'],  
  ['', '', ''],
],

//TicTecTo.jsx 의 reducer 부분에서 액션의 정의를 해준다
//기존의 state는 불변성이기 때문에 (...기존state객체)  를 사용하여 기존 객체를 복사해준다
//기존 state객체를 새로운 state객체로 바꾸는 것이다!
case CLICK_CELL: {
  const tableData = [...state.tableData]; //기존의 table을 얕은 복사를 해준다
  tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
  //객체가 있으면 얕은 복사를 해준다고 생각하자! (이중배열이기 때문에 위까지만 얕은 복사를 한다)
  tableData[action.row][action.cell] = state.turn;
  //테이블 데이터에서 원하는 부분만 불변성을 지키면서 바꾼것이다
  return {
    ...state,
    tableData,
    recentCell: [action.row, action.cell],
  };
}

//**리액트에서 state값을 바꿀때 불변성을 지켜야하기 때문에 객체의 복사기능을 사용해야한다
//아래의 예시를 살펴보자
const a = {b:1, c:2};
const b = a;
a === b; //true   
//a,b는 모두 같아버리기 때문에 리액트에서 불변성을 지키지 못한다
//a,b가 달라야 리액트에서 불변성을 가질 수 있다
//아래와 같이 바꿔보자
const c = {...a}; //객체 껍대기에 ...a 를 넣어 a를 복사한다
a === c; //false
c//{b:1, c:2}
//c와 a는 값이 같지만 둘은 다르다 그래서 리액트에서 불변성을 지킨다

//배열도 마찬가지다
const d = [1,2,3];
const e = d;
e === d; //true
//둘이 완전 같아지기 때문에 리액트에서 불변성을 지키지 못한다
//아래와 같이 바꿔보자
const f = [...d];
f//[1,2,3]
f === d; //false
//f,d의 값은 같지만 둘은 다르다! 그래서 리액트에서 불변성을 지킨단


//TicTecToe.jsx에서 reducer() 안에 dispatch의 action 부분들을 정의한다(api 느낌))
//Td.jsx에서 이벤트 발생 시 dispatch를 사용해서 state를 바꾸는데 TicTecToe.jsx 안의 reducer에서 정의한
//dispatch 부분들을 가져와야 한다
//부모-자식 관계에 의해 return 부분에서  TicTecToe -> Table -> Tr -> Td 순서로 dispatch를 보내야 한다 
//(나중에 ContextAPI로 어렵게 연결안하고 한번에 연결할 수 있다)

//dispatch말고 다른 데이터들도 넘겨주자


////////////////////////////////////////////////////////////////
//7-4) 틱택토 구현하기
//한번 클릭시 다시는 안변하게 만들어야 하고, 3목을 먼저한 승자에 대한 판별도 해줘야 한다
//

//**dispatch에서 state를 바꾸는건 비동기방식이다 
//리덕스는 동기적으로 바뀌는데 useReducer는 state가 비동기적으로 바뀐다
//앞에서 배운 리엑트의 state도 비동기적으로 바뀐다
//**비동기적 state를 처리하기 위해선 useEffect를 사용해야 한다!! 
//(비동기적인 것을 처리하기 위해선 항상 useEffect를 쓴다!)

//TicTecToe.jsx에서 useEffect()를 사용하는데 사용하는 조건은 테이블의 td 데이터가 변할때 이므로 
//state.tableData를 []에 넣는다 
//그리고 td.jsx에서 클릭했을때 td의 값으로 경우의 수를 따져 승패 구분을 하는 코드를 짜자
//아래의 코드는 마지막 클릭한것으로 코드를 짜야 경우의 수를 따지는코드에서 필요한 경우만 따지기 때문에 
//성능이 좋아진다
//Td.jsx에서 클릭한 데이터를 기준으로 아래의 로직을 구분!
const [row, cell] = recentCell;//이걸 넣는 이유는 마지막 클릭한 td를 기준으로 아래의 경우수를 따지면 
if (row < 0) {              //더 효율적이기 때문이다
  return;
}
//useEffect()는 기본적으로 처음 시작할때도 자동으로 시작되기 때문에 초기 recentCell: [-1, -1], 값을 -1로
//해두고 위의 코드에서 if (row < 0) {  조건을 넣어 처음 시작할때는 useEffect()가 실행되지 않도록 해준다
//(처음 경우엔 승자를 구분하면 안되도록 방지)

//reducer 안의 case CLICK_CELL 에서도 테이블 데이터, 마지막 클릭한 td를 따로 기억해두자


//*최종정리*\\
//지금까지 Hooks에선 state,setState처럼 구분해서 state값을 바꿨다
//하지만 이렇게하면 state가 100개이상으로 많아질땐 변수가 너무 복잡해진다(컴포넌트별로 적으면 했깔린다)
//그래서 state를 한번에 모으고 setState도 한번에 해결할 수 있는 dispatch를 사용하기위해 
//useReducer를 사용하는것이다 (원래는 리덕스의 개념인데 리액트가 따라했다)
const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
//state는 하나로 모아두고 이를 action을 통해서만 바꾼다
//액션은 dispatch({ type: SET_WINNER, winner: 'O' });  에서 { type: SET_WINNER, winner: 'O' }처럼
//{} 객체가 action이고 action의 type은 action의 이름이다 나머지는 그냥 데이터들이다

//그래서 action을 dispatch하면  action이 실행이 된고 action들은 reducer에 정의한것처럼 실행되어 
//state들을 바꾼다 그리고 state를 바꿀때는 불변성이 항상 중요하다!!

//리덕스: 동기적으로 바뀐다
//useReducer: 비동기적으로 바뀐다


///////////////////////////////////////////////////////////////////////
//7-5) 테이블 최적화하기
//크롬 react 툴을 사용하여 불필요한 component 변화를 제거해주자

//Td.jsx에서 td를 클릭하는 이벤트를 발생시킬때 다른 9칸도 같이 실행되기 때문에 불필요한 실행은 막아야 한다

//@@ 중요 팁!  
//어떤 변화로 인해 리랜더링이 일어나는지 확인하기 위해선 useEffect, uesRef 를 사용하면 알 수 있다
//기능 완성 이후 성능최적화 코딩을 할 때 아래의 코드를 사용하여 콘솔로그를 통해 불필요한 state변화는 없애면서
//성능 최적화를 시켜보자

//아래는 Td.jsx의 코드이다(아래코드는 어떤 state변화가 랜더링을 유발하는지 모를때 사용하면 유용하다)
const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => { //가끔씩 props 데이터가 안바뀔때가 있다
  console.log('td rendered');
  const ref = useRef([]); //ref는 계속 바뀌는 값인데 가끔씩 props 데이터가 안바뀔때가 있다
  useEffect(() => {//그래서 아래와 같이 log를 찍는 것이다(log에서 false가 나오면 false가 나오는 데이터가 바뀐다는 뜻)
    console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
    console.log(cellData, ref.current[3]); //위에서 false로 확인후 어떻게 바뀌는지 log를 찍어 확인해보자
    //여기선 cellData가 false가 나오므로 cellData를 콘솔로 찍어봤다
    ref.current = [rowIndex, cellIndex, dispatch, cellData];//
  }, [rowIndex, cellIndex, dispatch, cellData]); //각종 props를 다 넣어두자


//아래는 Tr.jsx의 코드이다
//(맨 자식단 부터 이 코드를 써서 부모로 올라가면서 이 코드를 쓰면 어떤 state변화에 의해 랜더링이 되는지 확인이 가능하다)
const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log('tr rendered');
  const ref = useRef([]);
  useEffect(() => {
    console.log(rowData === ref.current[0], dispatch === ref.current[2], rowIndex === ref.current[3]);
    ref.current = [rowData, dispatch, rowIndex];
  }, [rowData, dispatch, rowIndex]); //props 데이터를 넣고 값이 변할때마다 작동하게 해보자



//함수를 기억하는건 useCallback, 값을 기억하는건 useMemo 이다
//useMemo는 컴포넌트도 기억할 수 있다 ( useMemo()[값] 으로 처리해서 []안의 값이 바뀔때만 동작하게 한다  )


//자식이 리랜더링이 되면 위의 타고올라가 부모가 리랜더링 되기 때문에 자식부터 useMemo나 React.Memo를 사용하면 된다
//위의 코드처럼 const Tr = memo(({ rowData, rowIndex, dispatch }) => {  props를 memo로 감싸서 처리해주면 된다

//Memo를 먼저 사용해보고 원하는데로 안되면 useMemo를 사용하자
//Tr.jsx에서 useMemo를 사용한 코드이다
return (
  <tr>
    {Array(rowData.length).fill().map((td, i) => (
      useMemo(
        () => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
        [rowData[i]], //이 값이 변화할때만 동작하게 한다(td의미)
      )
    ))}
  </tr>

//() => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
//위의 컴포넌트 자체를 기억하고 기억이 해제될때는 []안의 요소인 rowData[i] 값이 변화할때이다
//(클릭했을때 cellData[i]] 가 o,x로 바뀌기 때문에 이부분을 )


//////////////////////////////////////////////////////////////
//https://headway.io/blog/react-optimize-components-memo-usememo-usecallback/
//React.Memo  VS  React.useMemo  VS  React.useCallback
//1) React.Memo
//-> 컴포넌트 전체에 대해 기억한다 같은 props를 줬을때 같은 return값이 나오면 memo로 감싸면 최적화 된다
// React.memo is a higher order component that memoizes the result of a function component. 
// If a component returns the same result given the same props, 
// wrapping it in memo can result in a performance boost
//2) React.useMemo
//-> function의 결과 값을 기억한다. 배열값이 변할때 결과return값이 변한다
// useMemo allows you to memoize the results of a function, 
// and will return that result until an array of dependencies change.
//3) React.useCallback
//-> 부모와 자식 컴포넌트 사이에 불필요한 랜더링을 막을 수 있다
//useCallback can prevent unnecessary renders between parent and child components.