/**
 * 改文件用于汇总所有的reducers
 */
import {combineReducers} from 'redux'
import count from './count'
import persons from './person'

// combineReducers()传入的对象参数就是reducer的总state, 把所有组件的reducer汇总成一个
export default combineReducers({
  count,
  persons,
});