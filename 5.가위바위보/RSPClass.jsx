import React, {Component} from 'react';

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

//Object.entries(객체) = 객체 => 배열(2차열배열로) [[키,값],[키,값]]
const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v){ //rspCoords객체를 배열화하여 
    return v[1] === imgCoord;
  })[0]; 
};
//rspCoords 객체를 key/value의 2차배열로 바꿔주고 find()로 v[1](키값)과, 현재 state가 같은것을 찾고
//[[키,값],[키,값]] 중([키,값]) [0]으로 키값을 리턴한다 (컴터의 가바보 알 수 있음)

class RSP extends Component {
  state = {
    result: '',
    imgCoord: rspCoords.바위,
    score: 0,
  };

  interval;

  componentDidMount(){  // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 해요
    this.interval = setInterval(this.changeHand, 100); //시작할때 계속적으로 사진 좌표를 돌려준다
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  changeHand = () => { //그림의 좌표를 계속 바꿔준다
    const {imgCoord} = this.state;
    if(imgCoord === rspCoords.바위){
      this.setState({
        imgCoord: rspCoords.가위,
      });
    }else if(imgCoord === rspCoords.가위){
      this.setState({
        imgCoord: rspCoords.보,
      });
    }else if(imgCoord === rspCoords.보){
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };
  
//아래setState()안에서() =>{} 내부함수가 들어갔기 때문에 onClickBtn는 함수가 아니라 함수를 실행한 결과물이다
//**(setState()에서 내부함수가 들어간 부분을 주석처리하고 () => 를 삭제하면 에러없이 잘 돌아간다)
//**(choice가 들어간 부분 때문에 () =>를 한번 더 해야 setState()함수로 실행이 될것이다(chap4 와 비교할때))
  onClickBtn = (choice) => () => { 
    const {imgCoord} = this.state; 
    clearInterval(this.interval); //누가이기는지 잠시 멈춰서 확인시킴
    const myScore = scores[choice]; //내가 선택한 가바보
    const cpuScore = scores[computerChoice(imgCoord)]; //컴터가 선택한 가바보
    const diff = myScore - cpuScore;
    if(diff === 0){//가바보 비긴 경우
      this.setState({
        result:'비겼습니다!',
      });
    }else if([-1,2].includes(diff)){ //가바보를 통한 이긴 경우
      this.setState((prevState) => {
        return {
          result: '이겼습니다',
          score: prevState.score + 1,
        };
      });
    }else{//그외... 가바보 진 경우
      this.setState((prevState) => {
        return {
          result:'졌습니다',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand,100);
    }, 1000);
  };

  render(){
    const {result, imgCoord, score} = this.state;
    return (
      <>
        <div id='computer' style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
        <div>
          <button id='rock' className='btn' onClick={this.onClickBtn('바위')}>바위</button>
          <button id='scissor' className='btn' onClick={this.onClickBtn('가위')}>가위</button>
          <button id='paper' className='btn' onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
};

export default RSP;