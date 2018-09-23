import React, { Component } from 'react'
import { Form, FormGroup, Input, Label, FormFeedback, Button, InputGroup, InputGroupAddon } from 'reactstrap'

const styles = {
  form: {
    margin: '3%'
  }
}
const SignUp = props => (
  <Form style={styles.form}>
    <h1>Sign-up</h1>
    <FormGroup>
      <Label for="exampleEmail">Email</Label>
      <Input
        type='text'
        id='email'
        value={props.values.email || ''}
        onChange={props.handleChangeText}
      />
    </FormGroup>
    <FormGroup>
      <Label for="password">Password</Label>
      <Input type='password'
        onChange={props.handleChangeText}
        value={props.values.password || ''}
        id='password'
      />
    </FormGroup>
    <FormGroup>
      <Label for="password">Confirm Password</Label>
      <Input type='password'
        onChange={props.handleChangeText}
        value={props.values.confirmPassword || ''}
        id='confirmPassword'
      />
    </FormGroup>
    <FormGroup>
      <Label for="name">Full Name</Label>
      <Input type='text'
        onChange={props.handleChangeText}
        value={props.values.fullname || ''}
        id='fullname'
      />
    </FormGroup>
    <FormGroup>
      <Button onClick={props.createUser}> Create Account</Button>
    </FormGroup>
  </Form>
)

export default SignUp