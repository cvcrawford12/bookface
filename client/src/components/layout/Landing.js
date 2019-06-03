import React from 'react';
import { Button, Container } from 'reactstrap';

export default (props) => {
  return (
    <div className="landing">
      <Container className="landing-inner" fluid>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h3>Welcome to Bookface! Connect and Share With Friends</h3>
          <div>
            <Button onClick={() => props.history.push('/login')} className="primary-bg mr-2">Login</Button>
            <Button onClick={() => props.history.push('/register')} className="primary-bg">Sign Up</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
