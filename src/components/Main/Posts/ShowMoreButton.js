import React from "react";
import { Button } from "reactstrap";

export default class ShowMoreButton extends React.Component {
  render() {
    const { id } = this.props;
    // For some reason is important the () => , still need to research more
    return (
      <div>
        <Button color="danger" onClick={() => this.props.showMore(id)}>
          <i className="fas fa-trash" />Show more
        </Button>
      </div>
    );
  }
}
