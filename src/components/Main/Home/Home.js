import React from "react";
import {
  Col,
  Container,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import axios from "axios";
import Posts from "./Posts";
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.getPostsPagination = this.getPostsPagination.bind(this);

    this.state = {
      posts: []
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
        this.setState({ posts: posts });
      });
  }

  /*
   <Pagination
              getPostsPagination={this.getPostsPagination.bind(this)}
            />
            */
  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm="2">This is the sidebar</Col>
          <Col sm="8">
            <Posts posts={this.state.posts} />

            <Pagination>
              <PaginationItem>
                <PaginationLink onClick={() => this.getPostsPagination(1, 2)}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => this.getPostsPagination(2, 2)}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => this.getPostsPagination(3, 2)}>
                  3
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </Col>
          <Col sm="2">This is the sidebar</Col>
        </Row>
      </Container>
    );
  }
}
