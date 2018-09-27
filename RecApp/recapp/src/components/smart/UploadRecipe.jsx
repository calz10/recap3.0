import React, { Component } from 'react'
import { Container, Row, Button, FormGroup, Label, Input, } from 'reactstrap'
import AddRecipe from '../dumb/AddRecipe'
import axios from 'axios'
import { inject, observer } from 'mobx-react'

@inject('stores')
@observer
class UploadRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.captureFile = this.captureFile.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.test = this.test.bind(this)

  }

  componentDidMount() {
    const { clientStore } = this.props.stores
    console.log(clientStore.wallet)
  }


  async captureFile(event) {
    const file = event.target.files[0]
    let reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = async () => {
      const buffer = await this.convertToBuffer(reader)
      this.setState({ buffer })
    }
  }

  handleChangeText(evt) {
    const { id, value } = evt.target
    this.setState({ [id]: value })
  }


  async convertToBuffer(reader) {
    return await Buffer.from(reader.result)
  }
  // QmXrczi9fJhcmop4uWhKqXmfzba3MGrFw2TWXWoyQe95kY
  async uploadFile() {
    try {
      const imageHash = await this.props.stores.recipeStore.upload(this.state.buffer)
      const recipe = {
        title: this.state.title,
        description: this.state.description,
        imageHash
      }
      const objectJson = JSON.stringify(recipe)
      const buff = await Buffer.from(objectJson)
      const ipfsHash = await this.props.stores.recipeStore.upload(buff)
      const ipAdd = await axios.get('https://api.ipify.org/?format=json')
      const countryLocJSON = await axios(`http://api.ipstack.com/${ipAdd.data.ip}?access_key=dd049aa038290dd1e67d0825ad81ce67`)
      const data = {
        ipfsHash,
        type: 'payable',
        origin: countryLocJSON.data.country_name,
        amount: 2
      }
      const uploaded = await this.props.stores.recipeStore.addRecipe(data)
      console.log(uploaded)
    } catch (error) {
      throw new Error('Error in Uploading')
    }
  }
  // string hash, string recipeType, string origin, uint amount
  test() {
    console.log('test', this.state)
  }

  render() {

    return (
      <Container style={{ padding: '5%' }}>
        <AddRecipe
          handleChangeText={this.handleChangeText}
          values={this.state}
          captureFile={this.captureFile}
        />
        <Button onClick={this.uploadFile}>test</Button>
      </Container>
    )
  }
}

export default UploadRecipe