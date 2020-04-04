// https://medium.com/@sa.nitawaki/react-native-todo-app-with-hooks-5f279ae2beb6
import React from 'react';
import TodoAdd from './TodoAdd';
import TodoList from './TodoList';

class Todo extends React.Component {
  render() {
    return (
        <div>
            <h1>Todo list</h1>
            <TodoAdd/>
            <TodoList/>
        </div>
    );
  }
}

export default Todo;