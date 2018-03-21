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
  height: "64px",
  width: "64px"
};

export default class Post extends React.Component {
  render() {
    const { id, content, title, image, type: { name } } = this.props.post;

    return (
      <Media>
        <Media top href="#">
          <Media
            object
            src={image}
            alt="Generic placeholder image"
            style={mediaStyle}
          />
        </Media>
        <Media body>
          <Media heading>
            {title} <Badge color="primary">{name}</Badge>{" "}
          </Media>
          {content}
        </Media>
      </Media>
    );
  }
}
