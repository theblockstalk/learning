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
    const network = {
        chainId: 'bc31c358a5aaafb5f7ad73a2ef85625f67fe9dc027f8c441fc272027d53f00f6',
        node: 'https://eos-studio.api.dfuse.dev'
    }

    const account = {
      name: this.state.account,
      pkey: this.state.pkey,
      permission: "active"
    }
  
    const eosio = new Eosio();
    await eosio.initializeEosio(account, network);
    const todoContract = new Contract("todolist", eosio)
    await todoContract.initializeContract();

    this.setState({
      loggedIn: true,
      todoContract: todoContract
    })
  }

  render() {
    return (
      <Container maxWidth="sm">
        {this.state.loggedIn === false
          ? <Login
              account={this.state.account}
              onChangeAccount={this.onChangeAccount}
              pkey={this.state.pkey}
              onChangePkey={this.onChangePkey}
              onClick={this.onLogin}
              />
          : <Todo
            todoContract={this.state.todoContract}
            />
      }
      </Container>
    );
  }
}

export default Body;

/*
Todo
- field validation
- check account name and chain id
- error handling
- use react router
- loggout
- redux
- use password instead of private key
*/