import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Modal, ModalBody, Button, ModalHeader, ModalFooter, Media, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { Link } from 'react-router-dom';
import Img from '../../assets/images/profile.jpeg';
import Context from '../../actions/Context';
import InteractionItems from './InteractionItems';

class ExpandedPost extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      comments: [],
      loading: true,
      commentText: '',
      errorMessage: '',
      successMessage: '',
      post: props.post,
      hasLiked: props.post.usersLiked.includes(props.userId)
    }
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments() {
    this.setState({ loading: true });
    Context
      .fetchWrapper(`/social/comments/${this.props.post._id}`, { method: 'GET' })
      .then((json) => this.setState({ comments: json.comments, loading: false, commentText: '' }))
      .catch((e) => {
        this.setState({ comments: [], loading: false });
        console.error(e);
      });
  }

  postComment() {
    const values = { postId: this.props.post._id, commentText: this.state.commentText };
    Context
      .fetchWrapper('/social/create/comment', { method: 'PUT', body: JSON.stringify(values) })
      .then(this.fetchComments)
      .catch((e) => console.error(e));
  }

  likePost() {
    const hasLiked = this.state.post.usersLiked.includes(this.props.userId);
    Context
      .fetchWrapper(`/social/post/${hasLiked ? 'unlike' : 'like'}/${this.props.post._id}`, { method: 'PUT'})
      .then((json) => this.setState({ hasLiked: !hasLiked, post: json.post }))
      .catch((e) => console.error(e));
  }

  bringFocusToInput() {
    document.getElementById('commentText').focus();
  }

  shouldPost(e) {
    if (e.keyCode === 13) {
      this.postComment();
    }
  }

  updateComment(e) {
    this.setState({ commentText: e.currentTarget.value });
  }

  render() {
    const { post, isOpen, toggle } = this.props;
    const { comments } = this.state;
    const commentsList = comments.length ? comments.map((comment, index) => {
      return (
        <Media key={index}>
          <Media body>
            <div className="d-inline">
              <img src={comment.author.avatar ? comment.author.avatar : Img} alt="Profile" className="comment-img"/>
              <div className="d-inline-flex flex-column">
                <strong className="post-author"><Link to={"/profile/" + comment.author._id}>{Context.fullName(comment.author)}</Link></strong>
                <small><p className="text-muted mb-1">{Context.formatDateTime(post.createdAt)}</p></small>
              </div>
              <div className="bubble shadow-sm d-flex flex-column">
                <p className="comment-text">{comment.commentText}</p>
              </div>
            </div>
          </Media>
        </Media>
      )
    }) : null;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <div className="d-inline">
            <img src={post.author.avatar ? post.author.avatar : Img} alt="" className="img-circle profile-img"/>
            <div className="d-inline-flex flex-column">
              <strong className="post-author"><Link to={"/profile/" + post.author._id}>{Context.fullName(post.author)}</Link></strong>
              <small><p className="text-muted">{Context.formatDateTime(post.createdAt)}</p></small>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column px-4">
            {post.image && <img className="post-image" src={post.image}/>}
            <p>{post.postText}</p>
            <div className="d-inline-flex emojis flex-row">
              <i className="fas fa-smile-beam"></i>
              <i className="fas fa-smile-wink"></i>
              <i className="fas fa-laugh-squint"></i>
              <span>{this.state.post.usersLiked.length}</span>
            </div>
            <InteractionItems
              hasLiked={this.state.hasLiked}
              likePost={this.likePost}
              bringFocusToInput={this.bringFocusToInput}
            />
          </div>
          <div className="comments-list">
            {comments.length > 0 &&
              <React.Fragment>
                <hr />
                <h6>Comments</h6>
              </React.Fragment>
            }
            {commentsList}
          </div>
        </ModalBody>
        <ModalFooter className="flex-column">
          <InputGroup className="mb-2 shadow comment-input">
            <Input id="commentText" value={this.state.commentText} name="commentText" onChange={this.updateComment} onKeyUp={this.shouldPost} type="text" placeholder="Write a comment..." />
            <InputGroupAddon addonType="append">
              <Button className="primary-bg" onClick={this.postComment}>
                <i className="fas fa-comments" aria-hidden="true"/> Post
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <small className="text-muted">Press Enter to Post</small>
        </ModalFooter>
      </Modal>
    )
  }
}

ExpandedPost.propTypes = {
  post: PropTypes.object.isRequired,
  userId: PropTypes.string
};

export default ExpandedPost;
