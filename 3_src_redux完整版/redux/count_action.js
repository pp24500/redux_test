import {INCREMENT, DECREMENT} from './constant';
/**
 * 为count组件创建action
 */
export const createIncrementAction = data => ({ type: INCREMENT, data, })

export const createDecrementAction = data => ({ type: DECREMENT, data, })