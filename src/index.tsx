import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/Game/Game';
import App from './components/TestLazyLoad/TestLazyLoad';

  
  ReactDOM.render(
    <App
    pageSize={10}
    totalItems={1000}
    minLoadTime={250}
    maxLoadTime={1250}
  />,
    document.getElementById('root')
  );
  