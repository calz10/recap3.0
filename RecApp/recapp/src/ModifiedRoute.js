import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

class ModifiedRoute extends Component {
  render() {
    const user = this.props.user
    return (
      <Route path={`${this.props.path}`} component={() => {
        if (user) {
          return (<Redirect to="/dashboard" />)
        }
        return <Route {...this.props} />
      }} />
    )
  }
}

export default ModifiedRoute