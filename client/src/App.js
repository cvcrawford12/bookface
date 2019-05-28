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

const history = createBrowserHistory();
export const AppContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      user: {},
      authError: ''
    }
  }
  componentDidMount() {
    if (store.get('token')) {
      // this.loginUser();
    }
  }

  clearStore() {
    store.clearAll();
    this.setState({ user: {} });
  }

  loginUser(values) {
    Context.loginUser(values)
      .then(json => {
        this.setState({user: json.user});
        // Only set token if we don't already have one
        if (!store.get('token')){
          store.set('token', json.token);
        }
        history.push('/dashboard');
      })
      .catch(e => {
        this.setState({ authError: e.message });
        store.clearAll();
        console.error(e);
        setTimeout(() => this.setState({ authError: ''}), 2000);
      });
  }

  registerUser(values) {
    Context.registerUser(values)
      .then((json) => {
        this.setState({ user: json.user });
        store.set('token', json.token);
      })
      .catch((e) => {
        this.setState({ authError: e.message });
        store.clearAll();
        console.error(e);
        setTimeout(() => this.setState({ authError: ''}), 2000);
      })
  }

  providers() {
    return {
      auth: {
        user: this.state.user,
        loginUser: this.loginUser,
        registerUser: this.registerUser,
        authError: this.state.authError
      },
      clearStore: this.clearStore,
    }
  }


  render() {
    return (
      <AppContext.Provider value={this.providers()}>
        <Router history={history}>
          <Header />
          <div className="wrapper">
            <Route exact path="/" component={Landing}/>
            <Switch>
              <Route path="/login" component={LoginForm}/>
              <Route path="/register" component={RegisterForm}/>
              <Route path="/dashboard" component={DashboardContainer}/>
            </Switch>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
