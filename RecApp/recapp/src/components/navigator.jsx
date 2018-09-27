import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Loading from 'react-loading'
import { saveAs } from 'file-saver'
import { observer, inject } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'
import PasswordMask from 'react-password-mask';
import { firebase } from '../firebase'
import Modal from '../components/dumb/Modal'
// import PasswordVerification from '../components/dumb/PasswordVerification'


const styles = {
  navItem: {
    padding: '8px',
  },
  linkItem: {
    color: 'black'
  },
  navBar: {
    backgroundColor: '#FFE0B2'
  },
  button: { backgroundColor: 'transparent', border: '1px solid gray', padding: '5px', height: '30px' }
}

@inject('stores')
@observer
class Navigator extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      openModal: false,
      password: '',
      type: '',
      openTransactionModal: false, 
      openImportModal: false,
      jsonWallet: ''
    };
    this.openModal = this.openModal.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.triggerAction = this.triggerAction.bind(this)
    this.uploadJSON = this.uploadJSON.bind(this)
    this.openImport = this.openImport.bind(this)
    this.handleSelected = this.handleSelected.bind(this)
    this.openTransaction = this.openTransaction.bind(this)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  openTransaction() {
    this.setState({openTransactionModal: !this.state.openTransactionModal})
  }
  async uploadJSON() {
    try {
      const jsonWallet = this.state.jsonWallet
      const decryptedWallet = await this.props.stores.clientStore.decryptWallet(jsonWallet, this.state.password)
      if (decryptedWallet) {
        await this.props.stores.clientStore.createRandomWallet(decryptedWallet.privateKey)
        this.openImport()
      }
    } catch (error) {
      return error
    }
  }

  openImport() {
    this.setState({ openImportModal: !this.state.openImportModal })
  }

  openModal(type) {
    this.setState({
      openModal: !this.state.openModal,
      type
    })
  }

  logout() {
    this.props.stores.authStore.changeAuth()
    firebase.auth().signOut()
  }

  handleChangeText(evt) {
    const { id, value } = evt.target
    this.setState({ [id]: value })
  }

  handleSelected(evt) {
    const files = evt.target.files
    const reader = new FileReader()

    if (files.length) {
      const file = files[0]
      reader.readAsText(file)
    }

    reader.onload = () => {
      const jsonWallet = reader.result
      this.setState({ jsonWallet })
    }
  }
  async triggerAction() {
    const { type } = this.state
    if (type === 'Continue') {
      const { authStore, clientStore } = this.props.stores
      if (authStore.currentUser) {
        try {
          const mnemonic = clientStore.decryptMnemonic(authStore.currentUser.encryptedMnemonic, this.state.password)
          await clientStore.loadWalletFromMnemonic(mnemonic)
          this.props.history.push('/profile')
          this.setState({ openModal: false })
        } catch (error) {
          return error
        }
      }
    } else {
      const { wallet } = await this.props.stores.clientStore.createRandomWallet()
      await this.props.stores.clientStore.encryptWallet(this.state.password, wallet)
      const encryptedWallet = sessionStorage.getItem('jsonWallet')
      const blob = new Blob([encryptedWallet], { type: "application/json" });
      saveAs(blob, "privateWallet.json");
      this.openModal()
    }
  }

  render() {
    const { authStore, clientStore } = this.props.stores
    const wallet = clientStore.wallet
    return (
      <div>
        <Navbar style={styles.navBar} light expand="md">
          <NavbarBrand disabled>RECAPP</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {!authStore.isAuthenticated &&
                <NavItem style={styles.navItem}>
                  <Link style={styles.linkItem} to="/">Home</Link>
                </NavItem>
              }
              {!authStore.isAuthenticated &&
                <NavItem style={styles.navItem}>
                  <Link style={styles.linkItem} to="/account-creation">Create Account</Link>
                </NavItem>
              }
              {authStore.isAuthenticated &&
                <NavItem style={styles.navItem}>
                  <Link style={styles.linkItem} to="/dashboard">Dashboard</Link>
                </NavItem>
              }
              {authStore.isAuthenticated && wallet &&
                <NavItem style={styles.navItem}>
                  <Link style={styles.linkItem} to="/upload-recipe">Upload Recipe</Link>
                </NavItem>
              }
              {authStore.isAuthenticated &&
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret >
                    {this.props.stores.authStore.currentUser.fullname}
                  </DropdownToggle>
                  <DropdownMenu right>
                    {(!authStore.currentUser.savedMnemonic) &&
                      <div>
                        <DropdownItem divider />
                        <DropdownItem disabled>
                          Generate Wallet
                        </DropdownItem>
                        <DropdownItem>
                          <Link style={styles.linkItem} to='/create-wallet'> Mnemonic WALLET</Link>
                        </DropdownItem>
                        <DropdownItem onClick={() => this.openModal('Download')}>
                          JSON WALLET
                        </DropdownItem>
                        <DropdownItem divider />
                      </div>
                    }
                    {authStore.currentUser.savedMnemonic && !wallet &&
                      <DropdownItem onClick={() => this.openModal('Continue')}>
                        Open Mnemonic Wallet
                      </DropdownItem>
                    }
                    {!wallet &&
                      <DropdownItem onClick={this.openImport}>
                        Import JSON Wallet
                     </DropdownItem>
                    }
                    {wallet &&
                      <DropdownItem>
                        <Link style={styles.linkItem} to='/profile'>Wallet && Profile</Link>
                      </DropdownItem>
                    }
                    <DropdownItem onClick={() => this.logout()}>
                      Log out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
            </Nav>
          </Collapse>
        </Navbar>
        <Modal
          toggle={this.openModal}
          isOpen={this.state.openModal}
          actionType={this.state.type}
          triggerAction={this.triggerAction}
          title='Wallet Verification'
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
        <Modal
          toggle={this.openImport}
          isOpen={this.state.openImportModal}
          actionType={'Open'}
          triggerAction={this.uploadJSON}
          title='Wallet Verification'
        >
          <input type='file' onChange={this.handleSelected} />
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
        <Modal
          toggle={() => this.openTransaction}
          isOpen={this.props.stores.modalOpen}
          actionType={'Done'}
          triggerAction={() => this.props.stores.normalize()}
          title={`Transaction`}
          hash={this.props.stores.transactionHash}
          done={this.props.stores.transactionItemDone}
          transaction={true}
        >
        <div style={{width: '100%', display: 'flex', direction: 'column', justifyContent: 'center', alignItems: 'center'}}>
          {(!this.props.stores.transactionItemDone) ?
            <Loading type={'spin'} color={'blue'} height={50} width={50}/>:
            <h6>{this.props.stores.transactionMessage}</h6>
          }
        </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Navigator)