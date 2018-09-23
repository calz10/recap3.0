import React, { Component } from 'react'
import {
	Form,
	FormGroup,
	Input,
	Label,
	FormText,
	FormFeedback,
	Button,
	InputGroup,
	InputGroupAddon
} from 'reactstrap'
import { Link } from 'react-router-dom'

const styles = {
	form: {
		margin: '3%'
	}
}
const Login = props => (
	<Form style={styles.form}>
		<h1>Login</h1>
		<FormGroup>
			<Label for="exampleEmail">Email</Label>
			<Input
				type='text'
				id='email'
				onChange={props.handleChangeText}
				value={props.values.email}
			/>
		</FormGroup>
		<FormGroup>
			<Label for="password">Password</Label>
			<Input 
				type='password'
				onChange={props.handleChangeText}
				id='password'
				value={props.values.password}
			/>
			<FormText style={{ float: 'right', cursor: 'pointer', padding: '5px' }}><Link to='/account-creation'> Create a new account</Link></FormText>
		</FormGroup>
		<FormGroup>
			<Button onClick={props.login}>Login</Button>
		</FormGroup>
	</Form>
)

export default Login