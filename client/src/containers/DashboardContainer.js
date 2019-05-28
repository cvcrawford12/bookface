import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import store from 'store-js';
import ProfileView from '../components/dashboard/ProfileView';

class DashboardContainer extends Component {
  componentDidMount() {
    if (!store.get('token')) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <Container className="pt-4" fluid>
        <Row className="profile-spacing">
          <ProfileView />
        </Row>
      </Container>
    )
  }
}

export default DashboardContainer;
