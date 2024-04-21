import React, { Component } from 'react';

export default class Count extends Component {

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
  
  /**
   * 异步加法，需要用到异步action，不用原来的组件定时器
   */
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
