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

const PasswordVerification = (props) => (
  <Row>
    <Col style={styles.noWalletDiv}>
      {/* <Alert color="success" style={{ width: '60%' }}>
        Create password for your wallet
        <FormText>(preferred different from current password use for login)</FormText>
      </Alert> */}
      <FormGroup style={{ width: '60%' }}>
        <Label for="password">Password</Label>
        <Input
          type='password'
          id='password'
          onChange={props.handleChangeText}
          value={props.password || ''}
        />
      </FormGroup>
    </Col>
  </Row>
)

export default PasswordVerification