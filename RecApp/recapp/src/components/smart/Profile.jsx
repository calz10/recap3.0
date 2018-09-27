import React, { Component } from 'react'
import { Container } from 'reactstrap'
import AccountInfo from '../dumb/AccountInfo'
import { inject, observer } from 'mobx-react'
import Modal from '../../components/dumb/Modal'
import { saveAs } from 'file-saver'
// import PasswordVerification from '../components/dumb/PasswordVerification'
import PasswordMask from 'react-password-mask';
const styles = {
  button: { backgroundColor: 'transparent', border: '1px solid gray', padding: '5px', height: '30px' }
}

@inject('stores')
@observer
class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      openModal: false
    }
    this.openModal = this.openModal.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.export = this.export.bind(this)
  }
  componentDidMount() {
    const { clientStore } = this.props.stores
    this.export = this.export.bind(this)
  }

  async export() {
    try {
      const wallet = this.props.stores.clientStore.wallet
      await this.props.stores.clientStore.encryptWallet(this.state.password, wallet)
      const encryptedWallet = sessionStorage.getItem('jsonWallet')
      const blob = new Blob([encryptedWallet], { type: "application/json" });
      saveAs(blob, "privateWallet.json");
      this.openModal()
    } catch (error) {
      return error
    }
  }

  handleChangeText(evt) {
    const { id, value } = evt.target
    this.setState({ [id]: value })
  }

  openModal() {
    this.setState({
      openModal: !this.state.openModal,
    })
  }
  render() {
    const { clientStore } = this.props.stores
    const wallet = clientStore.wallet
    const balance = clientStore.currentWalletBalance
    return (
      <Container style={{ padding: '5%' }}>
        <AccountInfo
          address={wallet ? wallet.address : '00000'}
          balance={balance}
          privateKey={wallet.privateKey}
          export={this.export}
          openModal={this.openModal}
        />
        <Modal
          toggle={this.openModal}
          isOpen={this.state.openModal}
          actionType={'Export Wallet'}
          triggerAction={this.export}
          title='New Password for Generated JSON'
        >
          <PasswordMask
            id="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleChangeText}
            buttonStyles={styles.button}
            inputStyles={{ padding: '3px', margin: '5px' }}
          />
        </Modal>
      </Container>
    )
  }
}

export default Profile