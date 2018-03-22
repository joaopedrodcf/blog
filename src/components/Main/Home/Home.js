import React from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";
import Posts from "./Posts";
import Paginations from "./Paginations";

const mediaStyle = {
  backgroundImage: `url(https://images.unsplash.com/photo-1512930366077-deb21fed7bc4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=79cf09e2a06efb0b3cf5344e638bbe94&auto=format&fit=crop&w=1514&q=80)`
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.getPostsPagination = this.getPostsPagination.bind(this);

    this.state = {
      posts: [],
      pages: 0
    };
  }

  componentDidMount() {
    this.getPostsPagination(1, 2);
  }

  // CRUD for use in the components
  getPostsPagination(page, size) {
    axios
      .get(`http://localhost:8080/post/page/`, {
        params: {
          page: page,
          size: size
        }
      })
      .then(res => {
        console.log(res.data.content);
        const posts = res.data.content;
        const pages = res.data.totalPages;
        this.setState({ posts: posts, pages: pages });
      });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm="2">This is the sidebar</Col>
          <Col sm="8">
            <Posts posts={this.state.posts} />
            <Paginations
              pages={this.state.pages}
              numElements={2} // TODO needs to be thinked
              getPostsPagination={this.getPostsPagination.bind(this)}
            />
          </Col>
          <Col sm="2">This is the sidebar</Col>
        </Row>
      </Container>
    );
  }
}
