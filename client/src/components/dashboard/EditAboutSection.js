import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button, Card, CardBody, Col, ListGroup, ListGroupItem, Input, Collapse, Label, InputGroup } from 'reactstrap';
import { AppContext } from '../../App';

class EditAboutSection extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      userInfo: {},
      isOpen: false,
      addHobbyValue: ''
    }
  }

  componentDidMount() {
    if (Object.keys(this.props.user).length) {
      this.setState({ userInfo: this.props.user });
    }
  }

  componentDidUpdate(prevProps) {
    if (Object.keys(prevProps.user).length !== Object.keys(this.props.user).length) {
      console.log(this.props.user);
      this.setState({ userInfo: this.props.user });
    }
  }

  updateUserInfo(e) {
    let userInfo = { ...this.state.userInfo };
    userInfo[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ userInfo });
  }

  updateHobby(e, index = null) {
    let userInfo = {...this.state.userInfo };
    const val = e.currentTarget.value;
    if (index !== null) {
      userInfo.hobbies[index] = val;
      this.setState({ userInfo, isOpen: false });
    } else {
      userInfo.hobbies.push(val);
      this.setState({ userInfo, isOpen: false, addHobbyValue: '' });
    }
  }

  saveUserInfo() {
    this.props.editProfile(this.state.userInfo);
  }

  addHobby() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  updateAboutInfo(e) {
    let userInfo = { ...this.state.userInfo };
    let aboutInfo = { ...userInfo.info };
    console.log(this.state.userInfo);
    aboutInfo[e.currentTarget.id] = e.currentTarget.value;
    userInfo.info = aboutInfo;
    this.setState({ userInfo });
  }

  updateFavInfo(e) {
    let userInfo = { ...this.state.userInfo };
    let favInfo = { ...userInfo.favorites };
    favInfo[e.currentTarget.id] = e.currentTarget.value;
    userInfo.favorites = favInfo;
    this.setState({ userInfo });
  }

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <Col md="5" className="profile-col">
          <Card className="profile-card">
            <CardBody>
              <h5>Intro</h5>
              <React.Fragment>
                <Label>Education</Label>
                <Input type="text" id="education" defaultValue={user.info && user.info.education ? user.info.education : ''} onBlur={this.updateAboutInfo}/>
              </React.Fragment>
              <React.Fragment>
                <Label>Profession</Label>
                <Input type="text" id="job" defaultValue={user.info && user.info.job ? user.info.job : ''} onBlur={this.updateAboutInfo}/>
              </React.Fragment>
              <React.Fragment>
                <Label>Residence</Label>
                <Input type="text" id="location" defaultValue={user.info && user.info.location ? user.info.location : ''} onBlur={this.updateAboutInfo}/>
              </React.Fragment>
              <React.Fragment>
                <Label>Birthday</Label>
                <Input type="text" id="birthday" defaultValue={user.info && user.info.birthday ? user.info.birthday : ''} onBlur={this.updateAboutInfo}/>
              </React.Fragment>
            </CardBody>
          </Card>
          <Card className="profile-card">
            <CardBody>
              <h5>Favorites</h5>
                <React.Fragment>
                  <Label>Band</Label>
                  <Input type="text" id="band" defaultValue={user.favorites && user.favorites.band ? user.favorites.band : ''} onBlur={this.updateFavInfo}/>
                </React.Fragment>
                <React.Fragment>
                  <Label>Sports Team</Label>
                  <Input type="text" id="team" defaultValue={user.favorites && user.favorites.team ? user.favorites.team : ''} onBlur={this.updateFavInfo}/>
                </React.Fragment>
                <React.Fragment>
                  <Label>Celebrity</Label>
                  <Input type="text" id="celebrity" defaultValue={user.favorites && user.favorites.celebrity ? user.favorites.celebrity : ''} onBlur={this.updateFavInfo}/>
                </React.Fragment>
            </CardBody>
          </Card>
          <Card className="profile-card">
            <CardBody>
              <div className="d-inline-flex flex-row hobby-header">
                <h5 className="d-inline">Hobbies</h5>
                <button className="plain-btn ml-auto" onClick={this.addHobby}><i className="fas fa-plus"></i> New</button>
              </div>
              <Collapse isOpen={this.state.isOpen}>
                <Input className="py-1" type="text" onBlur={(e) => this.updateHobby(e)}/>
              </Collapse>
              {user && user.hobbies && user.hobbies.length > 0 &&
                <ListGroup className="hobby-list" flush>
                  {user.hobbies.map((hobby, index) => {
                    return (
                      <li key={index}>
                        <Input className="py-1" type="text" defaultValue={hobby} onChange={(e) => this.updateHobby(e, index)}/>
                      </li>
                    )
                  })}
                </ListGroup>
              }
            </CardBody>
          </Card>
        </Col>
        {this.props.user && Object.keys(this.props.user).length > 0 &&
          <Col md="7" className="d-flex flex-column profile-col">
            <Card className="profile-card">
              <CardBody>
                <h5>Bio</h5>
                <Input style={{minHeight: "10rem"}} onChange={this.updateUserInfo} type="textarea" name="bio" id="bio" defaultValue={this.props.user.bio} />
                <Button className="mt-2" color="primary" onClick={this.saveUserInfo}>Save</Button>
              </CardBody>
            </Card>
          </Col>
        }
      </React.Fragment>
    )
  }
}

export default props => (
  <AppContext.Consumer>
    {context => <EditAboutSection {...props} user={context.auth.user} editProfile={context.social.editProfile} successMessage={context.social.successMessage} />}
  </AppContext.Consumer>
)
