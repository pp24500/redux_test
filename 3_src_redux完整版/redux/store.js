/*
  专门用于生成store对象，整个app只有这一个store对象
*/
import {createStore} from 'redux'
// import {legacy_createStore as createStore} from 'redux'
import countReducer from './count_reducer'
// 暴露store
export default createStore(countReducer)