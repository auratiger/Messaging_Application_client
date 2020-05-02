import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {setCurrentUser, logoutUser} from './store/actions/authentication';
import {setAuthToken} from './setAuthToken';

import MainPage from './containers/MainPage/MainPage';
import WelcomePage from './containers/WelcomePage/WelcomePage';
import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';
import EmailVerificationPage from './containers/EmailVerification/EmailVerificationPage';
import parseJwt from './jwtParser/parseJwt';

class App extends Component {

  componentDidMount(){
    if(localStorage.jwtToken) {      
      setAuthToken(localStorage.jwtToken);
      const decoded = parseJwt(localStorage.jwtToken);
    
      const currentTime = Date.now() / 1000;
      if(decoded.exp < currentTime) {
        this.props.logoutUser(this.props.history);
      }
    }           
  }

  renderUnAuthPage = () => {
    return (
      <Switch>
        <Route exact path="/welcomePage" component={WelcomePage}/>
        <Route exact path="/mainPage" component={MainPage}/>
        <Route exact path="/email_verification/verify/*/*" component={EmailVerificationPage}/>
        <Route exact path="/auth" component={Auth}/>
        <Route exact path="/" component={Auth}/>
        {/* <Redirect to="/welcomePage" component={WelcomePage}/> */}
      </Switch>
    )
  }

  renderAuthPage = () => {
    return(
      <Switch>
          <Route exact path="/resent/" component={MainPage}/>
          <Route exact path="/email_verification/verify/{id}" component={EmailVerificationPage}/>
          <Route exact path="/" component={MainPage}/>
          <Redirect to="/auth" component={Auth}/>
      </Switch>
    )
  }
  

  render(){        
    return (
        <Layout>
          {this.props.isAuthenticated ? this.renderAuthPage() : this.renderUnAuthPage()}
        </Layout>
      );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});

export default connect(mapStateToProps, {setCurrentUser, logoutUser})(App);


