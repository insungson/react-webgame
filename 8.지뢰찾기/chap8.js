//8-1) Context API 소개와 지뢰찾기
//Context API : 부모 - 자식 관계가 다층관계일때 단계별로 연결하는게 아닌 한번에 연결해준다 
//https://medium.com/lunit-engineering/context-api%EA%B0%80-redux%EB%A5%BC-%EB%8C%80%EC%B2%B4%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C%EC%9A%94-76a6209b369b
//**(redux와 context API의 차이)

//context API의 기본 사용법
//https://medium.com/@pks2974/react-context-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC-9c35ce6617fc
//(간단히 정리된곳)
//https://reactjs.org/docs/context.html#api
//(공식문서)
//1.) React.createContext() : context 객체를 만들 수 있다 (Provider와 매칭되는 context 객체와 매칭시킨다)
  const MyContext = React.createContext(defaultValue);
  //defaultValue 는 Provider위에 매칭되는 트리가 없을때 사용된다 (초기값기능을 한다)
//2.) Context.Provider : createContext에서 만들어진 모든 context object들을(provider에서 value값이다) 
//  Provider의 하위 트리관계에서 만들어진 모든 곳에서 사용할 수 있고, 자손의 value가(props value) 변경될때 마다 
//  subscribe되어 provider의 하위 자손들이 전부 consumer되어 리랜더링 된다
  <MyContext.Provider value={value /**some value */} /> //여기서 value가 하위에서 consumer로 사용가능하다
//3) context.consumer : 상위 트리의 MyContext(여기서 예제로 만든 context) Provide의 value를 subscribe 하고,
//  상위 트리중 가장 가까운 Provider 의 value값을 가져온다(만약 Provider가 최상위 트리만 있다면 defaultValue값이다)
  <MyContext.Consumer>
    {value => /* context value 값을 가져온다*/}
  </MyContext.Consumer>
//4) Class.contextType : createContext() 로 만든 객체값을 class의 프로퍼티에 할당해준다 (여기에서의 예제는 )
//  클래스명.contextType = createContext()로 만든 객체;     이렇게 클래스명에 값을 할당해주고 
//  let 변수명 = this.context;                이렇게 값을 변수로 가져와서 사용한다
  class MyClass extends React.Component{
    componentDidMount(){
      let value = this.context; //아래의 Mycontext 객체에서 값을 가져와 초기실행을 한다
    }
    componentDidUpdate() {
      let value = this.context;
      /* ... */
    }
    componentWillUnmount() {
      let value = this.context;
      /* ... */
    }
    render() {
      let value = this.context;  //MyContext의 값에 기반하여 랜더링 된다
    }
  }
  MyClass.contextType = MyContext; //createContext()로 만든 객체를 이렇게 클래스에 할당한다
//5) useContext(context객체) : Hooks에서는 이렇게 createContext()로 만든 객체를 사용한다(여기서 사용한다)
  const value = useContext(MyContext);   //Hooks에서는 이렇게 쉽게 할당한다 (가져올때 {}로 묶어주면 바로 사용가능)
  //아니면 value.state값  이렇게 접근해야한다 


//지뢰찾기도 테이블 구조이므로 MineSearch, Table, Tr, Td 파일을 만들어 부모-자식 관계를 만들어 코딩을 한다

//MineSearch.jsx 에서 useReducer를 적용시키는 기초작업은 아래와 같이 한다
import React, { useEffect, useReducer, createContext, useMemo } from 'react';
import Table from './Table';

export const TableContext = createContext({컴포넌트간 사용할 데이터}); 
//이부분이 redux의 store 부분과 비슷하다(컴포넌트간 데이터{}내부에서)

const initialState = {};

const reducer = (state, action) => { //액션들 정의
  switch (action.type) {
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TableContext.Provider value={value}>   //위에서 만든 createContext({컴포넌트간 이동데이터})
      <여기에 컴포넌트간 이동데이터를 사용하려면 컨테이너 컴포넌트를 넣음 />
    </TableContext.Provider>
  );
};

export default MineSearch;


