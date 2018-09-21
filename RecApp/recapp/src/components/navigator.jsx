import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';
import { Link } from 'react-router-dom'
const styles = {
  navItem: {
    padding: '8px',
  },
  linkItem: {
    color: 'black'
  }
}
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
    });
  }
  render() {
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
              <NavItem style={styles.navItem}>
                <Link to="/components/" style={styles.linkItem}>GWA_PERTA</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigator