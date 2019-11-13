import React, {useEffect, useReducer, useCallback} from 'react';
import Table from './Table';

const initialState = {
  winner: '', //승자
  turn: 'O', //사용자턴 (O,X)
  tableData: [  //테이블에 들어갈 데이터
    ['','',''],
    ['','',''],
    ['','',''],
  ],
  recentCell: [-1,-1], //최근 클릭한 칸
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {  //state는 위의 initialState과 연결된다
  switch(action.type){
    case SET_WINNER:{
      return {
        ...state, //객체복사후 아래에서 state에 데이터 저장
        winner: action.winner,  //해당 명령어SET_WINNER를 dispatch(명령어,winner:데이터) 데이터는 키값으로 접근 
      };
    }
    case CLICK_CELL: {
      const tableData = [...state.tableData];   //객체 복사
      tableData[action.row] = [...tableData[action.row]]; //이중배열이므로 줄에 대한 객체복사
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell], //마지막 클릭한 칸 저장
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {//초기화작업
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['','',''],
          ['','',''],
          ['','',''],
        ],
        recentCell: [-1,-1], 
      };
    }
    default: //default로 case해당안될때 state를 리턴해준다
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {tableData, turn, winner, recentCell} = state;

  const onClickTable = useCallback(() => {//부모와 자식간 불필요한 랜더링을 막기위한 useCallback사용 
    dispatch({type: SET_WINNER, winner: 'O'});
  },[]);

  useEffect(() => {
    const [row, cell] = recentCell;
    if(row < 0){
      return;
    }
    //이기는 조건
    let win = false;
    //가로줄 이기는 조건
    if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
      win = true;
    }
    //세로줄 이기는 조건
    if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){
      win = true;
    }
    //대각선줄 이기는 조건
    if(tableData[0][0] === turn && tableData[1][1] && tableData[2][2] === turn){
      win = true;
    }
    //대각선줄 이기는 조건
    if(tableData[2][0] === turn && tableData[1][1] === turn && tableData[0][2] === turn){
      win = true;
    }
    console.log(win, row, cell, tableData, turn);
    if(win){ //승리시 
      dispatch({type: SET_WINNER, winner:turn});// 지금턴인 사람 승리
      dispatch({type: RESET_GAME}); //다시 리셋
    }else{
      let all = true; //all이 true일때 무승부라는 의미
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if(!cell){
            all = false; //테이블데이터에 O,X값이 없으면 all = false로 체크
          }
        });
      });
      if(all){//무승부일때 리셋
        dispatch({type: RESET_GAME});
      }else{//무승부가 아니라면 다른 사람에게 턴을 넘김
        dispatch({type: CHANGE_TURN});
      }
    }
  }, [recentCell]);

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  )
};

export default TicTacToe;