import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {setCurrentUser, logoutUser} from './store/actions/authentication';
import {setAuthToken} from './setAuthToken';

import MainPage from './containers/MainPage/MainPage';
import WelcomePage from './containers/WelcomePage/WelcomePage';
import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';
import parseJwt from './jwtParser/parseJwt';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = parseJwt(localStorage.jwtToken);
  setCurrentUser(decoded);

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    logoutUser();
    window.location.href = '/auth'
  }
}

class App extends Component {

  renderUnAuthPage = () => {
    return (
      <Switch>
        <Route path="/welcomePage" component={WelcomePage}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/" component={Auth}/>
        <Redirect to="/welcomePage" component={WelcomePage}/>
      </Switch>
    )
  }

  renderAuthPage = () => {
    return(
      <Switch>
          <Route path="/resent/" component={MainPage}/>
          <Route path="/" component={MainPage}/>
      </Switch>
    )
  }
  

  render(){   
    return (
        <div>
          <Layout>
            {this.props.isAuthenticated ? this.renderAuthPage() : this.renderUnAuthPage()}
          </Layout>
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  errors: state.errors,
});

export default connect(mapStateToProps, {setCurrentUser, logoutUser})(App);


