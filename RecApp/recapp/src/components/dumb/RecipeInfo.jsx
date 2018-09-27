
import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Row, Button
} from 'reactstrap';


const RecipeItem = (props) => {
  const address = props.userAddress
  const trimDescription = props.description.substring(0, 50)
  const owner = props.owner === address
  return (
    <Card>
      <CardBody>
        <img style={{ width: '300px' }} src={`https://gateway.ipfs.io/ipfs/${props.imageHash}`} alt="Card image cap" />
        <CardTitle>{props.title}</CardTitle><p>value: {props.amount} eth</p>
        <CardSubtitle>{trimDescription}</CardSubtitle>
      </CardBody>
      <CardBody>
        {owner &&
          <CardLink href="#">
            <Button color="danger" onClick={() => props.removeRecipe(props.index)}>
              Delete Recipe
            </Button>
          </CardLink>
        }
        <CardLink href="#">
          {props.recipeType === 'free' || owner ?
            <Button color="primary">
              View Recipe
            </Button> :
            <Button onClick={() => props.buyRecipe(props.index)} color="primary">
              Buy to view full
            </Button>
          }
        </CardLink>
      </CardBody>
    </Card>
  );
};

export default RecipeItem