import React, { Component } from 'react'
import C from '../state_hooks'

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h3>我是Parent组件</h3>
        {/* Parent传递给A一个函数，这个函数会捕获到A的state.name，相当于子传父 */}
        <A render={(name) => <C name={name}/>}/>
      </div>
    )
  }
}

class A extends Component {
  state = { name: 'jack', }

  render() {
    return (
      <div>
        <h3>我是A组件</h3>
        {/* Parent给A传的render，调用结果是一个B标签，并且A将自己的state.name传递给Parent */}
        {this.props.render(this.state.name)} 
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div>
        <h3>我是B组件, {this.props.name}</h3>
      </div>
    )
  }
}
