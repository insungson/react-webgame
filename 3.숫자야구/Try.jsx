import React from 'react';

const Try = ({tryInfo}) => { //클래스와 다른 디스터럭팅을 한다
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
};

export default Try;