import React from "react";
import { Button } from "reactstrap";

export default class DeleteButton extends React.Component {
  render() {
    const id = this.props.id;
    // For some reason is important the () => , still need to research more
    return (
      <div>
        <Button color="danger" onClick={() => this.props.deletePost(id)}>
          <i className="fas fa-trash" />Delete
        </Button>
      </div>
    );
  }
}
