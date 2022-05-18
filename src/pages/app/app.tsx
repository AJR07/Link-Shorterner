import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from "../home/home";
import { useState } from "react";
import Links from "../link/link";
import "./app.css";

export function App() {
  let [noExist, setNoExist] = useState(false);

  if (noExist) {
    return (
      <div id="app">
        <h1 style={{ color: "red" }}>ERROR 404</h1>
        <h2>Link doesn't exist, or does it :)</h2>
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/:link">
          <Links setNoExist={setNoExist}></Links>
        </Route>
        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}