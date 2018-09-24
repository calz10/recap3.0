import React, { Component } from 'react'
import { Row, Col, FormGroup, Alert, Button, FormText, Label, Input } from 'reactstrap'
const styles = {
  noWalletDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}

const ConfirmPassword = (props) => (
  <Row>
    <Col style={styles.noWalletDiv}>
      <Alert color="success" style={{ width: '60%' }}>
        Create password for your wallet
        <FormText>(preferred different from current password use for login)</FormText>
      </Alert>
      <FormGroup style={{ width: '60%' }}>
        <Label for="password">Password</Label>
        <Input
          type='password'
          id='password'
          onChange={props.handleChangeText}
          value={props.values.password || ''}
        />
      </FormGroup>
      <FormGroup style={{ width: '60%' }}>
        <Label for="exampleEmail">Confirm Password</Label>
        <Input
          type='password'
          id='confirmPassword'
          onChange={props.handleChangeText}
          value={props.values.confirmPassword || ''}
        />
      </FormGroup>
      <FormGroup>
        <div style={{ backgroundColor: 'brown', width: '100%' }}>
          <Button onClick={props.saveWallet}>Save Wallet</Button>
        </div>
      </FormGroup>
    </Col>
  </Row>
)

export default ConfirmPassword