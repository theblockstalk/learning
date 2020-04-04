import React from 'react';
import Button from '@material-ui/core/Button';

class TodoListItem extends React.Component {
  render() {
    return (
        <li>
            <Button>
                {this.props.name}
            </Button>
        </li>
    );
  }
}

export default TodoListItem;