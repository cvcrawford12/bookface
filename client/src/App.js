import React, { Component } from 'react';
import autoBind from 'react-autobind';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import store from 'store-js';
import Context from './actions/Context';

// Import Components and Containers
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/register/RegisterForm';
import DashboardContainer from './containers/DashboardContainer';
import FriendsList from './components/friends/FriendsList';
import RegisterDetails from './components/register/RegisterDetails';
import ProfileContainer from './containers/ProfileContainer';

const history = createBrowserHistory();
export const AppContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      user: {},
      authError: '',
      isAuthenticated: false,
      posts: [],
      loadingPosts: false
    }
  }
  componentDidMount() {
    if (store.get('token')) {
      this.loginUser();
    }
  }

  clearStore() {
    store.clearAll();
    this.setState({ user: {}, isAuthenticated: false });
  }

  loginUser(values = null) {
    const pathname = window.location.pathname;
    const pushToDash = pathname.includes('/login') || pathname.includes('/register') || pathname === '/';
    Context.loginUser(values)
      .then(json => {
        this.setState({user: json.user, isAuthenticated: true });
        // Only set token if we don't already have one
        if (!store.get('token')){
          store.set('token', json.token);
        }
        if (pushToDash) {
          history.push('/dashboard');
        }
      })
      .catch(e => {
        this.setState({ authError: e.message });
        store.clearAll();
        console.error(e);
        setTimeout(() => this.setState({ authError: ''}), 2000);
      });
  }

  registerUser(values) {
    Context.fetchWrapper('/auth/register', {method: 'POST', body: JSON.stringify(values)})
      .then((json) => {
        this.setState({ user: json.user });
        store.set('token', json.token);
        history.push('/register/details');
      })
      .catch((e) => {
        this.setState({ authError: e.message });
        store.clearAll();
        console.error(e);
        setTimeout(() => this.setState({ authError: ''}), 2000);
      })
  }

  editProfile(values) {
    Context.editProfile(values)
      .then((json) => {
        this.setState({ user: json.user });
        console.log(history, history.location);
        if (history.location.pathname.includes('/register')) {
          history.push('/dashboard');
        }
      })
      .catch((e) => {
        console.error(e);
      })
  }

  addOrDeleteFriend(id, shouldDelete) {
    return new Promise((resolve, reject) => {
      Context
      .fetchWrapper(`/profile/${shouldDelete ? 'deleteFriend' : 'addFriend'}`, { method: 'PUT', body: JSON.stringify({id}) })
      .then((json) => {
        this.setState({ user: json.user });
        resolve(json.user);
      })
      .catch((e) => reject(e));
    })
  }

  fetchPosts() {
    this.setState({ loadingPosts: true });
    Context.fetchWrapper('/social/posts', {
      method: 'GET'
    }).then((json) => {
      this.setState({ posts: json.posts, loadingPosts: false });
    }).catch((e) => console.error(e));
  }

  providers() {
    return {
      auth: {
        user: this.state.user,
        loginUser: this.loginUser,
        registerUser: this.registerUser,
        authError: this.state.authError
      },
      social: {
        posts: this.state.posts,
        fetchPosts: this.fetchPosts,
        editProfile: this.editProfile,
        loading: this.state.loadingPosts,
        addOrDeleteFriend: this.addOrDeleteFriend
      },
      clearStore: this.clearStore
    }
  }


  render() {
    return (
      <AppContext.Provider value={this.providers()}>
        <Router history={history}>
          <Header clearStore={this.clearStore} history={history} isAuthenticated={this.state.isAuthenticated}/>
          <div className="wrapper">
            <Route exact path="/" component={Landing}/>
            <Switch>
              <Route exact path="/login" component={LoginForm}/>
              <Route exact path="/register" component={RegisterForm}/>
              <Route exact path="/register/details" component={RegisterDetails}/>
              <Route exact path="/dashboard" component={DashboardContainer}/>
              <Route exact path="/dashboard/profile/edit" component={DashboardContainer}/>
              <Route exact path="/users" component={FriendsList} />
              <Route path="/profile/:id" component={ProfileContainer}/>
            </Switch>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
