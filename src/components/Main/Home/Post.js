import React from "react";
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Media
} from "reactstrap";

const mediaStyle = {
  width: "100%",
  height: "30rem"
};

export default class Post extends React.Component {
  render() {
    const { id, content, title, image, type: { name } } = this.props.post;

    return (
      <Card color="info" className="rounded-0">
        <CardImg
          top
          width="100%"
          src={image}
          style={mediaStyle}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>{content}</CardText>
          <Badge color="primary">{name}</Badge>
        </CardBody>
      </Card>
    );
  }
}
