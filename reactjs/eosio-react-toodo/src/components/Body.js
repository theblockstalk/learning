import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

class Body extends React.Component {
  render() {
    return (
      <Container maxWidth="sm">
        This is the body
          <br/>
          <Button variant="contained" color="primary">
              Hello World
          </Button>        
      </Container>
    );
  }
}

export default Body;