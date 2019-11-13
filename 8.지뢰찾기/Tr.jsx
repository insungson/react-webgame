import React, {useContext, memo} from 'react';
import Td from './Td';
import {TableContext} from './MineSearch';

const Tr = memo(({rowIndex}) => {
  const {tableData} = useContext(TableContext);
  //tableData[0] 이 undefined 일수 있기 때문에 && 보연산자를 써준다
  return (
    <tr>
      {tableData[0] && Array(tableData[0].length).fill().map((td,i) =>
        <Td rowIndex={rowIndex} cellIndex={i} />
      )}
    </tr>
  );
});

export default Tr;