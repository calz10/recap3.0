import React, { Component } from 'react';
import { Button, Container, Col, Row, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { inject, observer } from 'mobx-react'
import { firebase } from '../../firebase'
import axios from 'axios'
import Modal from '../dumb/Modal'
import RecipeItem from '../dumb/RecipeInfo'
import ethers from 'ethers'

const styles = {
  recipeItem: {
    paddingBottom: '2%'
  }
}
@inject('stores')
@observer
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0, data: [], dropdownOpen: false }
    this.test = this.test.bind(this)
    // this.getData = this.getData.bind(this)
    this.toggle = this.toggle.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this)
    this.buyRecipe = this.buyRecipe.bind(this)
    this.viewRecipe = this.viewRecipe.bind(this)
  }
  async componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.stores.authStore.setUser(user)
      } else {
        this.props.stores.authStore.changeAuth()
      }
    })
    if (this.props.stores.recipeStore.wallet) {
      this.props.stores.recipeStore.viewContractWalletBalance()
    }
    // if (!this.props.stores.recipeStore.hasRetrieved) {
      await this.props.stores.recipeStore.getData()
    // }
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  async test() {
    const data = await this.props.stores.recipeStore.viewContractWalletBalance()
    console.log(data)
  }

  viewRecipe(recipe) {
    this.props.stores.clientStore.setSelectedRecipe(recipe)
    this.props.history.push('/view-recipe')
  }

  async removeRecipe(index) {
    try {
      const result = await this.props.stores.recipeStore.removeRecipe(index)
      console.log(result)
    } catch (error) {
      return error
    }
  }

  async buyRecipe(index) {
    try {
      const isAllowed = await this.props.stores.recipeStore.isAllowedToViewPayableRecipe(index)
      if (!isAllowed) {
        const book = await this.props.stores.recipeStore.buyRecipe(index)
        console.log(book)
      }
      console.log(isAllowed)
    } catch (error) {
      console.log(error)
    }
  }


  getRecipes() {
    const userWallet = this.props.stores.clientStore.wallet
    if (this.props.stores.recipeStore.data.length) {
      return this.props.stores.recipeStore.data.map((item, i) => {
        return (
          <Col md={4} style={styles.recipeItem} key={i}>
            <RecipeItem
              imageHash={item.imageHash}
              amount={item.ethAmount}
              title={item.title}
              description={item.description}
              recipeType={item.recipeType}
              isAllowed={item.isAllowed}
              owner={item.owner}
              removeRecipe={this.removeRecipe}
              index={i}
              buy={this.buyRecipe}
              hasWallet={userWallet ? true : false}
              buyRecipe={this.buyRecipe}
              recipe={item}
              viewRecipe={this.viewRecipe}
              userAddress={userWallet ? userWallet.address : '0x'}
            />
          </Col>
        )
      })
    }
    return null
  }
  
  render() {
    return (
      <Container>
        <Row style={{ width: '100%', padding: '2%' }}>
          <Col md={6} sm={12}>
            <h5>Available Recipes</h5>
            <h4>Pending Balance:{this.props.stores.recipeStore.contractBalance} eth</h4>
            <Button onClick={() => this.props.stores.recipeStore.cashOut()}>Withdraw</Button>
          </Col>
          <Col md={6} sm={12} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle style={{ backgroundColor: '#FFE0B2', color: 'black', border: '1px solid #FB8C00' }} caret>
                Filter By Country
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem>{this.props.stores.recipeStore.contractBalance}</DropdownItem>
                <DropdownItem>Africa</DropdownItem>
                <DropdownItem>Bulgaria</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
        {this.state.data &&
          <Row style={{ height: '700px', overflowY: 'auto' }}>
            {
              this.getRecipes()
            }
          </Row>
        }

      </Container>
    );
  }
}

export default Dashboard