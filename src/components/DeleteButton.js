import React from "react";

class DeleteButton extends React.Component {
  render() {
    const id =this.props.id
    // For some reason is important the () => , still need to research more
    return (
        <button onClick={() => this.props.deletePost(id)}>
          delete
        </button>
    );
  }
}
export default DeleteButton;
