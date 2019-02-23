import React, { Component } from 'react';

class Test extends Component {
  state = {
    title: '',
    body: ''
  };

  componentDidMount() {
    fetch(
      // generally call all APIs inside componentDidMount()
      'https://jsonplaceholder.typicode.com/posts/2'
    )
      //handling the response from the promise:
      .then(response => response.json())
      //taking the data and logging it
      .then(data =>
        //data returns this.setState
        this.setState({
          //grabbing the title and the body
          //from the response.
          title: data.title,
          body: data.body
        })
      );
  }

  // componentWillMount() {
  //   console.log('ready');
  // }

  // // will work in context.js
  // componentDidUpdate() {
  //   console.log('Updated..');
  // }

  // // will work in context.js
  // componentWillUpdate() {
  //   console.log('WillUpdate..');
  // }

  // // DEPRECATED - Typically used with Redux to manage State:
  // componentWillReceiveProps(nextProps, nextState) {
  //   return {
  //     test: 'something'
  //   }
  // }

  // // Replaces the above method
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return null;
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log('getSnapshotBeforeUpdate');
  // }

  render() {
    //destructure title & body from component's state:
    const { title, body } = this.state;
    //using title & body to render the data from the api, saved in state.
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}

export default Test;
