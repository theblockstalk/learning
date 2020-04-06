import React from 'react';
import TodoAdd from './TodoAdd';
import TodoList from './TodoList';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: this.props.list,
      newItem: 'Shampoo',
    }

    this.newItem = this.newItem.bind(this);
    this.newItemChange = this.newItemChange.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
  }

  newItem() {
    let list = this.state.list.slice();

    let maxId = 0;
    list.forEach( (item) => {
      if (item.id > maxId) maxId = item.id;
    })

    list.push({
      id: maxId+1,
      label: this.state.newItem,
      done: false
    })

    this.setState({
      list: list
    })
  }

  newItemChange(event) {
    this.setState({
      newItem: event.target.value
    })
  }

  toggleItem(id) {
    let list = this.state.list.slice();

    list.forEach( (item) => {
      if (item.id === id) {
        item.done = !item.done;
      }      
    })

    this.setState({
      list: list
    })
  }

  render() {
    return (
        <div>
            <h1>Todo list</h1>
            <TodoAdd onSubmit={this.newItem} onChange={this.newItemChange} value={this.state.newItem}/>
            <TodoList list={this.state.list} toggleItem={this.toggleItem}/>
        </div>
    );
  }
}

export default Todo;