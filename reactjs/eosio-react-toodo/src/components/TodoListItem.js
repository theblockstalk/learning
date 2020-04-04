import React from 'react';
import Button from '@material-ui/core/Button';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Box from '@material-ui/core/Box';

class TodoListItem extends React.Component {
  render() {
    const buttonStyle={
      // textAlign: 'left',
      flex: 1,
      flexDirection: "row",
    }

    const iconStyle = {
      fill: "grey",
      paddingRight: "8px"
    }

    return (
        <Box display="flex" justifyContent="flex-start">
          <Button style={buttonStyle}>
            <CheckBoxOutlineBlankIcon style={iconStyle}/>
            {this.props.name}
          </Button>
        </Box>
    );
  }
}

export default TodoListItem;