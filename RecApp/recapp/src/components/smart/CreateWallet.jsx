import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Modal from '../dumb/Modal'
import { Button, Container, Row, Col, Alert, Jumbotron, InputGroup, Input, InputGroupAddon } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ConfirmPassword from '../dumb/ConfirmPassword'

const styles = {
  noWalletDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

@inject('stores')
@observer
class CreateWallet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: true,
      saveMnemonics: this.props.stores.authStore.currentUser.saveMnemonics,
      generated: false,
      generatedValue: {},
      copied: false,
      inputText: '',
      typeChangeCount: 0,
      errorMessage: false,
      arrivedToLastSteps: false,
    }
    this.toggle = this.toggle.bind(this)
    // this.goToNext = this.goToNext.bind(this)
    this.copy = this.copy.bind(this)
    this.changeText = this.changeText.bind(this)
    this.save = this.save.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.saveWallet = this.saveWallet.bind(this)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  changeText(evt) {
    if (this.state.errorMessage) {
      this.setState({ errorMessage: false })
    }
    const count = this.state.typeChangeCount + 1;
    this.setState({ [evt.target.id]: evt.target.value, typeChangeCount: count })
  }

  save() {
    const generatedWallet = this.props.stores.clientStore.wallet
    if (this.state.inputText) {
      if (this.state.typeChangeCount < this.state.inputText.length) {
        this.setState({ errorMessage: true, inputText: '', typeChangeCount: 0 })
      } else {
        if (this.state.inputText === generatedWallet.wallet.mnemonic) {
          this.setState({ arrivedToLastSteps: true })
        }
      }
    } else {
      this.setState({ errorMessage: true })
    }
  }

  copy() {
    this.setState({ copied: true });
  }

  async generateWallet() {
    try {
      await this.props.stores.clientStore.createRandomWallet()
      this.setState({ generated: true })
    } catch (error) {
      return error
    }
  }

  handleChangeText(evt) {
    const { id, value } = evt.target
    this.setState({ [id]: value })
  }

  async saveWallet() {
    try {
      const { password, confirmPassword } = this.state
      if(password && confirmPassword) {
        await this.props.stores.authStore.saveWalletMnemonic({ password, confirmPassword })
        this.props.history.push('/')
      }
    } catch (error) {
      return error
    }
  }

  generateLayout() {
    const hasSaveMnemonics = this.state.saveMnemonics
    const generatedWallet = this.props.stores.clientStore.wallet
    const { password, confirmPassword } = this.state
    const values = {
      password,
      confirmPassword
    }

    if (!hasSaveMnemonics && !generatedWallet && !this.state.arrivedToLastSteps) {
      return (
        <Row>
          <Col style={styles.noWalletDiv}>
            <Button onClick={() => this.generateWallet()}>
              Generate My Wallet
            </Button>
          </Col>
        </Row>
      )
    } else if (generatedWallet && !this.state.copied && !this.state.arrivedToLastSteps) {
      return (
        <Row>
          <Col style={styles.noWalletDiv}>
            <InputGroup style={{ width: '70%' }} >
              <Input value={generatedWallet.wallet.mnemonic} disabled />
              <InputGroupAddon addonType="append">
                <CopyToClipboard text={generatedWallet.wallet.mnemonic} onCopy={this.copy}>
                  <Button style={styles.clip}>Copy</Button>
                </CopyToClipboard>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
      )
    } else if (generatedWallet && this.state.copied && !this.state.arrivedToLastSteps) {
      return (<Row>
        <Col style={styles.noWalletDiv}>
          <InputGroup style={{ width: '70%' }} >
            <Input value={this.state.inputText} id='inputText' onChange={this.changeText} />
            <InputGroupAddon addonType="append">
              <Button style={styles.clip} onClick={this.save}>Continue</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>)
    } else if (this.state.arrivedToLastSteps) {
      return (
        <ConfirmPassword
          handleChangeText={this.handleChangeText}
          values={values}
          saveWallet={this.saveWallet}
        />
      )
    }
  }

  render() {
    const text = this.state.copied ? 'Enter your mnemonics by typing :)' :
      'Note! Please save your mnemonic somewhere in a safe place!'

    return (
      <div>
        <Container style={{ height: '80%', marginTop: '5%' }}>
          <Jumbotron style={{ backgroundColor: 'rgb(0,0,0,0.1)', border: '1px solid #FFCC80' }}>
            {this.props.stores.clientStore.wallet && !this.state.arrivedToLastSteps &&
              <div style={styles.noWalletDiv}>
                <Alert color={this.state.errorMessage ? 'danger' : 'warning'} style={{ width: '60%', ...styles.noWalletDiv }}>
                  {text}
                </Alert>
              </div>
            }
            {this.generateLayout()}
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default withRouter(CreateWallet)