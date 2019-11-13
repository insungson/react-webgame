import React,{useState, useRef} from 'react';
import Try from './Try';

const getNumbers = () => {
  const candidates = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for(let i = 0; i < 4; i++){
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)),1)[0];
    array.push(chosen);
  }
  return array;
};

const NumberBaseball = () => {
  const [answer, setAnswer] = useState(getNumbers());
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [tries, setTries] = useState([]);
  const inputE1 = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(value === answer.join('')){
      setTries((prevtries) => ([...prevtries, {try: value, result:'홈런'}]));
      setResult('홈런');
      alert('게임을 다시 실행합니다!');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
      inputE1.current.focus();
    }else{
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if(tries.length >= 9){
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`);
        alert('게임을 다시 시작합니다');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputE1.current.focus();
      }else{
        console.log('답은', answer.join(''));
        for(let i = 0; i < 4; i++){
          if(answerArray[i] === answer[i]){
            console.log('strike', answerArray[i], answer[i]);
            strike += 1;
          }else if(answer.includes(answerArray[i])){
            console.log('ball', answerArray[i], answer.indexOf(answerArray[i])); 
            //indexof() ()의 인덱스번호를 알려줌
            ball += 1;
          }
        }
        setTries((prevtries) => (
          [...prevtries, {try:value, result:`${strike} 스트라이크 ${ball} 볼 입니다`,}]
        ));
        setValue('');
        inputE1.current.focus();
      }
    }
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input 
          ref={inputE1}
          maxLength={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>입력!</button>
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
        {tries.map((v,i) => (
          <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />
        ))}
      </ul>
    </>
  );
};

export default NumberBaseball;