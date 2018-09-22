import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  NavLink,
 } from 'reactstrap';
 import { observer, inject} from 'mobx-react'
import { Link } from 'react-router-dom'

const styles = {
  navItem: {
    padding: '8px',
  },
  linkItem: {
    color: 'black'
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
      const result = await this.props.store.authStore.login({password: 'pass',email: 'pass',repassword:'pass'})
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

  render() {
    const { isAuthenticated } = this.props.store.authStore
    return (
      <div>
        <Navbar color="light" light expand="sm">
          <NavbarBrand href="/">RecApp3.0</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem style={styles.navItem}>
                <Link to="/" style={styles.linkItem}>Home</Link>
              </NavItem>
              <NavItem style={styles.navItem}>
                <Link  to="/components/" style={styles.linkItem}>Town</Link>
              </NavItem>
            {isAuthenticated &&
              <NavItem style={styles.navItem}>
                <Link to="/components/" style={styles.linkItem}>GWA_PERTA</Link>
              </NavItem>
            }
            </Nav>
          </Collapse>
        </Navbar>
        <Button onClick={() => this.authenticate()}>Test</Button>
      </div>
    );
  }
}

export default Navigator