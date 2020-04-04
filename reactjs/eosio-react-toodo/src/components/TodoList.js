import React from 'react';
import TodoListItem from './TodoListItem';

class TodoList extends React.Component {
  render() {
    return (
        <ul>
            <TodoListItem name="bacon" done="true"/>
            <TodoListItem name="bacon" done="true"/>
            <TodoListItem name="bacon" done="true"/>
        </ul>
    );
  }
}

export default TodoList;