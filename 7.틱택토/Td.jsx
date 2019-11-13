import React, {useCallback, useEffect, useRef, memo} from 'react';
import {CLICK_CELL} from './TicTecToe';

const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) => {
  console.log('td rendered');

  //state 변화 체크용
  const ref = useRef([]);
  useEffect(() => {
    console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
    console.log(cellData, ref.current[3]);
    ref.current = [rowIndex, cellIndex, dispatch, cellData];
  }, [rowIndex, cellIndex, dispatch, cellData]);

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if(cellData){ //기존의 cellData가 있으면
      return; //리턴값에 아무것도 주지않아서 그냥 끊어버린다
    }
    dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
  },[cellData]);

  return (
    <td onClick={onClickTd}>{cellData}</td>
  )
});

export default Td;