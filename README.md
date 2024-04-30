# Redux基本理解

### 什么时候需要使用redux？

1. 某个组件的状态，需要让其他组件可以随时拿到（共享）
2. 一个组件需要改变另一个组件的状态（通信）
3. 能不用就不用

### redux工作流程图

![](D:\学习\react\learn-redux\img\redux工作流程.jpg)



# redux三大核心

## action

action分2种：同步和异步。action为普通对象时，就是同步的，当它为函数时就是异步的。redux默认支持同步action，但是异步action需要`npm i redux-thunk`之后才能使用。

异步action可以把发请求的工作扔给redux，而不需要在组件内发请求

## store

redux工作流程的核心，相当于大堂经理

## reducer

实际干活的人



# React-redux

这是一个Facebook开发，使react和redux兼容性更好的库，它把react组件套上一个容器组件，让这个容器和store发生作用，这个容器使用`props`和UI组件通信

## 2个组件

#### UI组件

不能使用任何redux的api，只负责页面的呈现和交互

#### 容器组件

负责和redux通信，将结果交给UI组件



## 如何创建容器组件？

使用redux-react的connect函数

```js
connect(mapStateToProps, mapDispatchToProps)(UI组件)
```

- `mapStateToProps`, 负责把redux中store的state转为props，把状态值传递给UI组件
- `mapDispatchToProps`负责把redux中的dispatch转为props，把一些函数传递给UI组件



### react-redux优势

不用监测redux中状态的改变，不需要在最外层添加`store.subsribe()`



### reducer

reducer的函数必须是**纯函数**

> 纯函数：
>
> 1. 相同的输入，必然的到相同的输出
> 2. 不会产生任何副作用，例如网络和磁盘IO
> 3. 不得改写参数数据
> 4. 不能调用`Date.now(), Math.random()`等不纯的方法

```jsx
// 不合法的reducer
const initState = [{id: '001', name: 'Tom', age: 18}];
export default function personReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case ADD_PERSON:
      preState.unshift(data); // 不能改写参数！
      return preState; // 当传入相同的参数preState地址值不变，结果可能会变化
    default:
      return preState;
  }
}

// 合法的reducer
const initState = [{id: '001', name: 'Tom', age: 18}];
export default function personReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case ADD_PERSON:
      return [data, ...preState]; // 返回了一个新的对象
    default:
      return preState;
  }
}
```



# 补充知识

## lazy load

页面的路由组件可以使用懒加载，懒加载要和`<Suspense>`一起使用，作为懒加载失败的备胎

```jsx
import React, { Component, Suspense } from 'react';
import {NavLink, Route} from 'react-router-dom'

const Home = lazy(() => import('./Home')); // lazy load, 路由组件
const About = lazy(() => import('./About'));

export default class App extends Component {
  render() {
    return (
      <div>
        {/* 在懒加载组件外面包一层Suspense，否则会报错 */}
        <Suspense fallback={<h1>Loading.....</h1>}>
          <Route path='/about' component={About}/>
          <Route path='/about' component={Home}/>
        </Suspense>
      </div>
    )
  }
}
```



## Hooks

#### hooks是什么？

原本函数式组件只能使用props，hooks可以让在函数组件中使用state以及其他的React特性。

#### 常用hook1: state

state hook让函数组件可以使用state，进行读写操作

语法`const [xxx, setXxx] = React.useState(initValue)`， xxx是state的变量，setXxx是它的setter，initValue是初始化制定的state，并缓存，它不会被覆盖。

useState有2个写法：

1. `setXxx(newValue)`
2. `setXxx(value => newValue)`

```jsx
import React from 'react'

export default function Demo() {

  const [count, setCount] = React.useState(0); // 定义一个state，名为count，初始值为0
  const [name, setName] = React.useState('Tom'); // 定义另一个state变量, 初始值为Tom

  function add() {
    // setCount(count + 1); // 写法1
    setCount(count => count + 1); // 写法2
  }

  function changeName() {
    setName('Jerry');
  }

  return (
    <div>
      <h2>当前求和为：{count}</h2>
      <h3>我的名字是: {name}</h3>
      <button onClick={add}>点我+1</button>
      <button onClick={changeName}>改名</button>
    </div>
  )
}
```



### 常用hook2: effect

如果页面有个定时器，定时改变state，这个在类组件里可以在`componentDidMount`生命周期回调里添加定时器。那么在函数组件里如何实现呢？

可以使用`React.useEffect(function, dependencyList)`，参数1是类似于生命周期的回调函数，参数2是依赖的变量列表，

1. 如果不填写参数2，则是监控所有的变量，
2. 如果参数2是空数组，则不监控变量，相当于`componentDidMount`，全局调用一次
3. 如果参数2是某个状态变量，则参数1的回调就是这个状态量的变化响应回调
4. 如果参数1返回值是一个函数，则这个函数相当于`componentWillUnmount`的生命周期

