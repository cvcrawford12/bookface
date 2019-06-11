import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from 'store-js';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, FormGroup, Button } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { AppContext } from '../../App';
import RegisterContainer from '../../containers/RegisterContainer';

class RegisterForm extends Component {
  componentDidMount() {
    if (store.get('token')) {
      this.props.auth.loginUser();
      console.log('Already authenticated, redirecting to dashboard');
    }
  }

  handleValidSubmit = (event, values) => {
    this.props.auth.registerUser(values);
  }

  render() {
    return (
      <RegisterContainer>
        <Card className="card-shadow">
          <CardBody>
            <p>Already have an account? <Link to="login">Log In</Link></p>
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <Row>
                <Col md="6">
                  <AvField label="First Name" type="text" id="firstName" name="firstName" placeholder="John"/>
                </Col>
                <Col md="6">
                  <AvField label="Last Name" type="text" id="lastName" name="lastName" placeholder="Doe"/>
                </Col>
              </Row>
              <AvField label="Username" type="email" id="username" name="username" placeholder="johndoe@gmail.com"/>
              <AvField label="Password" type="password" id="password" name="password" placeholder="password"/>
              {this.props.auth.authError !== '' &&
                <p className="text-danger">{this.props.auth.authError}</p>
              }
              <FormGroup>
                <Button className="primary-bg">Register</Button>
              </FormGroup>
            </AvForm>
          </CardBody>
        </Card>
      </RegisterContainer>
    )
  }
}

RegisterForm.propTypes = {
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default props => (
  <AppContext.Consumer>
    {context => <RegisterForm {...props} auth={context.auth} clearStore={context.clearStore}/>}
  </AppContext.Consumer>
);
