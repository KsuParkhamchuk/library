import React from 'react';

import './App.css';
import Header from './components/Header';
import Statistics from './components/Statistics';
import Registration from './components/Registration';
import Authentification from './components/Authentification';
import Home from './components/Home';
import AdminPage from './components/AdminPage';
import Creation from './components/Creation';
import { Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      parentName: 'App'
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/registration' component={Registration} />
          <Route path='/home' component={Home} />
          <Route path='/personalPage' component={AdminPage} />
          <Route path='/create' component={Creation} />
          <Route path='/statistics' component={Statistics} />
        </Switch>
      </div>
    )
  }
}

export default App;



