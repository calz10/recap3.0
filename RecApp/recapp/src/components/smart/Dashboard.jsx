import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class Dashboard extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div>
        <h1>test me luck</h1>
      </div>
    );
  }
}

export default Dashboard