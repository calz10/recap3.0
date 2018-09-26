
import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Row, Button
} from 'reactstrap';
const RecipeItem = (props) => {
  const address = props.userAddress
  const trimDescription = props.description.substring(0, 50)
  return (
    <Card>
      <CardBody>
        <img style={{ width: '300px' }} src={`https://gateway.ipfs.io/ipfs/${props.imageHash}`} alt="Card image cap" />
        <CardTitle>{props.title}</CardTitle>
        <CardSubtitle>{trimDescription}</CardSubtitle>
      </CardBody>
      <CardBody>
        {props.owner === address &&
          <CardLink href="#">
            <Button color="danger">
              Delete Recipe
            </Button>
          </CardLink>
        }
        <CardLink href="#">
          {props.recipeType === 'free' ?
            <Button color="primary">
              View Free Recipe
            </Button> :
            <Button color="primary">
              Buy to view full
            </Button>
          }
        </CardLink>
      </CardBody>
    </Card>
  );
};

export default RecipeItem