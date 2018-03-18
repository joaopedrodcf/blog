import DeleteButton from "./DeleteButton";
import React from "react";
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle
} from "reactstrap";

export default class Post extends React.Component {
  render() {
    const { id, content, title, image, type: { name } } = this.props.post;
    const { deletePost } = this.props;

    return (
      <Card>
        <CardImg top width="100%" src={image} alt="Card image cap" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>{content}</CardText>
          <Badge color="primary">{name}</Badge>
          <DeleteButton id={id} deletePost={deletePost} />
        </CardBody>
      </Card>
    );
  }
}
