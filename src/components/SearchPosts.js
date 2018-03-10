import React from "react";

class SearchPosts extends React.Component {
  handleSearch(event) {
    this.props.searchPosts(event.target.value);
  }

  render() {
    return (
      <input type="text" onKeyUp={this.handleSearch.bind(this)} />
    );
  }
}

export default SearchPosts;
