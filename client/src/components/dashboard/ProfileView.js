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
import Loader from '../loaders/Loader';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      user: {},
      showFriendsTab: false,
      showPhotos: false
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
    const url = window.location.pathname.includes('edit') ? '/dashboard' : '/dashboard/edit';
    this.props.history.push(url);
  }

  showFriendsTab() {
    this.setState({ showFriendsTab: true });
  }

  togglePhotos() {
    this.setState({ showPhotos: !this.state.showPhotos, showFriendsTab: false });
  }

  backToDash() {
    this.setState({ showFriendsTab: false, showPhotos: false });
  }

  uploadFile(e) {
    const file = e.currentTarget.files[0];
    const data = new FormData();
    data.append('file', file);
    this.props.updateProfileImg(data);
  }

  render() {
    const user = !Object.keys(this.state.user).length ? this.props.user : this.state.user;
    const location = this.props.history.location.pathname;
    return (
      <React.Fragment>
        <Row className="profile-row d-flex flex-wrap">
          <Loader loading={this.props.loading}>
            <Col md="12" className="profile-col">
              <Card className="profile-card">
                <CardImg src={Photo} className="img-fluid profile-backdrop"/>
                <img className="profile-img-top" alt="Profile" src={user.avatar && user.avatar !== '' ? user.avatar : Profile} />
                <div className="d-inline-flex flex-row-reverse button-group">
                  <button onClick={this.showFriendsTab}>Friends</button>
                  <button onClick={this.togglePhotos}>Photos</button>
                  {!location.includes('/profile') && <button onClick={this.toggleEdit}>{location.includes('edit') ? 'Dashboard' : 'Edit'}</button>}
                  <button onClick={this.backToDash}>{Context.fullName(user)}</button>
                  {location.includes('edit') &&
                    <React.Fragment>
                      <label htmlFor="avatarUpload" className="clickable"><i className="fas fa-camera"></i> Edit</label>
                      <input id="avatarUpload" type="file" name="avatar" onChange={this.uploadFile} />
                    </React.Fragment>
                  }
                </div>
              </Card>
            </Col>
          </Loader>
        </Row>
        <Row className="profile-row">
          {!location.includes('edit') && !this.state.showFriendsTab && !this.state.showPhotos &&
            <AboutSection user={user} loading={this.props.loading} posts={this.props.posts}/>
          }
          {location.includes('edit') && !this.state.showFriendsTab && !this.state.showPhotos &&
            <EditAboutSection user={this.props.user}/>
          }
          {this.state.showFriendsTab &&
            <Col md="12" className="profile-col">
              <h5>Friends</h5>
              {user.friends.length ? user.friends.map((friend, index) => {
                return (
                  <ProfileCard key={index} addOrDeleteFriend={this.props.addOrDeleteFriend} isFriendsTab={true} user={friend} />
                )
              }) : null}
            </Col>
          }
          {this.state.showPhotos && user.photos.length > 0 &&
            <Col md="12" className="profile-col">
              <h5>Photos</h5>
              {user.photos.map((src, index) => {
                return (
                  <img className="img-fluid" src={src} key={index} alt=""/>
                )
              })}
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
    {context =>
      <ProfileView
        {...props}
        addOrDeleteFriend={context.social.addOrDeleteFriend}
        loading={context.social.loading || context.auth.loading}
        user={context.auth.user}
        updateProfileImg={context.social.updateProfileImg}
      />
    }
  </AppContext.Consumer>
);
