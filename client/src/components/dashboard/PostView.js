import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Col } from 'reactstrap';
import NewPost from './NewPost';
import SocialFeed from './SocialFeed';
import Context from '../../actions/Context';
import { AppContext } from '../../App';

class PostView extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isOpen: false
    }
  }

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
