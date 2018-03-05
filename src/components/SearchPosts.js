import React from "react";
import ReactDOM from "react-dom";

class SearchPosts extends React.Component {
  handleSearch(event) {
    this.props.searchPosts(event.target.value);
  }

  render() {
    return (
      <div>
        <input type="text" onKeyUp={this.handleSearch.bind(this)} />
      </div>
    );
  }
}

export default SearchPosts;
