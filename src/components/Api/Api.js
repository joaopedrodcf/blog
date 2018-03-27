import axios from "axios";
import React from "react";

// -------------------------This is the main App--------------------------------
export default class Api extends React.Component {
  constructor(props) {
    super(props);

    this.urlPost = `http://localhost:8080/post/`;
    this.urlType = `http://localhost:8080/type/`;
  }

  // CRUD for use in the components
  getPosts() {
    axios.get(this.urlPost).then(res => {
      const posts = res.data;
    });
  }

  getTypes() {
    axios.get(this.urlPost).then(res => {
      const types = res.data;
    });
  }

  deletePost(id) {
    axios.delete(this.urlPost + `${id}`).then(res => {
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

    axios
      .post(this.urlPost + `filter`, types, {
        params: {
          name: text
        }
      })
      .then(res => {
        const posts = res.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
