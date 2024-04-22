/*
  专门用于生成store对象，整个app只有这一个store对象.
  但是reducer可能有多个，需要把他们合并
*/
import {createStore, applyMiddleware} from 'redux'
// import {legacy_createStore as createStore} from 'redux'
// 引入 redux thunk 用于支持异步action
import {thunk} from 'redux-thunk';
import allReducer from './reducers/index';

// 暴露store
export default createStore(allReducer, applyMiddleware(thunk))