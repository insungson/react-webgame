const React = require('react');
const {useState, useRef} = React;

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random()*9));
  const [second, setSecond] = useState(Math.ceil(Math.random()*9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputE1 = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(parseInt(value) === first * second){
      setResult('정답');
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      inputE1.current.focus();
    }else{
      setResult('땡');
      setValue('');
      inputE1.current.focus();
    }
  }; 

  return (
    <>
      <div>{first} 곱하기 {second} 는?</div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputE1}
          type='number'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>입력</button>
      </form>
      <div id='result'>{result}</div>
    </>
  );
};

module.exports = GuGuDan;