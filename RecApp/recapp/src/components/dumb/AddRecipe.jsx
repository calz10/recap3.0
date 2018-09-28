import React, { Component } from 'react'
import {
  Row,
  Col,
  FormGroup,
  Alert,
  Button,
  FormText,
  Label,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap'
const styles = {
  noWalletDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  padItem: {
    padding: '2%'
  }
}

const AddRecipe = (props) => (
  <Row style={{ width: '60vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {/* <Col>
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
    </Col> */}
    <Col>
      <Row style={styles.padItem}>
        <Col md={4} sm={12}>
          <p>Image</p>
        </Col>
        <Col sm={12} md={8}>
          <Input type="file" name="image" id="image" onChange={props.captureFile} />
          <FormText color="muted">
            Upload an image from your desktop
          </FormText>
        </Col>
      </Row>
      <Row style={styles.padItem}>
        <Col sm={12} md={4}>
          <p>Title</p>
        </Col>
        <Col md={8} sm={12}>
          <Input id='title' onChange={props.handleChangeText} />
        </Col>
      </Row>
      <Row style={styles.padItem}>
        <Col md={4} sm={12}>
          <p>Amount</p>
        </Col>
        <Col sm={12} md={8}>
          <Input id='amount' type='number' onChange={props.handleChangeText} />
        </Col>
      </Row>
      <Row style={styles.padItem}>
        <Col md={4} sm={12}>
          <p>Description</p>
        </Col>
        <Col md={8} sm={12}>
          <Input type="textarea" name="description" id="description" onChange={props.handleChangeText} />
        </Col>
      </Row>
      <Row style={styles.padItem}>
        <Col md={4}>
        </Col>
        <Col md={8}>
          {/* <Dropdown style={{width:'100%'}} group isOpen={props.dropdownOpen} size="sm" toggle={props.openDowndown}>
            <DropdownToggle caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
          <Dropdown onChange={(ev) => console.log(ev)} isOpen={props.dropdownOpen} onVakue toggle={props.openDowndown} direction='right'>
            <DropdownToggle color='info'>
              Recipe Type
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem  onClick={props.onSelected} id='free' defaultValue='free'>Free</DropdownItem>
              <DropdownItem onClick={props.onSelected} id='payable' defaultValue='payable'>Payable</DropdownItem>
            </DropdownMenu>
          </Dropdown>

        </Col>
      </Row>
      <Row style={styles.padItem}>
        <Col>
          <Button onClick={props.uploadFile}> UPLOAD RECIPE</Button>
        </Col>
      </Row>
    </Col>
  </Row >
)

export default AddRecipe