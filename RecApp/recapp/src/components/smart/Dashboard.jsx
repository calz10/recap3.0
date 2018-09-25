import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { inject, observer } from 'mobx-react'
import { firebase } from '../../firebase'
import Modal from '../dumb/Modal'

@inject('stores')
@observer
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
    this.test = this.test.bind(this)
    this.getData = this.getData.bind(this)
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.stores.authStore.setUser(user)
      } else {
        this.props.stores.authStore.changeAuth()
      }
    })
  }

  async test() {
    const count = await this.props.stores.recipeStore.getRecipeCount()
    console.log(count.toNumber(), 'test')
    // this.setState({ count })
  }
  async getData() {
    const [owner, ipfsHash, recipeType, timeCreated, origin] = await this.props.stores.recipeStore.getRecipeAtIndex(1)
    const data = { owner, ipfsHash, recipeType, timeCreated: timeCreated.toNumber(), origin }
    this.setState({ data })
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        {this.state.data &&
          < div >
            <p>Hash: {this.state.data.ipfsHash}</p>
            <p>Origin: {this.state.data.origin}</p>
            <p>type: {this.state.data.recipeType}</p>
          </div>
        }

        <Button onClick={this.test}>Test</Button>
        <Button onClick={this.getData}>Get Data 1</Button>

      </div>
    );
  }
}

export default Dashboard