import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import MainPage from './containers/MainPage/MainPage';
import WelcomePage from './containers/WelcomePage/WelcomePage';
import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';

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
            {this.props.securityToken == null ? this.renderUnAuthPage() : this.renderAuthPage()}
          </Layout>
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, null)(App);


