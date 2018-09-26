import React, { Component } from 'react';
import { Button, Container, Col, Row, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { inject, observer } from 'mobx-react'
import { firebase } from '../../firebase'
import axios from 'axios'
import Modal from '../dumb/Modal'
import RecipeItem from '../dumb/RecipeInfo'

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
    this.getData = this.getData.bind(this)
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.stores.authStore.setUser(user)
        this.getData()
      } else {
        this.props.stores.authStore.changeAuth()
      }
    })
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  async test() {
    const count = await this.props.stores.recipeStore.getRecipeCount()
    console.log(count.toNumber(), 'test')
    this.setState({ count: count.toNumber() })
    // this.setState({ count })
  }
  async getData() {
    try {
      const count = await this.props.stores.recipeStore.getRecipeCount()
      let data = []
      const number = count.toNumber()
      for (let index = 0; index < number; index++) {
        const [owner, ipfsHash, recipeType, timeCreated, origin] = await this.props.stores.recipeStore.getRecipeAtIndex(index)
        const ipfsObject = await axios.get(`https://gateway.ipfs.io/ipfs/${ipfsHash}`)
        const value = { owner, ipfsHash, recipeType, timeCreated: timeCreated.toNumber(), origin, ...ipfsObject.data }
        data.push(value)
      }
      this.setState({ data })
    } catch (error) {
      return new Error
    }

  }
  getRecipes() {
    const userWallet = this.props.stores.clientStore.wallet
    console.log(userWallet, 'test')
    if (this.state.data.length) {
      return this.state.data.map((item) => {
        return (
          <Col md={4} style={styles.recipeItem}>
            <RecipeItem
              imageHash={item.imageHash}
              title={item.title}
              description={item.description}
              recipeType={item.recipeType}
              owner = {item.owner}
              userAddress = {userWallet ? userWallet.address: '0x'}
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
          </Col>
          <Col md={6}  sm={12} style={{display: 'flex', alignItems:'flex-end', justifyContent:'flex-end'}}>
            <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle style={{backgroundColor:'#FFE0B2' ,color: 'black',border: '1px solid #FB8C00'}}  caret>
                Filter By Country
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem>Philippines</DropdownItem>
                <DropdownItem>Africa</DropdownItem>
                <DropdownItem>Bulgaria</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
        {this.state.data &&
          <Row style={{ height: '700px', overflowY: 'auto' }}>
            {this.state.data.length > 0 &&
              this.getRecipes()
            }
          </Row>
        }
      </Container>
    );
  }
}

export default Dashboard