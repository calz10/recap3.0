import React, { Component } from 'react'
import { Redirect, Route} from 'react-router-dom'

class PrivateRoute extends Component {
  render() {
    const user = this.props.user
    if (user) return <Route {...this.props} />
    return <Redirect to="/" />
  }
}

export default PrivateRoute