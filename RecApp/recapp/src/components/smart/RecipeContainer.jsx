import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Login from '../dumb/Login'
import { Button,Container } from 'reactstrap'
import RecipeView from '../dumb/RecipeView'

@inject('stores')
@observer
class RecipeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    // this.handleChangeText = this.handleChangeText.bind(this)
    // this.login = this.login.bind(this)
  }
 
  render() {
    return (
      <Container>
          <RecipeView recipe={this.props.stores.clientStore.selectedRecipe}/>
       </Container>
    );
  }
}

export default RecipeContainer