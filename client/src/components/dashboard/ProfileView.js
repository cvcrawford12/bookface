import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Row, Col, Card, CardBody, CardImg, CardTitle, CardColumns, ListGroup, ListGroupItem, ButtonGroup, Button } from 'reactstrap';
import Photo from '../../assets/images/landing.jpg';
import { AppContext } from '../../App';
import DashboardContainer from '../../containers/DashboardContainer';
import AboutSection from './AboutSection';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    if (!Object.keys(this.props.user).length) {
      this.props.loginUser();
    }
  }

  render() {
    const user = !Object.keys(this.state.user).length ? this.props.user : this.state.user;
    return (
      <CardColumns>
        <Col md="8">
          <Row className="profile-row">
            <Col md="12" className="profile-col">
              <Card className="profile-card">
                <CardImg src={Photo} className="img-fluid profile-backdrop"/>
                <div className="d-inline-flex flex-row-reverse button-group">
                  <button>Friends</button>
                  <button>Photos</button>
                  <button>Edit</button>
                </div>
              </Card>
            </Col>
          </Row>
          <Row className="profile-row">
            <AboutSection user={user}/>
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
          </Row>
        </Col>
      </CardColumns>
    )
  }
}

// ProfileView.propTypes = {
//   history: PropTypes.object.isRequired
// };

export default props => (
  <AppContext.Consumer>
    {context => <ProfileView {...props} user={context.auth.user} loginUser={context.auth.loginUser}/>}
  </AppContext.Consumer>
);
