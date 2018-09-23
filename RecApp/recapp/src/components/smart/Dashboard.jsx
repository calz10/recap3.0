import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { inject, observer } from 'mobx-react'
import { firebase } from '../../firebase'

@inject('stores')
@observer
class Dashboard extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.stores.authStore.changeAuth(true)
      } else {
        this.props.stores.authStore.changeAuth()
      }
    })
  }

  render() {
    return (
      <div>
        <h1>test me luck</h1>
      </div>
    );
  }
}

export default Dashboard