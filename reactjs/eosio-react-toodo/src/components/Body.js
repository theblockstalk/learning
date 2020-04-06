import React from 'react';
import Container from '@material-ui/core/Container';
import Todo from './Todo';
import Login from './Login';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      pkey: null,
      loggedIn: false,
      todoContract: null
    }

    this.onChangePkey = this.onChangePkey.bind(this);
    this.onChangeAccount = this.onChangeAccount.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onChangePkey(event) {
    this.setState({
      pkey: event.target.value
    })
  }

  onChangeAccount(event) {
    this.setState({
      account: event.target.value
    })
  }

  onLogin() {
    this.setState({
      loggedIn: true
    })
  }

  render() {
    const todoData = [{
      id: 0,
      label: "bacon",
      done: true
    },{
      id: 1,
      label: "cheese",
      done: true
    },{
      id: 2,
      label: "lettuce",
      done: false
    },]
    return (
      <Container maxWidth="sm">
        {this.state.loggedIn === false
          ? <Login
              onChangePkey={this.onChangePkey}
              onChangeAccount={this.onChangeAccount}
              onClick={this.onLogin}/>
          : <Todo list={todoData}/>
      }
      </Container>
    );
  }
}

export default Body;

/*
Todo
- field validation
- use password instead of private key
*/