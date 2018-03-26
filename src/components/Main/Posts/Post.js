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
    const { id, content, title, image, type: { name } } = this.props.post;
    const { children } = this.props;

    // Use this to only assing the child if it exists
    let child = null;
    if (children != null) {
      child = React.cloneElement(children, { id: id });
    }

    return (
      <Card color="info">
        <CardImg top width="100%" src={image} alt="Card image cap" />
        <CardBody className="cardName">
          <CardTitle>{title}</CardTitle>
          <CardText>{content}</CardText>
          <Badge color="primary">{name}</Badge>
          {child}
          <Link to={`/post/${id}`}>
            <Button color="primary">Show more</Button>
          </Link>
        </CardBody>
      </Card>
    );
  }
}
