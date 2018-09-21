import React, { Component } from 'react';
import Navigator from './components/navigator'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './components/smart/Home'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigator />
          <Switch>
            <Route path='/' exact component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