//그리고 Form.jsx 부분에서 가로,세로,지뢰 값을 받을 폼과 이벤트를 만들어두자
//여기서만 state, setState를 사용하는 이유는 부모 자식 손자 이런관계가 아니라 단순 컴포넌트에서만 state를 변경할땐
//그냥 바꾸면 된다


////////////////////////////////////////////////////////////////////////
//8-2) createContext 와 Provider
//Context API 를 사용하기 위해선 MineSearch.jsx 에서 createContext를 React에서 가져오자
import React, { useEffect, useReducer, createContext, useMemo } from 'react';
//그리고 createContext를 만들고, 초기값을 넣어주는데 일단은 형태만 넣어두자
export const TableContext = createContext({ //TableContext를 export해서 다른 파일에서도 사용할수 있게하자
  tableData: [], //tableData는 배열형태
  halted: true,
  dispatch: () => {}, //dispatch는 함수형태
});
//Form.jsx 에서 입력한 데이터를 context API 에서 접근할 수 있는 데이터들의 component를 
//아래처럼 TableContext.Provider 로 묶어준다 (TableContext는 위에서 createContext로 만든 변수이다)
//(provider는 context API에서 제공해준다)
//이렇게 묶어주고 다른 컴포넌트에서 useContext를 사용해서 자식 컴포넌트에서 데이터에 접근할 수 있다
const { tableData } = useContext(TableContext); //createContext에서 객체로 묶었기 때문에 {tableData}로 받는다
//provider 태그에 있는 value가 자식 컴포넌트에게 바로 전달해줄 데이터이다
//(아래와 같이 해두면 자식컴포넌트에서 테이블 데이터와 dispatch에 바로 접근할 수 있다)
<TableContext.Provider value={{tableData: state.tableData, dispatch}}> //value값이 바뀔때마다 랜더링함
  <Form />
  <div>{timer}</div>
  <Table />
  <div>{result}</div>
</TableContext.Provider>


//다시 Form.jsx로 돌아가서 TableContext에 들어간 dispatch를 Context API 중 useContext를 통해
//가져와보자
//아래와 같이 React에서 useContext를 불러온다
import React, { useState, useCallback, useContext, memo } from 'react';
//MineSearch.jsx 에서 TableContext에 export를 했으므로 아래와 같이 TableContext를 가져오자
import { START_GAME, TableContext } from './MineSearch';
//아래와 같이 MineSearch.jsx 에서 TableContext에 들어간 dispatch를 가져온다
const { dispatch } = useContext(TableContext);
//value를 쓰면 그 안의 모든 값을 가져오고.. {dispatch} 를 쓰면 dispatch만 가져온다 구조분해이다


//Context API는 성능최적화 하기가 어렵다 
<TableContext.Provider value={{tableData: state.tableData, dispatch}}>
</TableContext.Provider>
//위에서  value={{tableData: state.tableData, dispatch}} value를 {} 객체로 정의하면 
//const MineSearch(){} 가 새로 리랜더링 될때마다 {tableData: state.tableData, dispatch} 객체가
//새로 생긴다  객체가 새로 생긴다는 것은 Context API를 사용하는 자식들도 매번 새로 리랜더링 되고 
//성능최적화에 문제가 생긴다
//그래서 React.useMemo 를 통해 {tableData: state.tableData, dispatch} 객체를 캐싱해주자
//(useMemo는 값을 기억해준다) 
//매번 새로운 객체가 생기지 않도록 {tableData: state.tableData, dispatch} 객체를 value로 바꾸고
<TableContext.Provider value={value}>
</TableContext.Provider>
//useMemo로 {tableData: state.tableData, dispatch} 객체를 처리하여 value 변수에 넣어주자
//그리고 state.tableData 가 바뀔때 { tableData, halted, dispatch } 객체값을 갱신할수 있게
//[] 에 넣어준다(tableData, halted 데이터가 바뀔때만 갱신)
const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);
//위와 같이 캐싱을 해줘야 Context API를 사용할때 성능저하가 덜 일어난다
//(맨마지막에 클래스에서 리랜더링을 막기 위한 방법과 코드를 적어본다 클래스로 성능개선할때 보자)

