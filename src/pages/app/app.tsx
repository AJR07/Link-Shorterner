import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Home } from "../home/home";

export function App() {
	return (
		<Router>
			<Switch>
				<Route path="/">
					<Home></Home>
				</Route>
				<Route path="/:link">
					<Links></Links>
				</Route>
			</Switch>
		</Router>
	)
}

function Links() {
	return (
		<div className="id"></div>
	)
}