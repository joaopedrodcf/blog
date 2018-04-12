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
import axios from "axios";
import { Link } from "react-router-dom";

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    const { likes } = this.props.post;

    this.state = {
      likes: likes
    };

    this.toggle = this.toggle.bind(this);

    this.url = process.env.REACT_APP_API_HOST;
  }

  toggle() {
    axios
      .put(this.url + `/post/like/${this.props.post.id}`)
      .then(res => {
        const newLikes = this.state.likes + 1;
        this.setState({ likes: newLikes });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

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
          <Button onClick={this.toggle}>
            <i className="far fa-thumbs-up" />
            {this.state.likes}
          </Button>
        </CardBody>
      </Card>
    );
  }
}
