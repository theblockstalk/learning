import React from "react";
import { render } from "react-dom";
import Counter from "./Counter";
import "./index.css";

const App = () => (
  <div>
    <Counter />
  </div>
);

render(<App />, document.getElementById("root"));
