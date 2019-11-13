import React,{useContext, useCallback, memo, useMemo} from 'react';
import {CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext} from './MineSearch';

//클릭시 칸의 상태에 따라 스타일도 바꿔준다
const getTdStyle = (code) => {
  switch(code){
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: 'white',
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow',
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red',
      };
    default: 
      return {
        background: 'white',
      };
  }
};

//(지뢰가 있든,없든)칸을 클릭할때 칸의 상태에 따라 화면에 보여주는 택스트이다
const getTdText = (code) => {
  console.log('getTdText');
  switch(code){
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
      return code || '';
  }
};
//default 값으로 code를 적어야 클릭시 주변의 지뢰 갯수가 뜬다(0인경우 빈칸)
//switch문에서 default값은 case중간에 break가 없다면 무조건 실행된다
//switch문에서 default나 break를 써주지 않는다면 다음 case로 계속 넘어가게 된다
//default 가 맨처음 들어가면 case는 작동 안됨 default 하고 그냥 끝남

const Td = memo(({rowIndex, cellIndex}) => {
  const {tableData, dispatch, halted} = useContext(TableContext);

  const onClickTd = useCallback(() => {
    //지뢰칸을 클릭시 멈춰야 하므로 빈return을 줘서 동작을 안하게 한다
    if(halted){
      return;
    }
    //지뢰가 있는칸 없는 칸이 있기 때문에 상태별로 동작이 달라져야 한다 (CODE는 상태별로 구별했다)
    switch(tableData[rowIndex][cellIndex]){
      //아래 5개의 상태일때는 return값을 아무것도 안줘서 클릭이 안되게 하자
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      //보통칸일땐 OPEN_CELL 동작!
      case CODE.NORMAL:
        dispatch({type:OPEN_CELL, row:rowIndex, cell:cellIndex});
        return ;
      //지회칸일땐 CLICK_MINE 동작!
      case CODE.MINE:
        dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex});
        return ;
      default:
        return ;
    }
  },[tableData[rowIndex][cellIndex], halted]);

  //onContextMenu 는 해당태그 element에서 오른쪽 클릭시 발생하는 이벤트이다 
  const onRightClickTd = useCallback((e) => {
    e.preventDefault();//오른쪽 클릭시 메뉴가 뜨는걸 막기위해 넣어줌
    if(halted){
      return ;
    }
    switch(tableData[rowIndex][cellIndex]){
      //지뢰칸, 보통칸일땐 dispatch로 깃발칸을
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({type: FLAG_CELL, row: rowIndex, cell: cellIndex});
        return ;
      //킷발칸일땐 dispatch로 물음표칸을
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({type: QUESTION_CELL, row: rowIndex, cell: cellIndex});
        return;
      default:
        return ;
    }//칸을 클릭시(여기선 오른클릭) 바뀌므로 칸데이터 넣음
  },[tableData[rowIndex][cellIndex], halted]);

  console.log('td rendered');

  return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />;
});
//아래와 같이 return 되는 부분만 memo처리를 하면 화면상 랜더링은 클릭후 바뀌는 부분만 랜더링이 되는것이다
//td 함수 자체는 여러번 실행되더라도 실제로 return으로 실행되는건 바뀌는칸만 랜더링 되는것이다
//좀더 깔끔하게 하기위해 컴포넌트를 나눴다(컴포넌트를 나눴기 때문에 memo를 사용한다)
//(컴포넌트를 나누지 않고, 위의 return에 사용할땐 값만 변경하기 때문에 useMemo를 사용한다)
const RealTd = memo(({onClickTd, onRightClickTd, data}) => {
  console.log('real td rendered');
  return (
    <td 
      style={getTdStyle(data)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}>
      {getTdText(data)}
    </td>
  )
});

export default Td;