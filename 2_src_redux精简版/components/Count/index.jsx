import React, { Component } from 'react';
// 引入store，用于获取redux中保存的状态
import store from '../../redux/store';

export default class Count extends Component {

  increment = () => {
    const { value } = this.selectNumber;
    store.dispatch({ type: 'increment', data: value * 1 });
  }
  
  decrement = () => {
    const { value } = this.selectNumber;
    store.dispatch({ type: 'decrement', data: value * 1 });
  }
  
  incrementIfOdd = () => {
    const { value } = this.selectNumber;
    const count = store.getState();
    if (count % 2 !== 0) {
      store.dispatch({ type: 'increment', data: value * 1 });
    }
  }
  
  incrementAsync = () => {
    const { value } = this.selectNumber;
    setTimeout(() => {
      store.dispatch({ type: 'increment', data: value * 1 });
    }, 500);
  }
  

  render() {
    return (
      <div>
        <h1>当前求和为: {store.getState()}</h1>
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
