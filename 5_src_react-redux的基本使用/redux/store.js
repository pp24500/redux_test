/*
  专门用于生成store对象，整个app只有这一个store对象
*/
import {createStore, applyMiddleware} from 'redux'
// import {legacy_createStore as createStore} from 'redux'

import countReducer from './count_reducer'

// 引入 redux thunk 用于支持异步action
import {thunk} from 'redux-thunk';

// 暴露store
export default createStore(countReducer, applyMiddleware(thunk))