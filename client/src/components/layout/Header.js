import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from 'store-js';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';
import Logo from '../../logo.svg';
import {
  Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, Dropdown,
  DropdownToggle, DropdownItem, DropdownMenu, NavItem, NavLink
} from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      toggle: false
    }
  }

  toggle() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  logout() {
    this.props.clearStore();
    this.props.history.push('/login');
  }

  render() {
    const pathname = this.props.history.location.pathname;
    return (
      <Navbar expand="md" className="p-1" fixed="top">
        <Container fluid>
          <NavbarBrand tag={Link} to={this.props.isAuthenticated ? '/dashboard' : '/'}><i className="fas fa-book pr-2"></i> Bookface</NavbarBrand>
          <React.Fragment>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {this.props.isAuthenticated &&
                  <React.Fragment>
                    <NavItem><NavLink tag={Link} to="/users">All Users</NavLink></NavItem>
                    <NavItem onClick={this.logout} className="clickable ml-2 align-self-center">Log Out</NavItem>
                  </React.Fragment>
                }
                {!this.props.isAuthenticated &&
                  <NavItem>
                    <NavLink tag={Link} to={pathname.includes('/login') ? '/register' : '/login'}>
                      {pathname.includes('/login') ? 'Register' : 'Log In'}
                    </NavLink>
                  </NavItem>
                }
              </Nav>
            </Collapse>
          </React.Fragment>
        </Container>
      </Navbar>
    )
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  clearStore: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default Header;
