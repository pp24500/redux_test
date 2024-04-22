/*
  专门用于生成store对象，整个app只有这一个store对象.
  但是reducer可能有多个，需要把他们合并
*/
import {createStore, applyMiddleware, combineReducers} from 'redux'
// import {legacy_createStore as createStore} from 'redux'
import countReducer from './reducers/count'
import personReducer from './reducers/person'
// 引入 redux thunk 用于支持异步action
import {thunk} from 'redux-thunk';

// combineReducers()传入的对象参数就是reducer的总state, 把所有组件的reducer汇总成一个
// 后续的mapStateToProps中的state就是下面的参数对象
const allReducer = combineReducers({
  he: countReducer,
  ren: personReducer,
});

// 暴露store
export default createStore(allReducer, applyMiddleware(thunk))