import React from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";
import Posts from "../Posts/Posts";
import { Link } from "react-router-dom";
//import ShowMoreButton from "../Posts/ShowMoreButton";
import Paginations from "./Paginations";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.getPostsPagination = this.getPostsPagination.bind(this);

    this.state = {
      posts: [],
      pages: 0
    };

    this.url = process.env.REACT_APP_API_HOST + `/post/page/`;
  }

  componentDidMount() {
    this.getPostsPagination(0, 2);
  }

  // CRUD for use in the components
  getPostsPagination(page, size) {
    axios
      .get(this.url, {
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
          <Col md="4" sm="1" />
          <Col md="4" sm="10">
            <Posts posts={this.state.posts} />

            <Paginations
              pages={this.state.pages}
              numElements={2} // TODO needs to be thinked
              getPostsPagination={this.getPostsPagination.bind(this)}
            />
          </Col>
          <Col md="4" sm="1" />
        </Row>
      </Container>
    );
  }
}
