import React from 'react';
import TodoListItem from './TodoListItem';

class TodoList extends React.Component {
  render() {
    const list = this.props.list.map((item) => {
      if (item.done)
        return <TodoListItem name={item.label} checked/>
      else
        return <TodoListItem name={item.label}/>
    })
    return (
      <div style={{width:'70%'}}>
        {list}
      </div>
    );
  }
}

export default TodoList;