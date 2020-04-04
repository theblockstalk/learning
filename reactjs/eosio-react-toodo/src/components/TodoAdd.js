import React from 'react';
import Button from '@material-ui/core/Button';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import TextField from '@material-ui/core/TextField';

class TodoAdd extends React.Component {
  render() {

    const textStyle={width: '70%'}

    return (
      <div>
        <TextField label="New item" style={textStyle}/>
        <Button><ControlPointIcon fontSize="large"/></Button>
      </div>
    );
  }
}

export default TodoAdd;