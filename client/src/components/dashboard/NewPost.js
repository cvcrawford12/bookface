import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Modal, Button, ModalBody, FormGroup } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import Context from '../../actions/Context';
import {AppContext} from '../../App';

class NewPost extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isOpen: false,
      errorMessage: ''
    }
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleValidPost(event, values) {
    let data;
    if (values.file) {
      const file = document.getElementById('file').files[0];
      data = new FormData();
      Object.keys(values).map(key => {
        data.append(key, key !== 'file' ? values[key] : file);
      })
    } else {
      data = JSON.stringify(values);
    }
    Context.fetchUploadWrapper('/social/create/post', {
      method: 'POST',
      body: data
    }).then(() => {
      this.setState({ successMessage: 'Successfully posted!'});
      this.props.fetchPosts();
      setTimeout(() => {
        this.setState({ successMessage: '', errorMessage: '', isOpen: false });
      }, 2000);
    }).catch(e => {
      this.setState({ errorMessage: e.message });
      setTimeout(() => {
        this.setState({ successMessage: '', errorMessage: '', isOpen: false });
      }, 2000)
    })
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggle} className="post-btn text-right"><i className="fas fa-plus"></i> New Post</Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalBody>
            <AvForm onValidSubmit={this.handleValidPost}>
              <AvField type="textarea" name="postText" id="postText" label="Post Text*" required/>
              <InputGroup> className="mb-2 shadow comment-input">
                <Label>Photo</Label>
                <Input type="file" name="file" id="file"/>
                <InputGroupAddon addOnType="append">
                  <Button></Button>
                </InputGroupAddon>
              </InputGroup>
              <AvField type="file" name="file" id="file" label="Post Image"/>
              {this.state.errorMessage !== '' &&
                <p className="text-danger">{this.state.errorMessage}</p>
              }
              {this.state.successMessage !== '' &&
                <p className="text-success">{this.state.successMessage}</p>
              }
              <FormGroup>
                <Button color="primary">Post</Button>
              </FormGroup>
            </AvForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {context => <NewPost {...props} fetchPosts={context.social.fetchPosts} />}
  </AppContext.Consumer>
)
