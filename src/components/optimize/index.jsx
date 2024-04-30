import React, { Component, PureComponent } from 'react'

export default class Parent extends Component {
  render() {
    return (
      <div>
        我是Parent组件
        <Child />
      </div>
    )
  }
}

class Child extends Component {
  render() {
    return (
      <div>
        我是Child组件
      </div>
    )
  }
}
