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

const AddRecipe = (props) => (
  <Row style={{ width: '60vw'}}>
    <Col>
      <Row>
        <Label for="image" sm={12} md={2}>Image</Label>
        <Col sm={12} md={10}>
          <Input type="file" name="image" id="image" onChange={props.captureFile}/>
          <FormText color="muted">
            Upload an image from your desktop
            </FormText>
        </Col>
      </Row >
      <Row style={{padding: '2%'}}>
        <Label for="exampleEmail" sm={12} md={2}>Title</Label>
        <Col sm={12} md={10}>
          <Input  id='title' onChange={props.handleChangeText}/>
        </Col>
      </Row>
      <Row>
        <Label for="description" sm={2}>Steps</Label>
        <Col>
          <Input type="textarea" name="description" id="description" onChange={props.handleChangeText} />
        </Col>
      </Row>
    </Col>
  </Row>
)

export default AddRecipe