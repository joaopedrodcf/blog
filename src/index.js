import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts : []};
  }

  componentDidMount() {
      axios.get(`http://localhost:8080/post/`)
        .then(res => {
          const posts = res.data;
          this.setState({ posts });
        })
  }

  /*
    componentDidMount()  {
  this.setState(
  posts:[
    {"title":"title1","content":"content1"},
    {"title":"title2","content":"content2"},
    {"title":"title3","content":"content3"}
  ]
  );
    }
  */
  render(){
    return (
      <ul>
        { this.state.posts.map(
          post => <li>{post.title} {post.content}</li>
      )}
      </ul>
		)
  }
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
