import PostsTable from "./Posts/PostsTable";
//import DeleteButton from "../Posts/DeleteButton";
import SearchPosts from "./SearchPosts/SearchPosts";
import SidebarRight from "./SidebarRight";

import axios from "axios";
import React from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

// -------------------------This is the main App--------------------------------
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.getPosts = this.getPosts.bind(this);

    this.state = {
      posts: [],
      initialPosts: [],
      types: [],
      modal: false
    };

    this.urlPost = `http://localhost:8080/post/`;
    this.urlType = `http://localhost:8080/type/`;
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    this.getPosts();
    this.getTypes();
  }

  // CRUD for use in the components
  getPosts() {
    axios.get(this.urlPost).then(res => {
      const posts = res.data;
      this.setState({ posts: posts, initialPosts: posts });
    });
  }

  getTypes() {
    axios.get(this.urlType).then(res => {
      const types = res.data;
      this.setState({ types: types });
    });
  }

  deletePost(id) {
    axios.delete(this.urlPost + `${id}`).then(res => {
      // here need to fetch again the posts from the webapp
      this.getPosts();
    });
  }

  createPost(post) {
    axios
      .post(this.urlPost, {
        title: post.title,
        description: post.description,
        content: post.content,
        image: post.image,
        type: {
          id: post.type.id,
          name: post.type.name
        }
      })
      .then(res => {
        this.getPosts();
      });
  }

  createType(type) {
    console.log(type);
    axios
      .post(this.urlType, {
        name: type.name
      })
      .then(res => {
        this.getTypes();
      });
  }

  searchPosts(filters) {
    // This part is important post
    const text = filters.text;
    const types = filters.types;
    console.log(types);
    axios
      .post(this.urlPost + `filter`, types, {
        params: {
          name: text
        }
      })
      .then(res => {
        const posts = res.data;
        this.setState({ posts: posts });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Container fluid>
        <br />
        <Row>
          <Col />
          <Col sm="10" md="10">
            <Card>
              <CardHeader tag="h5">Posts</CardHeader>
              <CardBody>
                <SearchPosts
                  types={this.state.types}
                  searchPosts={this.searchPosts.bind(this)}
                />
                <br />
                <Button color="secondary" onClick={this.toggle}>
                  Create Post
                </Button>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  className={this.props.className}
                >
                  <ModalHeader toggle={this.toggle}>Create Post</ModalHeader>
                  <ModalBody>
                    <Container fluid>
                      <Row>
                        <Col>
                          <SidebarRight
                            types={this.state.types}
                            insertPost={this.createPost.bind(this)}
                            insertType={this.createType.bind(this)}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
                <br />
                <br />
                <PostsTable
                  posts={this.state.posts}
                  deletePost={this.deletePost.bind(this)}
                />
              </CardBody>
            </Card>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}
