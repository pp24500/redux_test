import React from 'react';
import ReactDOM from 'react-dom'

export default function Demo() {

  const [count, setCount] = React.useState(0); // count初始值为0
  const [name, setName] = React.useState('Tom'); // 定义另一个state变量

  React.useEffect(() => {
    setInterval(()=> {
      setCount(count => count + 1)
    }, 1000);
  }, []);

  const myRef = React.createRef();

  function add() {
    setCount(count + 1); // 写法2
  }

  function changeName() {
    setName('Jerry');
  }

  function unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  }

  function show() {
    alert(myRef.current.value);
  }

  return (
    <div>
      <h2>当前求和为：{count}</h2>
      <h3>我的名字是: {name}</h3>
      <input type="text" ref={myRef}/>
      <button onClick={add}>点我+1</button>
      <button onClick={changeName}>改名</button>
      <button onClick={unmount}>卸载组件</button>
      <button onClick={show}>点我提示数据</button>
    </div>
  )
}