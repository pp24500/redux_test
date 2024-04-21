
import Count from './containers/Count'
import React, { Component } from 'react';
// 引入redux的store
import store from './redux/store';

export default class App extends Component {
  render() {
    return (
      <div>
        {/* Count UI组件和redux的连接在这里！ */}
        <Count store={store}/> 
      </div>
    )
  }
}

