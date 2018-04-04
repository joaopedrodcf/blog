import React from "react";
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
  Container
} from "reactstrap";
import axios from "axios";

export default class PostDetailed extends React.Component {
  // This type of constructor is useful basically is doing {match} = this.props.match
  constructor({ match }) {
    super();

    this.state = {
      id: match.params.id,
      post: []
    };

    this.urlPost = `http://localhost:8080/post/`;

    this.getPost = this.getPost.bind(this);
  }

  componentDidMount() {
    this.getPost(this.state.id);
  }

  getPost(id) {
    axios.get(this.urlPost + `${id}`).then(res => {
      const post = res.data;
      console.log(post);
      this.setState({ post: post });
    });
  }

  //  return <div>I'm the post details {this.state.id}</div>;
  render() {
    var post = Object.assign({}, this.state.post);
    var type = Object.assign({}, post.type);

    const { image, title, content } = post;
    const name = type.name;

    return (
      <Container fluid>
        <Row>
          <Col />
          <Col sm="5">
            <Card color="info" className="post-detailed">
              <CardImg
                top
                width="100%"
                src={image}
                alt="Card image cap"
                className="img-fluid"
              />
              <CardBody className="cardName">
                <CardTitle>{title}</CardTitle>
                <CardText>{content}</CardText>
                <Badge color="primary">{name}</Badge>
              </CardBody>
            </Card>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}
