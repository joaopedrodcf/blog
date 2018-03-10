import React from "react";
import Post from "./Post";

class Posts extends React.Component {
  render() {
    const posts = this.props.posts;
    const deletePost = this.props.deletePost;

    return (
      <div>
        {posts.map(post => (
          <Post key={post.id} post={post} deletePost={deletePost} />
        ))}
      </div>
    );
  }
}

export default Posts;
