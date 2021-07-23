import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 모듈 가져오기
// redux: react에서 상태를 더 효율적으로 관리하는 데 사용하는 상태 관리 라이브러리
// redux를 사용하면 스토어라는 개체 내부에 상태를 저장
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import 'antd/dist/antd.css';       // Ant Design 가져오기
import Reducer from './_reducers'; // Reducer 가져오기

// store : 애플리케이션의 상태 값들을 저장
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  // 어플리케이션에 Redux 연결
  <Provider store={createStoreWithMiddleware(Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )}
>
    <App />
  </Provider>
  , document.getElementById('root')
);

reportWebVitals();