import React, {Component} from 'react';

class Try extends Component {
  render(){
    const {tryInfo} = this.props; //디스터럭팅을 하지 않으면 아래의 return에서 this.props.try 처럼 사용해야한다
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

export default Try;