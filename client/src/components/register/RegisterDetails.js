import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Card, CardHeader, CardTitle, CardBody, FormGroup, Button, Label } from 'reactstrap';
import { AvField, AvForm, AvGroup } from 'availity-reactstrap-validation';
import RegisterContainer from '../../containers/RegisterContainer';
import { AppContext } from '../../App';

class RegisterDetails extends Component {

  handleValidSubmit = (e, values) => {
    console.log(this.props);
    const formattedData = this.formatData(values);
    this.props.editProfile(formattedData);
  }

  formatData(values) {
    return { ...values, hobbies: values.hobbies.trim().split(',') };
  }


  render() {
    return (
      <RegisterContainer>
        <Card className="profile-card">
          <CardHeader>
            <CardTitle>Please fill out the rest of your profile</CardTitle>
          </CardHeader>
          <CardBody>
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <AvField
                type="textarea"
                name="bio"
                label="Bio"
                placeholder="Tell us a little bit about yourself..."
                required
              />
              <AvField
                type="text"
                name="hobbies"
                label="Hobbies"
                placeholder="coding,baseball,skiing"
                required
              />
              <AvGroup>
                <Label className="font-weight-bold">Info</Label>
                <hr />
                <AvField type="text" name="info.location" label="Where do you live?" placeholder="Modesto, California" required/>
                <AvField type="text" name="info.birthday" label="Date of Birth?" placeholder="09/20/1995" required/>
                <AvField type="text" name="info.education" label="Education" placeholder="Cal Poly San Luis Obispo"/>
                <AvField type="text" name="info.job" label="Profession" placeholder="Software engineer"/>
              </AvGroup>
              <AvGroup>
                  <Label className="font-weight-bold">Favorites</Label>
                  <hr />
                  <AvField type="text" name="favorites.band" label="Favorite Band" placeholder="Queen" />
                  <AvField type="text" name="favorites.team" label="Favorite Sports Team" placeholder="San Francisco Giants" />
                  <AvField type="text" name="favorites.celebrity" label="Favorite Celebrity" placeholder="Emilia Clarke"/>
              </AvGroup>
              <FormGroup>
                <Button className="primary-bg">Submit</Button>
              </FormGroup>
            </AvForm>
          </CardBody>
        </Card>
      </RegisterContainer>
    )
  }
}

RegisterDetails.propTypes = {
  user: PropTypes.object.isRequired
};

export default props => (
  <AppContext.Consumer>
    {context => <RegisterDetails {...props} editProfile={context.social.editProfile} user={context.auth.user}/>}
  </AppContext.Consumer>
)
