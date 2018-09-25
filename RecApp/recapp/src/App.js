import React, { Component } from 'react';
import Navigator from './components/navigator'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { firebase } from './firebase'
import Home from './components/smart/Home'
import Signup from './components/smart/SignupContainer'
import Dashboard from './components/smart/Dashboard'
import CreateWallet from './components/smart/CreateWallet'
import Profile from './components/smart/Profile'
import Upload from './components/smart/UploadRecipe'



import ProtectedRoute from './ProtectedRoute'
import ModifiedRoute from './ModifiedRoute'


import { Provider } from 'mobx-react'
import RootStore from './stores'
const styles = {
  bodyDiv: {
    heigth: '100%',
    width: '100%',
    position: 'fixed'
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  render() {
    return (
      <div sty={{ position: 'fixed', top: 0, backgroundColor: 'red', heigth: '100%', width: '100%' }}>
        <Router>
          <Provider stores={new RootStore()}>
            <div>
              <Navigator />
              <div style={styles.bodyDiv}>
                <Switch>
                  <ModifiedRoute path='/' exact component={Home} user={this.state.user} />
                  <ModifiedRoute path='/account-creation' component={Signup} user={this.state.user} />
                  <ProtectedRoute path='/create-wallet' component={CreateWallet} user={this.state.user} />                 
                  <ProtectedRoute path='/dashboard' component={Dashboard} user={this.state.user} />
                  <ProtectedRoute path='/profile' component={Profile} user={this.state.user} />
                  <ProtectedRoute path='/upload-recipe' component={Upload} user={this.state.user} />                
                </Switch>
              </div>
            </div>
          </Provider>
        </Router>
      </div>
    );
  }
}

export default App;
