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

  async componentDidMount() {
    await this.refreshItems();
  }

  async refreshItems() {
    const todoContract = this.props.todoContract;
    const accountName = todoContract.eosio.accountName
    const items = await todoContract.todo(accountName)

    let list = [];
    items.rows.forEach((item) => {
      list.push({
        id: item.id,
        label: item.todo,
        done: item.completed === 0 ? false : true
      })
    })

    this.setState({
      list: list
    })
  }

  newItem() {
    const todoContract = this.props.todoContract;
    todoContract.
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