```jsx
import React from 'react'

export default function Demo() {

  const [count, setCount] = React.useState(0); // count初始值为0
  const [name, setName] = React.useState('Tom'); // 定义另一个state变量

  React.useEffect(() => {
    let timer = setInterval(() => {
      setCount(count => count + 1)
    }, 1000);
    
    return () => clearInterval(timer); // 这个返回的函数相当于componentWillUnmount
  }, []); // 参数1是执行的函数，参数2是监控的变量列表，这里不监控任何变量，相当于componentDidMount

  function add() {
    setCount(count + 1);
  }

  function changeName() {
    setName('Jerry');
  }

  return (
    <div>
      <h2>当前求和为：{count}</h2>
      <h3>我的名字是: {name}</h3>
      <button onClick={add}>点我+1</button>
      <button onClick={changeName}>改名</button>
    </div>
  )
}
```



## ref hook

让函数组件也能使用ref，写法和类组件差不多。

```jsx
import React from 'react';
import ReactDOM from 'react-dom'

export default function Demo() {

  const myRef = React.createRef();

  function show() {
    alert(myRef.current.value);
  }

  return (
    <div>
      <input type="text" ref={myRef}/>
      <button onClick={show}>点我提示数据</button>
    </div>
  )
}
```



## Context: 一种祖孙组件通信方式

`React.createContext()`可以创建一个context，可以使某个组件的所有后代都能收到它传递的value。后代类组件使用时需要先声明context，然后从`this.context`里面去找传递的值，函数组件需要套一层consumer标签，标签内容为函数，参数是value

```jsx
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
```



## PureComponent

### Component的问题

1. 只要执行`setState()`，即使状态数据不变，组件也会重新渲染，效率低。
2. 只要当前组件重新渲染，它下面的子组件也会重新渲染，即使子组件没有使用父组件任何数据，效率低

### 如何提升效率？

只有当组件的state或者props数据发生改变时才重新渲染

### 原因

Component中的`shouldComponentUpdate()`生命周期永远返回true

### 解决方案1

重写`shouldComponentUpdate`，比较新旧state或者props，有变化则返回true，没变化返回false。但是当状态变量太多，这个方法就不好用了

### 解决方案2

使用`PureComponent`, 它的内部重写了`shouldComponentUpdate`，会对state、props和context进行**浅比较**，如果相同，则不会重新渲染。为了避免浅比较问题，在设定state和props时，把变量铺平，不要做数据结构，修改时新值最好是新建的字面值对象，而不是在老的对象上改属性

```js
/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA: mixed, objB: mixed): boolean {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x: mixed, y: mixed): boolean {
  // SameValue algorithm
  if (x === y) { // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}
```



## renderProps

如果有一个祖孙三代的组件，parent, A, B，正常写法如下

##### 正统写法

```jsx
import React, { Component } from 'react'

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h3>我是Parent组件</h3>
        <A />
      </div>
    )
  }
}

class A extends Component {
  state = { name: 'tom', }
  render() {
    return (
      <div>
        <h3>我是A组件</h3>
        <B name={this.state.name}/>
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
```



##### 灵活写法

但是还有一种写法，直接在Parent里面写完A和B的结构。这种写法的A和B的关系比较灵活，可以完全在Parent编码中决定父子关系。而且A和B的耦合度比上面的写法更小，因为上面的写法中，A一定会引用B。如果需要修改AB关系，则只需要修改Parent，不需要修改A

```jsx
export default class Parent extends Component {
  render() {
    return (
      <div>
        <h3>我是Parent组件</h3>
        <A>
          <B />  {/* 直接用A把B包起来 */}
        </A>
      </div>
    )
  }
}

class A extends Component {
  state = { name: 'tom', }

  render() {
    return (
      <div>
        <h3>我是A组件</h3>
        {/* props.children就是A标签体内容，即B标签。但是，如何把A的state.name传给B？ */}
        {this.props.children} 
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
```



##### 灵活写法补全

为了使上面的灵活写法能够传参，比如A传递给B，但同时A有没有引用B，不能像以前一样在编码时直接在A的render里传参给B标签。但是注意到A和B同时被Parent引用，所以应该在Parent里面下功夫：

```jsx
import React, { Component } from 'react'

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h3>我是Parent组件</h3>
        {/* Parent传递给A一个函数，这个函数会捕获到A的state.name，相当于子传父 */}
        <A render={(name) => <B name={name}/>}/>
      </div>
    )
  }
}

class A extends Component {
  state = { name: 'tom', }

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
```

这种写法的灵活性在于：A的子组件是谁由Parent来决定，而A里面只需要渲染这个收到的子组件，而且，B的位置可以被替代成别的组件

```jsx
import React, { Component } from 'react'
import C from '../state_hooks'

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h3>我是Parent组件</h3>
        {/* Parent制定A组件的子组件为C */}
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
        {/* 不管Parent传来哪个子组件，A都要渲染 */}
        {this.props.render(this.state.name)} 
      </div>
    )
  }
}
```

> 这个写法最大的用于：把第三方的组件放在自定义组件的某个位置
>
> 也被称为**插槽技术(Slot)**
