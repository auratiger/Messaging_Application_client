import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import MainPage from './containers/MainPage/MainPage';
import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render(){

    return (
        <div>
          <Layout>
            <Switch>
              <Route path="/auth" component={Auth}/>
              <Route path="/" component={MainPage}/>
            </Switch>
          </Layout>
        </div>
      );
  }
}

export default App;


