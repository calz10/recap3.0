import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardLink, Row, Col, CardTitle, CardSubtitle
} from 'reactstrap';

const style = {
  makeItCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}
const Example = (props) => {
  return (
    <Row style={{ paddingTop: '3%', height: '800px', overflowY: 'scroll' }}>
      <Col>
        <Row>
          <Col sm={2} md={6} style={{ ...style.makeItCenter }}>
            <img style={{ borderRadius: '30px', border: '1px solid black' }} width="100%" src={`https://gateway.ipfs.io/ipfs/${props.recipe.imageHash}`} alt="Card image cap" />
          </Col>
          <Col md={6} sm={10} style={{ height: '500px', overflowY: 'auto', marginTop: '3%', wordBreak: 'break-word' }}>
            <h1>{props.recipe.title}</h1>
            <p style={{ wordBreak: 'break-word' }}>
              {props.recipe.description}
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Example;