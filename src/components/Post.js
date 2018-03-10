import React from "react";
import DeleteButton from "./DeleteButton";

class Post extends React.Component {
  render() {
    const id = this.props.post.id;
    const content = this.props.post.content;
    const type = this.props.post.type.type;
    const title = this.props.post.title;
    const deletePost = this.props.deletePost;

    return (
      <div>
        <span className="title">{title}</span>
        <br />
        <span className="content">{content}</span>
        <br />
        <span className="type">{type}</span>
        <br />
        <DeleteButton id={id} deletePost={deletePost} />
      </div>
    );
  }
}

export default Post;
