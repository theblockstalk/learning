import React from 'react';
import Container from '@material-ui/core/Container';
import Todo from './Todo';

class Body extends React.Component {
  render() {
    return (
      <Container maxWidth="sm">
        <Todo/> 
      </Container>
    );
  }
}

export default Body;