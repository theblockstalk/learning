import React from 'react';
import TodoListItem from './TodoListItem';

class TodoList extends React.Component {
  render() {
    return (
      <div style={{width:'70%'}}>
          <TodoListItem name="bacon" done="true"/>
          <TodoListItem name="bacon" done="true"/>
          <TodoListItem name="bacon" done="true"/>
      </div>
    );
  }
}

export default TodoList;