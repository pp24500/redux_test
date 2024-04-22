// 引入连接UI组件和redux的工具
import {connect} from 'react-redux';
// 引入action
import {createIncrementAction, createDecrementAction, createIncrementAsyncAction} from '../../redux/count_action'
import React, { Component } from 'react';

class Count extends Component {

  increment = () => {
    const { value } = this.selectNumber;
    this.props.increment(value * 1);
  }
  
  decrement = () => {
    const { value } = this.selectNumber;
    this.props.decrement(value * 1);
  }
  
  incrementIfOdd = () => {
    const { value } = this.selectNumber;
    if (this.props.count % 2 !== 0) {
      this.props.increment(value * 1);
    }
  }
  
  incrementAsync = () => {
    const { value } = this.selectNumber;
    this.props.incrementAsync(value * 1, 500);
  }

  render() {
    return (
      <div>
        <h1>当前求和为: {this.props.count}</h1>
        <select ref={e => this.selectNumber = e}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}

/**
 * 1. 第一次调用参数为2个函数，mapStateToProps, mapDispatchToProps, 状态和修改状态的函数
 * 2. 创建并暴露count的容器组件，作为第二次调用的参数
 */ 
export default connect(
  (state) => ({count: state,}), 
  (dispatch) => ({
    // 通知redux执行加法
    increment: number => dispatch(createIncrementAction(number)),
    decrement: number => dispatch(createDecrementAction(number)),
    incrementAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time)),
  })
)(Count);