import React from "react";
import DeleteButton from "./DeleteButton";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Badge
} from "reactstrap";
export default class Post extends React.Component {
  render() {
    const id = this.props.post.id;
    const content = this.props.post.content;
    const type = this.props.post.type.name;
    const title = this.props.post.title;
    const image = this.props.post.image;
    const deletePost = this.props.deletePost;

    return (
      <Card>
        <CardImg top width="100%" src={image} alt="Card image cap" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>{content}</CardText>
          <Badge color="primary">{type}</Badge>
          <DeleteButton id={id} deletePost={deletePost} />
        </CardBody>
      </Card>
    );
  }
}
