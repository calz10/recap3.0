import React, { Component } from 'react'
import { Container, Row, Button, FormGroup, Label, Input, } from 'reactstrap'
import AddRecipe from '../dumb/AddRecipe'
import axios from 'axios'
import { inject, observer } from 'mobx-react'
import ethers from 'ethers'

@inject('stores')
@observer
class UploadRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = { openDropdown: false}
    this.captureFile = this.captureFile.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.test = this.test.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.onSelected = this.onSelected.bind(this)
  }

  componentDidMount() {
    const { clientStore } = this.props.stores
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
  async convertToBuffer(reader) {
    return await Buffer.from(reader.result)
  }

  onSelected(event) {
    const value = event.target.id
    this.setState({type: value})
  }


  handleOpen() {
    this.setState({openDropdown: !this.state.openDropdown})
  }

  handleChangeText(evt) {
    const { id, value } = evt.target
    this.setState({ [id]: value })
  }



  async uploadFile() {
    try {
      if (this.state.buffer) {
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
          type: this.state.type,
          origin: countryLocJSON.data.country_name,
          amount: ethers.utils.parseEther(this.state.amount)
        }
        if (data.ipfsHash && data.type && data.amount > 0) {
          const uploaded = await this.props.stores.recipeStore.addRecipe(data)
          console.log(uploaded)
        }
      }
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
          uploadFile={this.uploadFile}
          dropdownOpen={this.state.openDropdown}
          openDowndown={this.handleOpen}
          onSelected={this.onSelected}
        />
      </Container>
    )
  }
}

export default UploadRecipe