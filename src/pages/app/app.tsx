import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from "../home/home";
import "./app.css";
import Footnote from "../footnote/footnote";
import LinkNoExist from "../link/linkNoExist";

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:link">
          <LinkNoExist/>
        </Route>
        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
      <Footnote/>
    </Router>
  );
}