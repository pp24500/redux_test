

/**
 * 1. 创建为count服务的reducer，reducer是一个函数
 * 2. reducer有2个参数，之前的状态preState和action
 * 3. 给了preState一个默认值，当这个参数为undefined时，它会被赋予初始值
 */
const initState = 0; // 初始状态
export default function countReducer(preState = initState, action) {
  console.log(preState, action);

  // 从action对象获取type和data
  const { type, data } = action;
  // 根据type决定如何加工数据
  switch (type) {
    case 'increment':
      return preState + data;
    case 'decrement':
      return preState - data;
    default:
      return preState;
  }
}