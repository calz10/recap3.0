
import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Row, Button
} from 'reactstrap';
const RecipeItem = (props) => {
  const trimDescription = props.description.substring(0, 50)
  return (
    <Card>
      <CardBody>
        <img style={{ width: '300px' }} src={`https://gateway.ipfs.io/ipfs/${props.imageHash}`} alt="Card image cap" />
        <CardTitle>{props.title}</CardTitle>
        <CardSubtitle>{trimDescription}</CardSubtitle>
      </CardBody>
      <CardBody>
        <CardLink href="#">
          {props.recipeType === 'free' ?
            <Button>
              View Free Recipe
            </Button> : 
            <Button>
              Buy to view full
            </Button>
          }
        </CardLink>
      </CardBody>
    </Card>
  );
};

export default RecipeItem