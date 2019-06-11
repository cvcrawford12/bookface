import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import { AppContext } from '../../App';

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
                {!this.props.isAuthenticated && pathname === '/' &&
                  <React.Fragment>
                    <NavItem><NavLink tag={Link} to="/login">Log In</NavLink></NavItem>
                    <NavItem><NavLink tag={Link} to="/register">Register</NavLink></NavItem>
                  </React.Fragment>
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

export default props => (
  <AppContext.Consumer>
    {context => <Header {...props} isAuthenticated={context.auth.isAuthenticated} clearStore={context.clearStore}/>}
  </AppContext.Consumer>
);