//이제 Form.jsx에서도 dispatch를 사용하여 action type을 지정하고 값을 넣어 reducer에서 정의한 action을 
//실행할수 있다
//(action.type도 다른 파일에서 사용할 수 있도록 MineSearch.jsx 에서 export로 액션타입을 코딩해두자)
export const START_GAME = 'START_GAME';  //이런식으로


//이제 reducer에서 액션에 대한 실행을 만들자



/////////////////////////////////////////////////////////
//8-3) useContext 사용해 지뢰 칸 렌더링
//MineSearch.jsx 에서 plantMine에 지뢰가 위치할 칸을 정하는 로직을 짜자



//로직 완성 후 Table.jsx, Tr.jsx, Td.jsx 에서 로직을 기반으로 테이블을 만들고 값을 넣는다
//MineSearch.jsx 에서 tableData를   <TableContext.Provider value={value}> 의 value에 넣었기 때문에
//TableContext 로 감싼 자식의 모든 컴포넌트에서 value를 가져다 쓸 수 있다
return (
  <TableContext.Provider value={value}>
    <Form />
    <div>{timer}</div>
    <Table />
    <div>{result}</div>
  </TableContext.Provider>

//Table.jsx에서 React.useContext를 불러오고 
import React, { useContext, memo } from 'react';
//useContext에서 TableContext를 가져와 tableData를 불러오고
const { tableData } = useContext(TableContext); //value.tableData를 구조분할로 가져왔다
//tableData로 table의 Tr의 갯수를 만들어준다
return (
  <table>
    //아래의 코드는 행수 열수를 반복문을 돌려 Tr을 만들어준다
    {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />)} 
  </table>
)

//위와 마찬가지로 Tr.jsx에서 React.useContext를 불러오고 
import React, { useContext, memo } from 'react';
//useContext에서 TableContext를 가져와 tableData를 불러오고
const { tableData } = useContext(TableContext); //value.tableData를 구조분할로 가져왔다
//이번엔 tableData로 table의 Td의 갯수를 만들어준다
//(이중배열이기 때문에 tableData[0] 을 사용한 것이고, tableData[0]가 undefined가 될 수 있으므로
//보연산자 &&을 사용했다)
return (
  <tr>
    {tableData[0] && Array(tableData[0].length).fill().map((td, i) =>
      <Td rowIndex={rowIndex} cellIndex={i} />
    )}
  </tr>
)
//테이블모양을 랜더링하는 과정은 7장 틱택토와 같다(가로세로 갯수받는것만 제외하면)


