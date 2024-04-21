import {INCREMENT, DECREMENT} from './constant';
/**
 * 为count组件创建action
 */
// 同步action，返回值是普通对象
export const createIncrementAction = data => ({ type: INCREMENT, data, })

export const createDecrementAction = data => ({ type: DECREMENT, data, })

// 异步action，返回值是一个函数. 
export const createIncrementAsyncAction = (data, time) => {
  // 当异步action传给store时，store会执行下面这个函数，并且把自己的dispatch作为参数
  return (dispatch) => {
    setTimeout(() => {
      dispatch(createIncrementAction(data)); // 调用对象是store
    }, time);
  };
}