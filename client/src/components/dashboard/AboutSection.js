import React from 'react';
import { Card, CardBody, Col, ListGroup, ListGroupItem } from 'reactstrap';
import SocialFeed from './SocialFeed';
import Loader from '../loaders/Loader';

export default ({user, posts, loading}) => {
  return (
    <React.Fragment>
      <Col md="5" className="profile-col">
        <Loader loading={loading}>
          <Card className="profile-card">
            <CardBody>
              <h5>Intro</h5>
              <ListGroup className="about-list" flush>
                {user.info && Object.keys(user.info).map((key, index) => {
                  let iconClass = "fas fa-graduation-cap";
                  if (key === 'job') {
                    iconClass = 'fas fa-briefcase pr-1';
                  } else if (key === 'location') {
                    iconClass = 'fas fa-home pr-1';
                  } else if( key === 'birthday') {
                    iconClass = ' pr-1 fas fa-birthday-cake';
                  }
                  if (user.info[key] && user.info[key] !== '') {
                    return (<ListGroupItem key={index}><i className={iconClass}></i> {user.info[key]}</ListGroupItem>)
                  }
                  return null;
                })}
              </ListGroup>
            </CardBody>
          </Card>
        </Loader>
        <Loader loading={loading}>
          {user.favorites && Object.keys(user.favorites).length &&
            <Card className="profile-card">
              <CardBody>
                <h5>Favorites</h5>
                <ListGroup className="favorites-list" flush>
                  {Object.keys(user.favorites).map((key, index) => {
                    let iconClass = 'pr-1 fas fa-football-ball';
                    if (key === 'band') {
                      iconClass = 'pr-1 fas fa-music'
                    } else if (key === 'celebrity') {
                      iconClass = 'pr-1 fas fa-star';
                    }
                    if (user.favorites[key] && user.favorites[key] !== '') {
                      return (<ListGroupItem key={index}><i className={iconClass}></i> {user.favorites[key]}</ListGroupItem>)
                    }
                    return null;
                  })}
                </ListGroup>
              </CardBody>
            </Card>
          }
        </Loader>
        {user.hobbies && user.hobbies.length > 0 &&
          <Loader loading={loading}>
            <Card className="profile-card">
              <CardBody>
                <h5>Hobbies</h5>
                <div className="d-flex flex-wrap">
                  {user.hobbies.map((hobby, index) => {
                    return (<p className="hobby-text" key={index}>{hobby}</p>)
                  })}
                </div>
              </CardBody>
            </Card>
          </Loader>
        }
      </Col>
      <Col md="7" className="d-flex flex-column profile-col">
        <Loader loading={loading}>
          <Card className="profile-card">
            <CardBody>
              <h5>Bio</h5>
              <p>{user.bio}</p>
            </CardBody>
          </Card>
          {posts && posts.length > 0 &&
            <React.Fragment>
              <h5 className="pl-2 py-1">Posts</h5>
              <SocialFeed posts={posts} userId={user._id} loading={loading}/>
            </React.Fragment>
          }
        </Loader>
      </Col>
    </React.Fragment>
  )
}
