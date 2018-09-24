import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // UncontrolledButtonDropdown
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { observer, inject } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'
import { firebase } from '../firebase'

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
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  logout() {
    this.props.stores.authStore.changeAuth()
    firebase.auth().signOut()
  }
  render() {
    const { authStore } = this.props.stores
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
                // <NavItem style={styles.navItem} onClick={() => this.logout()} >
                //   <Button color='link' style={{ color: 'black' }} onClick={() => this.logout()}> Logout</Button>
                // </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret >
                    Settings
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to='/create-wallet'>Generate Wallet</Link>
                    </DropdownItem>
                    <DropdownItem onClick={() => this.logout()}>
                      Log out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Navigator)