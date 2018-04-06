import React from "react";
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";

export default class Post extends React.Component {
  render() {
    const { id, description, title, image, type: { name } } = this.props.post;

    return (
      <Card color="info">
        <CardImg top width="100%" src={image} alt="Card image cap" />
        <CardBody className="cardName">
          <CardTitle>{title}</CardTitle>
          <CardText>{description}</CardText>
          <Badge color="primary">{name}</Badge>
          <Link to={`/post/${id}`}>
            <Button color="primary">Read more</Button>
          </Link>
        </CardBody>
      </Card>
    );
  }
}
