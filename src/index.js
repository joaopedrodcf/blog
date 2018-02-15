import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts : [],
    };
  }

  componentDidMount() {
      axios.get(`http://localhost:8080/post/`)
        .then(res => {
          const posts = res.data;
          this.setState({ posts });
        })
  }
  
  render(){
    return (
      <div>
        { this.state.posts.map(
          post => <Post title={post.title} content={post.content}/>
        )}
      </div>

		)
  }
}

function Post(props){
  return (
    <div>
     <div className="title">
       {props.title}
     </div>
     <div className="content">
     {props.content}
     </div>
   </div>
 );
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
