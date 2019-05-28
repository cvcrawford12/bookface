import React from 'react';
import { Card, CardBody, Col, ListGroup, ListGroupItem } from 'reactstrap';

export default ({user}) => {
  return (
    <React.Fragment>
      <Col md="5" className="profile-col">
        <Card className="profile-card">
          <CardBody>
            <h5>About</h5>
            <ListGroup className="about-list" flush>
              <ListGroupItem><i className="fas fa-graduation-cap"></i> Studied at Cal Poly San Luis Obispo</ListGroupItem>
              <ListGroupItem><i className="fas fa-graduation-cap"></i> Studied at Cal Poly San Luis Obispo</ListGroupItem>
              <ListGroupItem><i className="fas fa-graduation-cap"></i> Studied at Cal Poly San Luis Obispo</ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </Col>
      <Col md="7" className="d-flex flex-column profile-col">
        <Card className="profile-card">
          <CardBody>
            <h5>Bio</h5>
            <p>{user.bio}</p>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}
