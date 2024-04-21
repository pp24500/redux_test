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
