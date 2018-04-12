import PostsTable from "./Posts/PostsTable";
import SearchPosts from "./SearchPosts/SearchPosts";
import CreatePostModal from "./CreatePostModal";
import CreateTypeModal from "./CreateTypeModal";
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
      modalCreateType: false
    };

    this.url = process.env.REACT_APP_API_HOST;
    this.urlPost = `http://localhost:8080/post/`;
    this.urlType = `http://localhost:8080/type/`;

    this.getPosts = this.getPosts.bind(this);
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
    const { text, types } = filters;
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
    // removed the Cols inside the Row of CardBody to have a Flex display
    return (
      <Container fluid className="marging-top-card">
        <Row>
          <Col />
          <Col sm="10" md="10">
            <Card>
              <CardHeader tag="h5">Posts</CardHeader>
              <CardBody>
                <Row>
                  <SearchPosts
                    types={this.state.types}
                    searchPosts={this.searchPosts.bind(this)}
                  />
                  <CreatePostModal
                    types={this.state.types}
                    insertPost={this.createPost.bind(this)}
                  />
                  <CreateTypeModal
                    types={this.state.types}
                    insertType={this.createType.bind(this)}
                  />
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