//이제 지뢰를 테이블에 넣어보자
//지뢰를 배열값으로 넣기 위해 Table.jsx에서 줄을 뜻하는 rowIndex={i} 를 Tr.jsx로 넘겨준다
{Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />)} 
//Tr.jsx에서 {rowIndex} 로 줄을 뜻하는 rowIndex={i}를 받고
const Tr = memo(({ rowIndex }) => {
//줄을 뜻하는 rowIndex={rowIndex}와 칸을 뜻하는 cellIndex={i} 을 Td.jsx로 넘겨준다
{tableData[0] && Array(tableData[0].length).fill().map((td, i) =>
  <Td rowIndex={rowIndex} cellIndex={i} />
)}
//Td.jsx에서 { rowIndex, cellIndex }로 Tr.jsx에서 배열위치값을 받는다
const Td = memo(({ rowIndex, cellIndex }) => {
//그리고 useContext로 테이블데이터를 가져온다(여기에 지뢰가 배치된 배열값이 다 있다)
const { tableData, dispatch, halted } = useContext(TableContext);
//이제 Table.jsx -> Tr.jsx 를 통해 얻은 배열 위치값에 지뢰가 배치된 tableData값들을 넣어주면
//지뢰가 들어간 테이블 모양을 얻게 된다(-7,-1 로 이뤄진 데이터 테이블이다)
return <RealTd data={tableData[rowIndex][cellIndex]} />;


//이제 만들어진 테이블을 꾸며보자
//리엑트의 장점은 상황에 따라 스타일을 꾸밀 수 있다는 점이다
const getTdStyle = (code) => {스위치문} //명령에 따른 스타일 코드
const getTdText = (code) => {스위치문}  //명령에 따른 텍스트 코드
//아래와 같이 상황에(여기선 명령) 따라 원하는 스타일과, 텍스트를 설정할 수 있다
<td
style={getTdStyle(data)}
onClick={onClickTd}
onContextMenu={onRightClickTd}
>{getTdText(data)}</td>



////////////////////////////////////////////////////////
//8-4) 왼쪽 오른쪽 클릭 로직 작성하기
//MineSearch.jsx 에서 OPEN_CELL 액션을 추가하고
export const OPEN_CELL = 'OPEN_CELL';
//정의를 추가하고 reducer에 액션에 대해 로직을 만들자
//칸을 클릭할때 상태를 CODE.OPENED로 바꿔주면 된다
case OPEN_CELL: {
  const tableData = [...state.tableData];
  tableData[action.row] = [...state.tableData[action.row]];
  tableData[action.row][action.cell] = CODE.OPENED;
//7장처럼 테이블 데이터에 state불변성을 위해 얕은 복사를 하고 클릭한 칸을 CODE.OPENED로 바꿔준다


//이제 Td.jsx로 가서 useContext를 사용하여 dispatch를 가져오고
const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);
//리턴 부분의 클릭 이벤트를 만들고 이벤트에 대해 함수로 빼두고
console.log('real td rendered');
return (
  <td
    style={getTdStyle(data)}
    onClick={onClickTd}
    onContextMenu={onRightClickTd}
  >{getTdText(data)}</td>
)
});
//onClickTd 함수를 만들어 칸 상태 조건을 만들고 dispatch에 액션타입과 데이터를 넣어서 작동시킨다
const onClickTd = useCallback(() => {
  if (halted) { //지뢰칸을 클릭시 멈춰야 하므로 빈return을 줘서 동작을 안하게 한다
    return;
  }
  switch (tableData[rowIndex][cellIndex]) { //여기서 칸에 대해 구분하고
    //아래 5개의 상태일때는 return값을 아무것도 안줘서 클릭이 안되게 하자
    case CODE.OPENED: //열려있을때
    case CODE.FLAG_MINE:
    case CODE.FLAG:
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return;
    case CODE.NORMAL: //보통칸일땐 OPEN_CELL 동작! 
      dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
      return;
    case CODE.MINE: //지회칸일땐 CLICK_MINE 동작!
      dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
      return;

//이제 앞에서 만든 코드에 따라 스타일, 텍스트 변화하는 함수에 코드에 따른 변화를 적자 (스타일 따로, 코드 따로)
const getTdText = (code) => { //명령에 따른 텍스트 코드
  console.log('getTdtext');
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
const getTdStyle = (code) => {//명령에 따른 스타일 코드
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      };


//이제 마우스 오른쪽 클릭 이벤트를 의미하는 onContextMenu 를 넣고 함수로 빼서 위와 같은 작업을 해주자
return (
  <td
    style={getTdStyle(data)}
    onClick={onClickTd}
    onContextMenu={onRightClickTd}
  >{getTdText(data)}</td>
)
});
//onRightClickTd 변수에 오른 클릭에 대한 로직을 넣자
//위의 onClickTd 함수와 같은 작업을 해주자
const onRightClickTd = useCallback((e) => {
  e.preventDefault(); //오른쪽 클릭시 메뉴가 뜨는걸 막기위해 넣어줌
  if (halted) {
    return;
  }
  switch (tableData[rowIndex][cellIndex]) { //switch문은 return이든 break든 중간에 끊어줘야 한다
    case CODE.NORMAL:
    case CODE.MINE: //지뢰칸일땐 dispatch로 깃발칸을
      dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
      return;


//이제 dispatch의 type에서 만든 명령에 대한 실행을 MineSearch.jsx 에서 reducer에 만들어주자




////////////////////////////////////////////////////
//8-5) 지뢰 개수 표시하기
//칸들을 클릭할때 주변에 지뢰가 몇개있는지 칸에 떠야한다

//MineSearch.jsx 에서 reducer에서 정의한 명령중 OPEN_CELL에서 주변 지뢰의 갯수를 파악하는 로직을 짜보자
//한칸을 선택할때 주변 8개를 확인해야한다 조건을 따져보자 (around 배열에 조건들을 추가하자)
//1. 선택한 칸의 윗줄이 있는 경우
//2. 선택한 칸의 왼쪽, 오른쪽칸 
//3. 선택한 칸의 아래줄이 있는 경우

//맨위, 맨아래줄은 구분하면서 양 사이드를 if문으로 제어하지 않는 이유는 맨윗줄 아래줄이 없어서
//  tableData[row][cell - 1] 데이터가 들어갈때 row가 undefined 라면 코드에서 에러가 난다
//하지만 cell부분이 Undefined 라면 아래의 around.filter(function (v) {  에서 filter로 
//undefined가 걸러지기 때문에 굳이 양사이드는 if문으로 구분하지 않는것이다

주변칸.filter((v) => !!v) //기존의 자바스크립트 코드에서는 이런식으로 undefined된 부분을 걸러내었다

//count 변수에 지뢰가 설치되어 있는칸의 갯수를 넣어준다
const count = around.filter(function (v) { 
  return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
}).length;

//클릭한 칸에 count를 넣어준다 (Td.jsx에서 tableData를 불러오면 주변의 지뢰갯수(count)가 뜬다)
tableData[row][cell] = count;

//Td.jsx에서 td칸을 체우는 getTdText 함수의 swirch문으로 클릭한 칸데이터를 가져와서 tableData[row][cell]
//break없이 default로 리턴하여 클릭칸에 출력한다
const getTdText = (code) => {
//switch문에서
//default 값으로 code를 적어야 클릭시 주변의 지뢰 갯수가 뜬다(보 연산자 사용하여 0인경우 빈칸)
//switch문에서 default값은 case중간에 break가 없다면 무조건 실행된다
//switch문에서 default나 break를 써주지 않는다면 다음 case로 계속 넘어가게 된다
//default 가 맨처음 들어가면 case는 작동 안됨 default 하고 그냥 끝남(그래서 맨뒤에 넣는다)
//default를 사용하는 이유는 dispatch({}) 사용시 오타로 인한 에러가 발생할 수 있으므로 default로 빼놓는것이다



/////////////////////////////////////////////////////////
//8-6) 빈 칸들 한 번에 열기

//칸을 클릭했을때 주변칸이 다 켜지는 것을 해보자(주변칸이 열어도 되는지 안되는지 재귀함수로 체크를 해야한다)
//(만약 주변칸의 옆칸이 빈칸이라면 계속해서 열어나가야 한다 - 재귀함수 사용) 

//먼저필터링으로 주변을 다 검사하자
//1. 상하좌우 없는칸은 안 열기 (필터링 작업을 해준다)
if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
  return;
} 
//2. 닫힌 칸만 열기 (이미열린칸, 깃발표시칸 들 전부 무시)
if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
  return;
}
//3. 한 번 연칸은 무시하기
if (checked.includes(row + '/' + cell)) { //이미 검사한 칸이면 무시(return 없음)
  return;
} 
//4. 검사한 칸이 아니면 check배열에 넣어준다
else { 
  checked.push(row + '/' + cell);
}

//그리고 앞서한 주변을 체크한다

//OPENCELL 칸을 클릭할때 주변 8개가 아닌 빈칸일때 옆으로 계속 넓혀야 하기 때문에 tableData를 forEach()문으로 
//바꿔서 재귀함수로 계속 반복하는 작업을 한다
if (count === 0) { //클릭한 칸이 빈칸일때 주변칸 다 검사
  if (row > -1) {
    const near = [];
    if (row - 1 > -1) {//첫째줄일때
      near.push([row -1, cell - 1]);
      near.push([row -1, cell]);
      near.push([row -1, cell + 1]);
    }
    near.push([row, cell - 1]);
    near.push([row, cell + 1]);
    if (row + 1 < tableData.length) {//맨아래 줄일때
      near.push([row + 1, cell - 1]);
      near.push([row + 1, cell]);
      near.push([row + 1, cell + 1]);
    }
    near.forEach((n) => { //클릭한 칸에서 주변칸중 닫혀있을때만 재귀함수로 돌린다
      if (tableData[n[0]][n[1]] !== CODE.OPENED) { 
        checkAround(n[0], n[1]);
      }
    })
  }
}
//아래와 같은 원리이다 (반복문을 함수로 표현하는 방법이다)
function 재귀함수(숫자){
  console.log(숫자);
  if(숫자 < 5){
    재귀함수(숫자 + 1);
  }
}
재귀함수(1);
//기존의 자바스크립트 코드
e.currentTarget.textContext = 주변지뢰갯수;
if(주변지뢰갯수 === 0){
  var 주변칸 = [];
  if(tbody.children[줄 - 1]){
    주변칸 = 주변칸.concat([
      tbody.children[줄 - 1].children[칸 - 1],
      tbody.children[줄 - 1].children[칸],
      tbody.children[줄 - 1].children[칸 + 1],
    ]);
  }
  주변칸 = 주변칸.concat([
    tbody.children[줄].children[칸 - 1],
    tbody.children[줄].children[칸 + 1],
  ]);
  if(tbody.children[줄 + 1]){
    주변칸 = 주변칸.concat([
      tbody.children[줄 + 1].children[칸 - 1],
      tbody.children[줄 + 1].children[칸],
      tbody.children[줄 + 1].children[칸 + 1],
    ]);
  }
  주변칸.filter(function (v) {
    return !!v;
  }).forEach(function(옆칸) {
    var 부모tr = 옆칸.parentNode;
    var 부모tbody = 옆칸.parentNode.parentNode;
    var 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
    var 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
    if (dataset[옆칸줄][옆칸칸] !== 코드표.연칸) {
      옆칸.click();
    }
  });
}

주변칸.filter((v) => !!v)  // 이코드는 배열안에 있는 undefined, null, 0, 빈문자열을 제거하는 코드이다

//이부분이 이해가 안되었는데... 아래아래의 코드를 보자
near.forEach((n) => { //클릭한 칸에서 주변칸중 닫혀있을때만 재귀함수로 돌린다
  if (tableData[n[0]][n[1]] !== CODE.OPENED) { 
    checkAround(n[0], n[1]); //1로 설정한 이유는.. 위치배열이 [줄,칸] 으로 이뤄져 있기 때문이다
  }
})

//tableData[n[0]][n[1]] 이부분이 이해가 안되었는데... 아래의 코드를 보자
var array1 = [[1,2], [3,4],[5,6]];
var array = [[1,2], [3,4],[5,6],[7,8],[9,10],[11,12],[13,14],[15,16],[17,18]];
array1.forEach(function(element) {
  console.log(element[0]); //1,3,5
  console.log(array[element[0]][element[0]]); //4,undefined,undefined
});
// > 1
// > 4    그러니깐 array[1,1] , array[3,3], array[5,5] 이므로 4,undefined,undefined 가 나온것이다
// > 3
// > undefined
// > 5
// > undefined


////////////////////////////////////////////////////////////
//8-7) 승리 조건 체크와 타이머
//예를들어 5(가로)*5(세로)-지뢰갯수(10) === 클릭해서 지뢰가 아닌 칸을 열었을때
//가 승리 조건이다 

//아래와 같이 칸을 클릭 시 주변칸 자동클릭등의  위의 승리조건을 if문을 통해 중단플래그 let halted = false;
//변수를 바꿔서 승리시 게임을 멈추게 하고, 관련 데이터들을 return 으로 보낸다
case OPEN_CELL: {
  const tableData = [...state.tableData];
  tableData.forEach((row, i) => { //클릭한 칸의 주변만 선택하는게 아닌 재귀함수로 계속 선택해 나가는것이라 
    tableData[i] = [...row];    //forEach()문으로 변경하였다
  });
  const checked = [];//검사가 완료된 칸(구분을 안하면 재귀함수 사용시 무한중복됨)
  let openedCount = 0;
  console.log(tableData.length, tableData[0].length);
  //클릭한 칸의 주변칸들을 검사하는 함수
  const checkAround = (row, cell) => {
    ...
  };                            
  checkAround(action.row, action.cell);
  let halted = false;
  let result = '';
  console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount);
  if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) { // 승리 조건
    halted = true; //승리시 게임 멈추기
    result = `${state.timer}초만에 승리하셨습니다`;
  }
  return {
    ...state,
    tableData,
    openedCount: state.openedCount + openedCount, //기존에 열린것 + 재귀함수로 연것
    halted,
    result,
  };
}

//타이머 부분은 MineSearch의 메인 함수 부분에서 설정한다
//INCREMENT_TIMER 명령어를 위의 case에 추가하고 useEffect를 통해 시작을 누를때 타이머가 작동하게 한다
//그리고 중단플래그 halted를 마지막 배열에 넣고 setInterval 시작 전 조건문을 넣어 값이 변할때 동작을 멈추게한다
const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;

  const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);

  useEffect(() => { //useEffect로 setInterval 사용
    let timer;
    if (halted === false) { //시작을 눌를때 타이머가 작동해야하므로 
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    }
  }, [halted]);



////////////////////////////////////////////////
//8-8) Context api 최적화
//8-7번까지 코딩을 했으면 실행에는 문제가 없다 하지만... chrome 툴에서 React를 키면 최적화에 문제가 많다는것을
//확인할 수 있다 // setInterval로 시간이 진행시 모든 칸에서 실행되는것을 볼 수 있다)

//우선 타이머 실행될때마다 리랜더링 되는 현상을 막아보자
//우선 메인함수인 MineSearch 의 리턴부분을 <TableContext.Provider value={value}> 로 감싸고,
//  const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);
//로 매번 리랜더링 되는것을 막기위해 value값의  useMemo()로 value값에 캐슁작업을 해준다 
// 그리고 table.jsx, tr.jsx, td.jsx  하위 컴포넌트에도 memo 작업을 해줘서 테이블의 리랜더링을 막기위한 
//캐쉬처리를 해주자


//문제는 contextAPI를 사용할때 Td.jsx부분에서 칸수만큼 랜더링이 된다는 것이다
//변하는 칸만 랜더링을 적용시키려면 return 부분에서 useMemo를 적용시키면 된다
//아래와 같이 return 되는 부분만 memo처리를 하면 화면상 랜더링은 클릭후 바뀌는 부분만 랜더링이 되는것이다
//td 함수 자체는 여러번 실행되더라도 실제로 return으로 실행되는건 바뀌는칸만 랜더링 되는것이다
//좀더 깔끔하게 하기위해 컴포넌트를 나눴다(컴포넌트를 나눴기 때문에 memo를 사용한다)
//(컴포넌트를 나누지 않고, 위의 return에 사용할땐 값만 변경하기 때문에 useMemo를 사용한다)
return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />;
});

const RealTd = memo(({ onClickTd, onRightClickTd, data}) => {
  console.log('real td rendered');
  return (
    <td
      style={getTdStyle(data)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(data)}</td>
  )
});


////////////////////////////////////////////////////////////////////
//https://reactjs.org/docs/context.html#caveats
//(참조)
//Hooks는 createContext()로만든객체.Provider 에서 value를 따로 빼서 useMemo()나 memo()로 감싸서 리랜더링을 
//어느정도 막아준다
//class에서는 아래와 같은 상황에서 value로 새로운 객체가 계속 생성되기 때문에 모든 consumer에서 리랜더링이 일어난다
class App extends React.Component{
  render() {
    return (
      <Provider value={{something : 'something'}}>   //이렇게 value에 {} 객체를 넣으면 실행할때마다 리랜더링 발생
        <Toolbar />
      </Provider>
    )
  }
}
//아래와 같이 부모 state에 value를 따로 빼두면 해결된다
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: {something: 'something'},
    };
  }
  render(){
    return (
      <Provider value={this.state.value}> //value를 이렇게 넣어준다
        <Toolbar />
      </Provider>
    );
  }
}