// 引入Count的UI组件
import CountUI from '../../components/Count';

// 引入连接UI组件和redux的工具
import {connect} from 'react-redux';

// 引入action
import {createIncrementAction, createDecrementAction, createIncrementAsyncAction} from '../../redux/count_action'

/**
 * 1. mapStateToProps函数返回值就是通过props传递给UI组件的属性，相当于 <CountUI n={900}/>
 * 2. 在调用mapStateToProps得到状态时，react-redux已经提前调用过 
 *    store.getState()，并把结果作为mapStateToProps的入参，它的结果是0(state初始值)
 */
function mapStateToProps(state) {
  return {
    count: state,
  }
}

// mapDispatchToProps函数返回值就是传递给UI组件的操作状态的方法, 由于需要操作状态，所以参数有dispatch
function mapDispatchToProps(dispatch) {
  return {
    // 通知redux执行加法
    increment: number => dispatch(createIncrementAction(number)),
    decrement: number => dispatch(createDecrementAction(number)),
    incrementAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time)),
  }
}
/**
 * 1. 第一次调用参数为2个函数，
 * 2. 创建并暴露count的容器组件，UI组件和redux的连接发生在App组件里，作为第二次调用的参数
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(CountUI);