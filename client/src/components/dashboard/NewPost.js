import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Modal, Button, ModalBody, FormGroup, InputGroup, Input, InputGroupAddon, Label } from 'reactstrap';
import { AvField, AvForm, AvInput, AvGroup } from 'availity-reactstrap-validation';
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

  postWithPhoto(values) {
    const file = document.getElementById('file').files[0];
    const data = new FormData();
    Object.keys(values).map(key => {
      data.append(key, key !== 'file' ? values[key] : file);
    });
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

  handleValidPost(event, values) {
    if (values.file) {
      this.postWithPhoto(values);
    } else {
      Context.fetchWrapper('/social/create/post', {
        method: 'POST',
        body: JSON.stringify(values)
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
  }

  updateFileText(e) {
    this.setState({ fileText: e.currentTarget.value.split('\\').pop() });
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggle} className="post-btn text-right"><i className="fas fa-plus"></i> New Post</Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalBody>
            <AvForm onValidSubmit={this.handleValidPost}>
              <AvField type="textarea" name="postText" id="postText" label="Post Text*" required/>
              <AvGroup>
                <Label for="file">Photo</Label>
                <InputGroup>
                  <div className="custom-file">
                    <AvInput type="file" className="custom-file-input" onChange={this.updateFileText} name="file" id="file" />
                    <label className="custom-file-label" htmlFor="file">{this.state.fileText}</label>
                  </div>
                </InputGroup>
              </AvGroup>
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
