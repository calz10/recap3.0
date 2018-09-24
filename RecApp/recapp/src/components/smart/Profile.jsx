import React, { Component } from 'react'
import { Container } from 'reactstrap'
import AccountInfo from '../dumb/AccountInfo'
import { inject, observer } from 'mobx-react'

@inject('stores')
@observer
class Profile extends Component {
  componentDidMount(){
    const { clientStore } = this.props.stores
    console.log(clientStore.wallet)
  }
  render() {
    const { clientStore } = this.props.stores
    const wallet = clientStore.wallet
    const balance = clientStore.currentWalletBalance
    return (
      <Container style={{padding: '5%'}}>
        <AccountInfo
          address={wallet ? wallet.address: '00000'}
          balance={balance}
          privateKey={wallet.privateKey}
        />
      </Container>
    )
  }
}

export default Profile