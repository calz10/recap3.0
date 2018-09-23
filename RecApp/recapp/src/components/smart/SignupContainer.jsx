import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Signup from '../dumb/Signup'


const styles = {
  signup: {
    diplay: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFDE7',
    width: '50%',
    margin: '2%',
    border: '1px solid #FFCC80',
    borderRadius: '5px'
  },
  outerForm: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

@inject('store')
@observer
class SignupContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChangeText = this.handleChangeText.bind(this)
    this.createUser = this.createUser.bind(this)
  }
  handleChangeText(evt) {
    const { id, value } = evt.target
    this.setState({ [id]: value })
  }
  
  async createUser() {
    const data = this.props.store.authStore.createNewUser(this.state)
    console.log(data, 'output')
  }

  render() {
    return (
      <div style={styles.outerForm}>
        <div style={styles.signup}>
          <Signup
            values={this.state}
            handleChangeText={this.handleChangeText}
            createUser={this.createUser}
          />
        </div>
      </div>
    );
  }
}

export default SignupContainer