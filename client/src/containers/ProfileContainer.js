import React from 'react';
import { Container, Row, Col } from 'reactstrap'
import ProfileView from '../components/dashboard/ProfileView';

export default ({history, match}) => {
  return (
    <Container className="pt-1">
      <Row className="profile-spacing flex-wrap">
        <Col md={{size: 10, offset: 1}} sm={{size: 12, offset: 0}}>
          <ProfileView history={history} match={match}/>
        </Col>
      </Row>
    </Container>
  )
}
