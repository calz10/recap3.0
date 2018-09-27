import React, { Component } from "react";
import { Row, Col, Button } from 'reactstrap'

const AccountInfo = (props) => (
  <Row style={{ border: '1px solid #FFCC80', backgroundColor: '#FFFDE7' }}>
    <Col style={{ padding: '5%' }}>
      <Row >
        <h3>Account Information</h3>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col md={4}>
              <h6>Address</h6>
            </Col>
            <Col md={8}>
              <h6 style={{ wordBreak: 'break-word' }}>
                {props.address}
              </h6>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col md={4}>
              <h6>Balance</h6>
            </Col>
            <Col md={8}>
              <h6 style={{ wordBreak: 'break-word' }}>
                {props.balance} eth
              </h6>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{paddingTop: '4px'}}>
        <Col>
          <Row>
            <Col md={4}>
              <h6>Private key</h6>
            </Col>
            <Col md={8}>
              <Button>Show</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{paddingTop: '4px'}}>
        <Col>
          <Row>
            <Col md={4}>
              <h6>Mnemonic</h6>
            </Col>
            <Col md={8}>
              <Button>Show</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{paddingTop: '4px'}}>
        <Col>
          <Row>
            <Col md={4}>
              <h6>File</h6>
            </Col>
            <Col md={8}>
              <Button onClick={props.openModal}>Wallet To JSON</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  </Row>
)

export default AccountInfo