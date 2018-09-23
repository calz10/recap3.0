import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from 'reactstrap';
import { observer, inject } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'

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

@inject('store')
@observer
class Navigator extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  async authenticate() {
    try {
      const result = await this.props.store.authStore.login({ password: 'pass', email: 'pass', repassword: 'pass' })
      console.log(`Login user: ${result.firstname}`)
    } catch (error) {
      console.log(error)
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    this.props.store.authStore.logout()
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        <Navbar style={styles.navBar} light expand="md">
          <NavbarBrand disabled>RecApp3.0</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem style={styles.navItem}>
                <Link style={styles.linkItem} to="/">Home</Link>
              </NavItem>
              <NavItem style={styles.navItem}>
                <Link style={styles.linkItem} to="/account-creation">Create Account</Link>
              </NavItem>
              <NavItem style={styles.navItem} onClick={() => this.logout()}>
                <h6>Logout</h6>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Navigator)