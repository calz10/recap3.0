import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { observer, inject } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'
import { firebase } from '../firebase'
import Modal from '../components/dumb/Modal'
import PasswordVerification from '../components/dumb/PasswordVerification'


const styles = {
  navItem: {
    padding: '8px',
  },
  linkItem: {
    color: 'black'
  },
  navBar: {
    backgroundColor: '#FFE0B2'
  }
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
      password: ''
    };
    this.openModal = this.openModal.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.openWallet = this.openWallet.bind(this)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  openModal() {
    this.setState({
      openModal: !this.state.openModal
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

  async openWallet() {
    const { authStore, clientStore } = this.props.stores
    if(authStore.currentUser) {
      try {
        const mnemonic = clientStore.decryptMnemonic(authStore.currentUser.encryptedMnemonic, this.state.password)
        await clientStore.loadWalletFromMnemonic(mnemonic)
        this.props.history.push('/profile')
        this.setState({openModal: false})
      } catch (error) {
        return error
      }
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
              {authStore.isAuthenticated &&
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
                    {!authStore.currentUser.savedMnemonic &&
                      <DropdownItem>
                        <Link to='/create-wallet'>Generate Wallet</Link>
                      </DropdownItem>
                    }
                    { authStore.currentUser.savedMnemonic && !wallet &&
                      <DropdownItem onClick={this.openModal}>
                        Open Wallet
                      </DropdownItem>
                    }
                    {wallet &&
                         <DropdownItem>
                         <Link to='/profile'>Wallet && Profile</Link>
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
          actionType='Continue'
          triggerAction={this.openWallet}
          title='Open Wallet'
        >
          <PasswordVerification
            password={this.state.password}
            handleChangeText={this.handleChangeText}
          />
        </Modal>

      </div>
    );
  }
}

export default withRouter(Navigator)