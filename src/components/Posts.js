import React from "react";
import ReactDOM from "react-dom";
import Post from './Post';

class Posts extends React.Component {
  render() {
    return (
      <div>
        {this.props.posts.map(post => (
          <Post key={post.id} post={post} deletePost={this.props.deletePost} />
        ))}
      </div>
    );
  }
}

export default Posts;
