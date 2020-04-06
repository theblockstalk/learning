import React from 'react';
import Container from '@material-ui/core/Container';
import Todo from './Todo';
import Login from './Login';
import Eosio from  '../services/Eosio';
import Contract from '../services/Contract';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "jack32",
      pkey: "5Kdzjm5LdQypEGTZ7eZcqrUS3BtmfjzpU31ELA8HPTC2ha6eVXZ",
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

  async onLogin() {
    const eosio = new Eosio(this.state.account, this.state.pkey);

    await eosio.initializeEosio();
    // const todoContract = new Contract("todolist", eosio)

    // await todoContract.initializeContract();

    this.setState({
      loggedIn: true,
      // todoContract: todoContract
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
              account={this.state.account}
              onChangeAccount={this.onChangeAccount}
              pkey={this.state.pkey}
              onChangePkey={this.onChangePkey}
              onClick={this.onLogin}/>
          : <Todo list={todoData} account={this.state.account} todoContract={this.state.todoContract}/>
      }
      </Container>
    );
  }
}

export default Body;

/*
Todo
- field validation
- use react router
- loggout
- redux
- use password instead of private key
*/