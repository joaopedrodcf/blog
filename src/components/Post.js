import React from "react";
import ReactDOM from "react-dom";

class Post extends React.Component {
  render() {
    // For some reason is important the () => , still need to research more
    return (
      <div>
        <span className="title">{this.props.post.title}</span>
        <br />
        <span className="content">{this.props.post.content}</span>
        <br />
        <span className="type">{this.props.post.type.type}</span>
        <br />
        <button onClick={() => this.props.deletePost(this.props.post.id)}>
          delete
        </button>
      </div>
    );
  }
}

export default Post;
