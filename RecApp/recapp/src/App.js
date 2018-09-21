import React, { Component } from 'react';
import Navigator from './components/navigator'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './components/smart/Home'
import { Provider } from 'mobx-react'
import RootStore from './stores'

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={new RootStore()}>
        <div>
          <Navigator />
          <Switch>
            <Route path='/' exact component={Home} />
          </Switch>
        </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
