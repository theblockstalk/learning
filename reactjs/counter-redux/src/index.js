// https://daveceddia.com/redux-tutorial/
import React from "react";
import { render } from "react-dom";
import Counter from "./Counter";
import { Provider } from 'react-redux';
import store from './store';
import "./index.css";


const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

render(<App />, document.getElementById("root"));
