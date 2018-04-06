import PostsTable from "./Posts/PostsTable";
import SearchPosts from "./SearchPosts/SearchPosts";
import SidebarRight from "./SidebarRight";
import CreateType from "./CreateType/CreateType";
import CreatePostForm from "./CreatePostForm/CreatePostForm";
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

    this.state = {
      posts: [],
      initialPosts: [],
      types: [],
      modalCreatePost: false,
      modalCreateType: false
    };

    this.urlPost = `http://localhost:8080/post/`;
    this.urlType = `http://localhost:8080/type/`;

    this.getPosts = this.getPosts.bind(this);
    this.toggleCreatePost = this.toggleCreatePost.bind(this);
    this.toggleCreateType = this.toggleCreateType.bind(this);
  }

  toggleCreatePost() {
    this.setState({
      modalCreatePost: !this.state.modalCreatePost
    });
  }

  toggleCreateType() {
    this.setState({
      modalCreateType: !this.state.modalCreateType
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
        this.toggleCreatePost();
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
        this.toggleCreateType();
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
        <Row className="marging-top-card">
          <Col />
          <Col sm="10" md="10">
            <Card>
              <CardHeader tag="h5">Posts</CardHeader>
              <CardBody>
                <Row>
                  <Col sm="8" md="7" lg="9">
                    <SearchPosts
                      types={this.state.types}
                      searchPosts={this.searchPosts.bind(this)}
                    />
                  </Col>
                  <Col sm="2" md="2" lg="1" className="margin-bottom-button">
                    <Button color="secondary" onClick={this.toggleCreatePost}>
                      Create Post
                    </Button>
                    <Modal
                      isOpen={this.state.modalCreatePost}
                      toggle={this.toggleCreatePost}
                      className={this.props.className}
                    >
                      <ModalHeader toggle={this.toggle}>
                        Create Post
                      </ModalHeader>
                      <ModalBody>
                        <Container fluid>
                          <Row>
                            <Col>
                              <CreatePostForm
                                types={this.state.types}
                                insertPost={this.createPost.bind(this)}
                              />
                            </Col>
                          </Row>
                        </Container>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="secondary"
                          onClick={this.toggleCreatePost}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                  <Col sm="2" md="2" lg="1" className="margin-bottom-button">
                    <Button color="secondary" onClick={this.toggleCreateType}>
                      Create type
                    </Button>
                    <Modal
                      isOpen={this.state.modalCreateType}
                      toggle={this.toggleCreateType}
                      className={this.props.className}
                    >
                      <ModalHeader toggle={this.toggleCreateType}>
                        Create Type
                      </ModalHeader>
                      <ModalBody>
                        <Container fluid>
                          <Row>
                            <Col>
                              <CreateType
                                insertType={this.createType.bind(this)}
                              />
                            </Col>
                          </Row>
                        </Container>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="secondary"
                          onClick={this.toggleCreateType}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                  <Col />
                </Row>

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
