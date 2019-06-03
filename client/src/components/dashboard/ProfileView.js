import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Row, Col, Card, CardImg } from 'reactstrap';
import Photo from '../../assets/images/landing.jpg';
import Profile from '../../assets/images/profile.jpeg';
import { AppContext } from '../../App';
import AboutSection from './AboutSection';
import EditAboutSection from './EditAboutSection';
import Context from '../../actions/Context';
import ProfileCard from '../friends/ProfileCard';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      user: {},
      showFriendsTab: false
    }
  }

  componentDidMount() {
    if (this.props.match && this.props.match.params.id) {
      this.fetchProfile(this.props.match.params.id);
    }
  }

  fetchProfile(id) {
    Context
      .fetchWrapper(`/profile/user/${id}`, { method: 'GET' })
      .then((json) => this.setState({ user: json.user }))
      .catch((e) => console.error(e));
  }

  toggleEdit() {
    const url = window.location.pathname.includes('edit') ? '/dashboard' : '/dashboard/profile/edit';
    this.props.history.push(url);
  }

  toggleFriendsTab() {
    if (!this.props.history.location.pathname.includes('edit')) {
      this.setState({ showFriendsTab: !this.state.showFriendsTab });
    }
  }

  render() {
    const user = !Object.keys(this.state.user).length ? this.props.user : this.state.user;
    const location = this.props.history.location.pathname;
    return (
      <React.Fragment>
        <Row className="profile-row d-flex flex-wrap">
          <Col md="12" className="profile-col">
            <Card className="profile-card">
              <CardImg src={Photo} className="img-fluid profile-backdrop"/>
              <img className="profile-img-top" alt={"Profile Image"} src={Profile} />
              <div className="d-inline-flex flex-row-reverse button-group">
                <button onClick={this.toggleFriendsTab}>Friends</button>
                <button>Photos</button>
                {!location.includes('/profile') && <button onClick={this.toggleEdit}>{location.includes('edit') ? 'Dashboard' : 'Edit'}</button>}
                <a onClick={this.toggleFriendsTab} className="pr-4 align-self-center m-0 clickable">{Context.fullName(user)}</a>
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="profile-row">
          {!location.includes('edit') && !this.state.showFriendsTab &&
            <AboutSection user={user} loading={this.props.loading} posts={this.props.posts}/>
          }
          {location.includes('edit') && !this.state.showFriendsTab &&
            <EditAboutSection user={this.props.user}/>
          }
          {this.state.showFriendsTab &&
            <Col md="12" className="profile-col">
              <h5>Friends</h5>
              {user.friends.length ? user.friends.map((friend, index) => {
                console.log(friend);
                return (
                  <ProfileCard key={index} addOrDeleteFriend={this.props.addOrDeleteFriend} isFriendsTab={true} user={friend} />
                )
              }) : null}
            </Col>
          }
        </Row>
      </React.Fragment>
    )
  }
}

// ProfileView.propTypes = {
//   history: PropTypes.object.isRequired
// };

export default props => (
  <AppContext.Consumer>
    {context => <ProfileView {...props} addOrDeleteFriend={context.social.addOrDeleteFriend} loading={context.social.loading} user={context.auth.user}/>}
  </AppContext.Consumer>
);
