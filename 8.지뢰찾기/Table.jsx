import React, {useContext, memo} from 'react';
import Tr from './Tr';
import {TableContext} from './MineSearch';

const Table = memo(() => {
  const {tableData} = useContext(TableContext); //createContext()로 만든 객체를 가져와서 데이터 사용
  return (
    <table>
      {Array(tableData.length).fill().map((tr,i) => <Tr rowIndex={i}/>)}
    </table>
  )
});

export default Table;