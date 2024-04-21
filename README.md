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
