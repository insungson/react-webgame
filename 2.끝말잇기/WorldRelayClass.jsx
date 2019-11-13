const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: '쏘니',
    value: '',
    result: '',
  };

  onSubmitForm = (e) => { //클래스 내에 이런 것들이 객체의 속성을 선언하는 것이다
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: '딩동댕',
        word: this.state.value,
        value: '',
      });
      this.input.focus();
    } else {
      this.setState({
        result: '땡',
        value: '',
      });
      this.input.focus();
    }
  };

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  input; // 클래스 내에서 this.input을 생성 (이것도 클래스네에서 객체의 속성을 선언하는것이다)

  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
          <button>클릭!!!</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
