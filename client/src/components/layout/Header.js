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

    }
  }

  toggle() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  render() {
    const isAuthenticated = store.get('token') !== undefined;
    return (
      <Navbar expand="md" className="p-1" fixed="top">
        <Container fluid>
          <NavbarBrand tag={Link} to="/"><img src={Logo} width={70} alt="Bookface" /> Bookface</NavbarBrand>
          <React.Fragment>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ?
                  <NavItem onClick={this.logout}>Log Out</NavItem>
                  :
                  <NavItem><NavLink tag={Link} to="login">Log In</NavLink></NavItem>
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
};

export default Header;
