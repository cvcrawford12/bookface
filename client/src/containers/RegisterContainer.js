import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class RegisterContainer extends Component {
  render() {
    return (
      <Container className="pt-4">
        <Row>
          <Col md={{size: 6, offset: 3}}>
            {this.props.children}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default RegisterContainer;
