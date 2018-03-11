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
    const type = this.props.post.type.type;
    const title = this.props.post.title;
    const deletePost = this.props.deletePost;

    return (
      <Card>
        <CardImg
          top
          width="100%"
          src="https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b80e0951bab298682fc1b12f6d220db4&auto=format&fit=crop&w=1950&q=80"
          alt="Card image cap"
        />
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
