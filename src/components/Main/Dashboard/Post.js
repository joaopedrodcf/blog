import React from "react";
import DeleteButton from "./DeleteButton";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge
} from "reactstrap";
class Post extends React.Component {
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
          src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
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

export default Post;
