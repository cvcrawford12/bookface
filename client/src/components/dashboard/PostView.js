import React, { Component } from 'react';
import { Col } from 'reactstrap';
import NewPost from './NewPost';
import SocialFeed from './SocialFeed';
import { AppContext } from '../../App';

class PostView extends Component {
  render() {
    return (
      <Col md="4" className="overflow-scroll">
        <NewPost user={this.props.user}/>
        <SocialFeed posts={this.props.posts} userId={this.props.userId} loading={this.props.loading}/>
      </Col>
    );
  }
}

// PostView.propTypes = {
//   user: PropTypes.object.isRequired
// };

export default props => (
  <AppContext.Consumer>
    {context => <PostView {...props} userId={context.auth.user._id}/>}
  </AppContext.Consumer>
)
