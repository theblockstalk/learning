import React from 'react';
import TodoListItem from './TodoListItem';

class TodoList extends React.Component {
  render() {
    return (
      <div style={{width:'70%'}}>
          <TodoListItem name="bacon" checked/>
          <TodoListItem name="bacon"/>
          <TodoListItem name="bacon" checked/>
      </div>
    );
  }
}

export default TodoList;