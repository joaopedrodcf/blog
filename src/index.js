import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts : []};
  }

  componentDidMount()  {
    this.setState(
      {
        posts:[
          {"title":"title1","content":"content1"},
          {"title":"title2","content":"content2"},
          {"title":"title3","content":"content3"}
        ]
      }
    )
  }

  render(){
    return (
      <ul>
        { this.state.posts.map(post => <li>{post.title}</li>)}
      </ul>
		)
  }
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
