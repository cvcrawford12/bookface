import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardBody, FormGroup, Button } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { AppContext } from '../../App';
import RegisterContainer from '../../containers/RegisterContainer';

class LoginForm extends Component {
  handleValidSubmit = (event, values) => {
    this.props.auth.loginUser(values);
  }

  render() {
    return (
      <RegisterContainer>
        <Card className="card-shadow">
          <CardBody>
            <p>Don't have account? <Link to="register">Register</Link></p>
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <AvField label="Username" type="email" id="username" name="username" placeholder="johndoe@gmail.com"/>
              <AvField label="Password" type="password" id="password" name="password" placeholder="password"/>
              {this.props.auth.authError !== '' &&
                <p className="text-danger">{this.props.auth.authError}</p>
              }
              <FormGroup>
                <Button className="primary-bg">Log In</Button>
              </FormGroup>
            </AvForm>
          </CardBody>
        </Card>
      </RegisterContainer>
    )
  }
}

LoginForm.propTypes = {
  history: PropTypes.object.isRequired
};

export default props => (
  <AppContext.Consumer>
    {context => <LoginForm {...props} auth={context.auth}/>}
  </AppContext.Consumer>
);
