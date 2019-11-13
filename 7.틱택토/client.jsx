import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';

import TicTecToe from './TicTecToe';

const Hot = hot(TicTecToe);

ReactDOM.render(<Hot/>, document.querySelector('#root'));