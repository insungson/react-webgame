import React, {Component} from 'react';
import NumberBaseball from '../3.숫자야구/NumberBaseballClass';
import RSP from '../5.가위바위보/RSPClass';
import Lotto from '../6.로또/lottoClass';

//만약 아래 부분이 class가 아니라 함수형 const GameMatcher라면 구조분해로{match,location,history} 처리하면된다
class GameMatcher extends Component{
  render(){
    let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
    //쿼리스트링의 앞 ?를 짤라내고 URLSearchParams 객체 안에 넣어준다
    console.log(urlSearchParams.get('hello'));
    //이런 방식으로 라우터를 파싱해줘야 한다 리액트 방식으로 만들고 서버에도 따로 구현해야하기 때문에 
    //맛배기로 만든것이다
    if(this.props.match.params.name === 'number-baseball'){
      return <NumberBaseball />
    }else if(this.props.match.params.name === 'rock-scissors-paper'){
      return <RSP />
    }else if(this.props.match.params.name === 'lotto-generator'){
      return <Lotto />
    }
    return (
      <div>
        일치하는 게임이 없습니다.
      </div>
    );
  }
}

export default GameMatcher;