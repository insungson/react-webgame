const React = require('react');
const {useState} = require('react');

const WordRelay = () => {
    const [word, setWord] = useState('쏘니');
    const [value, setValue] = useState('');
    const [result,setResult] = useState('');
    const inputE1 = React.useRef(null);

  const onSubmitForm = (e) => { //클래스 내에 이런 것들이 객체의 속성을 선언하는 것이다
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
        setResult('딩동댕');
        setWord(value);
        setValue('');
        inputE1.current.focus();
    } else {
        setResult('땡');
        setValue('');
      inputE1.current.focus();
    }
  };

  const onChangeInput = (e) => {
     setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputE1} value={value} onChange={onChangeInput} />
        <button>클릭!!!</button>
      </form>
      <div>{result}</div>
    </>
  );
}

module.exports = WordRelay;
