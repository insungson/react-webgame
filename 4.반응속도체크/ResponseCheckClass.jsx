import React, {Component} from 'react';

class ResponseCheck extends Component {
  state={
    state: 'waiting',
    message: '클릭해서 시작하세요',
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const {state} = this.state;
    if(state === 'waiting'){
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭',
        });
        this.startTime = new Date();
      } ,Math.floor(Math.random() * 1000) + 2000);
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요',
      });
    }else if(state === 'ready'){
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요',
      });
    }else if(state === 'now'){
      this.endTime= new Date();
      this.setState((prevState) =>{
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요',
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  };

  renderAverage = () => {
    const {result} = this.state;
    return result.length === 0
      ? null
      : <>
          <div>평균시간: {result.reduce((a,c) => a + c) / result.length}ms</div>
          <button onClick={this.onReset}>리셋</button>
        </>
  };  //여기서 IIFE 처리를 하면 랜더링이 안된다 아마 함수로 인식이 안되서 그런것 같다

  render(){
    const {state,message} = this.state;
    return (
      <>
        <div 
          id='screen'
          className={state}
          onClick={this.onClickScreen}
        >
          {message}
        </div>
        {this.renderAverage()}
        {/* 바로 실행해서 띄워야 하므로 IIFE 적용 */}
      </>
    )
  }

}

export default ResponseCheck;