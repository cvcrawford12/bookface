import React, { Component } from 'react';
import { Container } from 'reactstrap';

class FriendsContainer extends Component {
  render() {
    return (
      <Container className="pt-4">
        {this.props.children}
      </Container>
    )
  }
}

export default FriendsContainer;
