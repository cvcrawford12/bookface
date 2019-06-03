import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import autoBind from 'react-autobind';
import store from 'store-js';
import ProfileView from '../components/dashboard/ProfileView';
import PostView from '../components/dashboard/PostView';
import { AppContext } from '../App';
import Context from '../actions/Context';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    if (!store.get('token')) {
      this.props.history.push('/login');
    }
    if (!this.props.posts.length) {
      this.props.fetchPosts();
    }
  }

  filterPosts() {
    if (this.props.posts.length) {
      return this.props.posts.filter(post => post.author._id === this.props.auth.user._id);
    }
    return [];
  }

  render() {
    return (
      <Container className="pt-1" fluid>
        <Row className="profile-spacing flex-wrap">
          <Col md="8" className="overflow-scroll">
            <ProfileView posts={this.filterPosts()} history={this.props.history}/>
          </Col>
          <PostView posts={this.props.posts} loading={this.props.loading}/>
        </Row>
      </Container>
    )
  }
}

export default props => (
  <AppContext.Consumer>
    {context => <DashboardContainer {...props} loading={context.social.loading} auth={context.auth} fetchPosts={context.social.fetchPosts} posts={context.social.posts}/>}
  </AppContext.Consumer>
)
