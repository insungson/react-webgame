import React, {Component, createRef} from 'react';
import Try from './TryClass';

function getNumbers() {// 숫자를 네개 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for(let i = 0; i < 4; i++){
    const chosen = candidate.splice(Math.floor(Math.random() * (9-i)), 1)[0]; //floor는 무조껀 깍아서 처리
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(), //ex:[1,3,4,7]
    tries: [], //push를 쓰면 안된다
  };

  onSubmitForm = (e) => {
    const {value,tries,answer} = this.state;
    e.preventDefault();
    if(value === answer.join('')){
      this.setState((prevState) => {
        return {
          result: '홈런',
          tries: [...prevState.tries, {try: value, result: '홈런!'}], //push 대신 얇은 복사로 배열에 객체 넣음
        }
      });
      alert('게임을 다시 시작합니다');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus();
    }else{
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if(tries.length >= 9){
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다!}`,
        });
        alert('게임을 다시 시작합니다!');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      }else{
        for(let i = 0; i < 4; i += 1){
          if(answerArray[i] === answer[i]){
            strike += 1;
          }else if(answer.includes(answerArray[i])){
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return{
            tries: [...prevState.tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
            value: '',
          }
        });
        this.inputRef.current.focus();
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef(); //createRef() 를 사용하면 current를 사용하기 때문에 hooks처럼 current를 사용할수있다

  render(){
    const {result, value, tries} = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput}/>
          <button>입력</button>
        </form>
        <div>시도: {tries.length}</div>
        <ul>
          {tries.map((v,i) => {
            return (
              <Try key={`${i+1}차 시도: `} tryInfo={v} /> //이부분으로 교체작업
              /* <li key={`${i+1}차 시도 : `}>
                <div>{v.try}</div>
                <div>{v.result}</div>
              </li> */
            );
          })}
        </ul>
      </>
    );
  }
};

export default NumberBaseball; //import NumberBaseball;