import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Login from '../dumb/Login'
import { Button } from 'reactstrap'


const styles = {
  signup: {
    diplay: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFDE7',
    width: '40%',
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

@inject('stores')
@observer
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChangeText = this.handleChangeText.bind(this)
    this.login = this.login.bind(this)
  }
  async openFromMnemonic() {
    const defaultMnemonic = "wave tortoise supreme lecture gold obvious flee goose toast ghost depend visual"
    const { clientStore } = this.props.stores
    try {
      await clientStore.loadWalletFromMnemonic(defaultMnemonic)
      console.log(clientStore.currentWalletBalance, 'updated test')
    } catch (error) {
      return error
    }
  }

  handleChangeText(evt) {
    const { id, value } = evt.target
    this.setState({ [id]: value })
  }

  login() {
    this.props.stores.authStore.login(this.state)
  }
  async getWalletBalance() { }

  render() {
    return (
      <div style={styles.outerForm}>
        <div style={styles.signup}>
          <Login
            handleChangeText={this.handleChangeText}
            values={this.state}
            login={this.login}
          />
        </div>
        {/* <Button onClick={()=> this.openFromMnemonic()}> tes</Button> */}
      </div>
    );
  }
}

export default Home