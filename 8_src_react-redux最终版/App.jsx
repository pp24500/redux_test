
import React, { Component } from 'react';
import Count from './containers/Count';
import Person from './containers/Person';

export default class App extends Component {
  render() {
    return (
      <div>
        {/* 不需要在这里引入store，因为一旦组件多了，需要引入太多次store，把它放到外层 */}
        <Count/>
        <hr />
        <Person />
      </div>
    )
  }
}

