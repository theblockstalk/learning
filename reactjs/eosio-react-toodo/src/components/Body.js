import React from 'react';
import Button from '@material-ui/core/Button';

class Body extends React.Component {
  render() {
    return (
      <div>
          This is the body
          <br/>
          <Button variant="contained" color="primary">
              Hello World
          </Button>
      </div>
    );
  }
}

export default Body;