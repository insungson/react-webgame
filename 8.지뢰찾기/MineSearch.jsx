import React, {useEffect, useReducer, createContext, useMemo} from 'react';
import Table from './Table';
import Form from './Form';


export const CODE = {
  MINE: -7, //지뢰가 심어진 칸
  NORMAL: -1,//지뢰가 없는 칸
  QUESTION: -2,//오른클릭두번하면 생기는 ?값(지회찾기 게임시 등장)
  FLAG: -3,//오른클릭한번하면 생기는 값(지뢰예상지점)
  QUESTION_MINE: -4, //지뢰가 있는 칸을 물음표한 경우
  FLAG_MINE: -5, //지뢰가 있는 칸을 깃발처리한 경우
  CLICKED_MINE: -6, //실수로 지뢰칸을 클릭시 "펑!" 글자를 써줘야 하기 때문에
  OPENED: 0, //정상적으로 열은 칸
  // 0 이상이면 다 opened (주변에 지뢰가 없을때 주위칸들을 전부 열어줌)
};

//Context API 다른 곳에서 사용할 형태를 적어둔다 (다른 파일에서 사용할 게이트 오픈!)
//(state에 접근하는게 아니라 형태를 공유해서 쓴다)
export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [], //데이터 테이블
  data: {row: 0, cell: 0, mine: 0}, //데이터 테이블을 만드는것
  timer: 0, //측정시간
  result: '', 
  halted: true,//지뢰클릭시 게임 오버 (중단플래그) //플레그: 코드의 흐름을 좌우하는 변수(조건문 return으로 제어가능)
  openedCount: 0,
};

//데이터배열에 지뢰 
const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  //가로,세로 기반으로 배열만듬
  const candidate = Array(row * cell).fill().map((arr,i) => {return i;});
  //만들어진 배열에서(일반배열임) 지뢰 갯수만큼 뽑아서 따로 배열에 넣음
  const shuffle = [];
  while(candidate.length > row * cell - mine){
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  //데이터 테이블을 만들고 CODE.NORMAL을 다집어 넣음
  const data = [];
  for(let i = 0; i < row; i++){
    const rowData = [];
    data.push(rowData);
    for(let j = 0; j < cell; j++){
      rowData.push(CODE.NORMAL);
    }
  }
  //만들어진 데이터 테이블에 지뢰 코드 넣기
  for(let k = 0; k < shuffle.length; k++){
    const ver = Math.floor(shuffle[k] / cell); //칸수로 줄 선택
    const hor = shuffle[k] % cell;    //칸수로 칸 선택
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};

//액션 명령어
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER'; //문자열을 변수화 시킴

const reducer = (state, action) => {
  switch(action.type){
    case START_GAME: {            //여기서 case 별로 구분할때 오타로인한 에러를 줄이기 위해
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        openedCount: 0,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false, 
        timer: 0,
      };
    }
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked = [];
      let openedCount = 0;
      console.log(tableData.length, tableData[0].length);

      const checkAround = (row, cell) => {
        console.log(row, cell);
        //상하좌우 없는칸은 안 열기(필터링 작업을 해준다)
        if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length){
          return ;
        }
        //이미열린칸, 깃발표시칸 들 전부 무시
        if([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION, CODE.QUESTION_MINE].includes(tableData[row][cell])){
          return ;
        }
        // 한 번 연칸은 무시하기
        if(checked.includes(row + '/' + cell)){
          return ;
        }else{//안 연칸은 표시
          checked.push(row + '/' + cell);
        }
        // 클릭한 칸의 왼쪽, 오른쪽칸이 들어간 배열
        let around = [tableData[row][cell - 1], tableData[row][cell + 1]];
        //클릭한 칸의 윗줄이 있을 때 윗줄 3칸을 넣어준다
        if(tableData[row - 1]){
          around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]]);
        }
        //클릭한 칸의 아랫줄이 있을 때 아랫줄 3칸을 넣어준다
        if(tableData[row + 1]){
          around = around.concat([tableData[row + 1][cell - 1],tableData[row + 1][cell],tableData[row + 1][cell + 1]]);
        }
        //주변에(around에 주변칸들이 들어감) 지뢰가 있는지(CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE) 
        //확인 후 갯수를 센다
        const count = around.filter((v) => {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        }).length;
        ////클릭한 칸이 빈칸일때 주변칸 다 검사
        if(count === 0){
          if(row > -1){
            const near = [];
            if(row - 1 > -1){
              near.push([row - 1, cell - 1]);
              near.push([row - 1, cell]);
              near.push([row - 1, cell + 1]);
            }
            near.push([row, cell-1]);
            near.push([row, cell+1]);
            if(row + 1 < tableData.length){
              near.push([row + 1, cell - 1]);
              near.push([row+1,cell]);
              near.push([row+1,cell+1]);
            }
            //주변칸이 CODE.OPENED 가 아니라면 다시 재귀함수로 불러준다
            near.forEach((n) => {
              if(tableData[n[0]][n[1]] !== CODE.OPENED){
                checkAround(n[0],n[1]);
              }
            });
          }
        }
        //선택한 칸이 CODE.NORMAL 라면 openedCount 카운트 증가(승리판별)
        if(tableData[row][cell] === CODE.NORMAL){
          openedCount += 1;
        }
        tableData[row][cell] = count;
      };
      checkAround(action.row, action.cell);
      let halted = false;
      let result = '';
      console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount);
      //승리조건 (전체칸 - 지뢰칸 === state열린갯수 + 지금 연 갯수)
      if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다`;
      }
      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true, //지뢰클릭시 게임오버
      };
    }
    //보통칸 -> 깃발칸 -> 물음표 -> 보통칸 이런식으로 계속 순환되는 로직이다
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.MINE){//깃발을 체크한 칸이 지뢰칸이면
        tableData[action.row][action.cell] = CODE.FLAG_MINE;//그 칸을 CODE.FLAG_MINE 로 설정
      }else{
        tableData[action.row][action.cell] = CODE.FLAG;//그 칸에 지뢰가 없으면 그냥 CODE.FLAG 설정
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.FLAG_MINE){// CODE.FLAG_MINE 칸일때 
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;//그 칸을 CODE.QUESTION_MINE 로 설정
      }else{
        tableData[action.row][action.cell] = CODE.QUESTION;//지뢰가 없는 보통깃발이면 CODE.QUESTION으로 바꿈
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
        tableData[action.row][action.cell] = CODE.MINE;
      }else{
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }
    default: 
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {tableData, halted, timer, result} = state;

  const value = useMemo(() => ({tableData, halted, dispatch}),[tableData, halted]);
  //아래에서 Context API를 사용하기 위해 이 코드를 사용할때<TableContext.Provider value={value}>
  //value값이 바뀔때마다 위코드에 감싸인 코드들이 리랜더링 되기 때문에 useMemo()로 value값을 캐슁작업을 해준다 
  //(매번 리랜더링 되는것을 막기위해)

  //useEffect로 setInterval 사용
  useEffect(() => {
    let timer;
    //시작을 눌를때 타이머가 작동해야하므로 
    if(halted === false){
      timer = setInterval(() => {
        dispatch({type: INCREMENT_TIMER});
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [halted]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table/>
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;