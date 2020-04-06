import React from 'react';
import Container from '@material-ui/core/Container';
import Todo from './Todo';
import Login from './Login';
import Eosio from  '../services/Eosio';
// import Contract from '../services/Contract';

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
    // this.onLogin = this.onLogin.bind(this);
    this.asyncF = this.asyncF.bind(this);
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

    console.log("start")
    await new Promise((resolve, reject) => {
      setInterval(() => {
        console.log("2 sec")
        resolve();
      }, 2000)
    })
    console.log("end")
    console.log(eosio)
    // await eosio.initializeEosio();
    // const todoContract = new Contract("todolist", eosio)

    // await todoContract.initializeContract();

    this.setState({
      loggedIn: true,
      // todoContract: todoContract
    })
  }

  async asyncF() {
    console.log("start")
    await new Promise((resolve, reject) => {
      setInterval(() => {
        console.log("5 sec")
        resolve();
      }, 5000)
    })
    console.log("finish")
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
    }]

    return (
      <Container maxWidth="sm">
        {this.state.loggedIn === false
          ? <Login
              account={this.state.account}
              onChangeAccount={this.onChangeAccount}
              pkey={this.state.pkey}
              onChangePkey={this.onChangePkey}
              onClick={this.asyncF}
              />
          : <Todo list={todoData} todoContract={this.state.todoContract}/>
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