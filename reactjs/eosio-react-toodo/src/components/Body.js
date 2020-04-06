import React from 'react';
import Container from '@material-ui/core/Container';
import Todo from './Todo';

class Body extends React.Component {
  render() {
    const todoData = [{
      id: 0,
      label: "bacon",
      done: true
    },{
      id: 1,
      label: "cheese",
      done: true
    },{
      id: 2,
      label: "lettuce",
      done: false
    },]
    return (
      <Container maxWidth="sm">
        <Todo list={todoData}/> 
      </Container>
    );
  }
}

export default Body;