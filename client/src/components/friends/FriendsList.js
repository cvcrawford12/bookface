import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { InputGroup, Input, InputGroupAddon, Button, Row, Col, Nav, NavItem, NavLink, ListGroup } from 'reactstrap';
import FriendsContainer from '../../containers/FriendsContainer';
import ProfileCard from './ProfileCard';
import Context from '../../actions/Context';
import { AppContext } from '../../App';
import Loader from '../loaders/Loader';

class FriendsList extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      activeTab: 0,
      users: [],
      loading: false,
      searchString: ''
    }
    this.debouncedSearch = Context.debounce(this.searchElastic, 200);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers(getFriends = false, friends = null) {
    this.setState({ loading: true });
    const url = getFriends ? '/friends/all' : '/profile/all';
    const options = getFriends
      ? {method:  'POST', body: JSON.stringify({friends: friends ? friends : this.props.user.friends})}
      : {method: 'GET'};
    Context
      .fetchWrapper(url, { ...options })
      .then((json) => this.setState({ users: json.users, loading: false }))
      .catch((e) => {
        this.setState({ loading: false });
        console.error(e);
      })
  }

  searchElastic(searchString) {
    const getFriends = this.state.activeTab === 1;
    const query = `?searchString=${searchString}`;
    // Determine URL (either search or get all users/friends) depending on tab
    let url;
    let options = { method: 'GET' };
    if (searchString === '') {
      url = getFriends ? '/friends/all' : '/profile/all';
    } else {
      url = getFriends ? `/api/friends/search/${query}` : `/api/search/${query}`;
    }
    // Determine options (GET or POST and add body if POST)
    if (getFriends) {
      options = { method: 'POST', body: JSON.stringify({friends: this.props.user.friends})};
    }
    Context.fetchWrapper(url, {
      ...options
    }).then((json) => {
      this.setState({ loading: false, users: json.users });
    }).catch((e) => {
      console.error(e);
      this.setState({ errorMessage: e.message, loading: false, users: [] });
    })
  }

  updateSearchString(e) {
    const searchString = e.currentTarget.value;
    this.setState({ searchString, loading: true });
    this.debouncedSearch(searchString);
  }

  updateActiveTab(e, activeTab) {
    if (this.state.activeTab !== activeTab) {
      this.setState({ activeTab });
      // Pass true if we want to get our friends not just all users
      const getUsers = activeTab === 1;
      this.fetchUsers(getUsers);
    }
  }

  addOrDeleteFriend(id, shouldDelete = false) {
    this.props.addOrDeleteFriend(id, shouldDelete)
      .then((user) => this.fetchUsers(shouldDelete, user.friends))
      .catch((e) => console.error(e));
  }

  render() {
    const length = Math.ceil(this.state.users.length / 2);
    const mid = Math.ceil(length / 2);
    return (
      <FriendsContainer>
        <Row>
          <Col md={{size: 6, offset: 3}}>
            <InputGroup className="justify-content-center mb-3 shadow" size="sm">
              <Input value={this.state.searchString} onChange={this.updateSearchString} className="light-input"/>
              <InputGroupAddon addonType="append">
                <Button className="primary-bg" onClick={this.searchElastic}>
                  <i className="fa fa-search" aria-hidden="true"/> Search
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Nav className="justify-content-center friends-tabs" tabs>
              <NavItem>
                <NavLink className={this.state.activeTab === 0 ? 'active' : ''} onClick={(e) => this.updateActiveTab(e, 0)}>
                    All Users
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={this.state.activeTab === 1 ? 'active' : ''} onClick={(e) => this.updateActiveTab(e, 1)}>
                    My Friends
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
        {this.state.users.length > 0 &&
          <Row className="pt-3">
            <Col md={{size: this.props.showFriendsTab ? 12 : 6, offset: 0}} sm={{size: 10, offset: 1}}>
              <Loader loading={this.state.loading}>
                <ListGroup>
                  {this.state.users.slice(0, mid).map((user, index) => {
                    return (
                      <ProfileCard
                        key={index}
                        user={user}
                        addOrDeleteFriend={this.addOrDeleteFriend}
                        isFriendsTab={this.state.activeTab === 1}
                      />
                    )
                  })}
                </ListGroup>
              </Loader>
            </Col>
            <Col md={{size: this.props.showFriendsTab ? 12 : 6, offset: 0}} sm={{size: 10, offset: 1}}>
              <Loader loading={this.state.loading}>
                <ListGroup>
                  {this.state.users.slice(mid, length).map((user, index) => {
                    return (
                      <ProfileCard
                        key={index}
                        user={user}
                        addOrDeleteFriend={this.addOrDeleteFriend}
                        isFriendsTab={this.state.activeTab === 1}
                      />
                    )
                  })}
                </ListGroup>
              </Loader>
            </Col>
          </Row>
        }
      </FriendsContainer>
    )
  }
}


export default props => (
  <AppContext.Consumer>
    {context => <FriendsList {...props} addOrDeleteFriend={context.social.addOrDeleteFriend} user={context.auth.user}/>}
  </AppContext.Consumer>
)
