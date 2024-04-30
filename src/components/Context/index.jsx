import React, { Component } from 'react'

const MyContext = React.createContext() // 创建context
export default class A extends Component {

  state = { name: 'Tom', age: 18}

  render() {
    const { name, age } = this.state
    return (
      <div>
        <h2>我是A组件</h2>
        <h3>我的用户名是{name}, 年龄{age}</h3>
        {/* 类似于redux从入口处传入store对象，这里使用自定义的context对象的provider，
            把子组件包住，这样B的所有后代都能收到这个value */}
        <MyContext.Provider value={{name, age}}>
          <B />
        </MyContext.Provider>
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div>
        <h2>我是B组件</h2>
        <C />
      </div>
    )
  }
}

class C extends Component {
  static contextType = MyContext; // 孙组件声明接收context

  render() {
    const { name, age } = this.context; // context是组件4大属性之一
    return (
      <div>
        <h2>我是C组件</h2>
        {/* 使用context接收传过来的value */}
        <h3>我从A接收的的用户名是{name}, 年龄{age}</h3>
        <D />
      </div>
    )
  }
}
// 函数组件
function D() {
  return <div>
    {/* 包裹一层consumer，内部一个函数，参数是context传来的value */}
    <MyContext.Consumer>
      { value => `我是D组件，我的名字是${value.name}, 年龄 ${value.age}` }
    </MyContext.Consumer>
  </div>
}