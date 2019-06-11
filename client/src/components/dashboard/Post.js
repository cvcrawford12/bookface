import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Card, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Img from '../../assets/images/profile.jpeg';
import Context from '../../actions/Context';
import ExpandedPost from './ExpandedPost';

class Post extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { post, userId } = this.props;
    return (
      <React.Fragment>
        <Card className="profile-card">
          <CardBody>
            <div className="d-inline">
              <img src={post.author.avatar ? post.author.avatar : Img} alt="Profile" className="img-circle profile-img"/>
              <div className="d-inline-flex flex-column">
                <strong className="post-author"><Link to={"/profile/" + post.author._id}>{Context.fullName(post.author)}</Link></strong>
                <small><p className="text-muted">{Context.formatDateTime(post.createdAt)}</p></small>
              </div>
            </div>
            {post.image && post.image !== '' &&
              <img src={post.image} className="post-image" />
            }
            <p>{post.postText}</p>
            <Button onClick={this.toggle} className="primary-bg" block>View Post</Button>
          </CardBody>
        </Card>
        <ExpandedPost userId={userId} toggle={this.toggle} post={post} isOpen={this.state.isOpen} />
      </React.Fragment>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  userId: PropTypes.string
};

export default Post;
