import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { Home } from "../home/home";
import firebase from "firebase";

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:link">
          <Links></Links>
        </Route>
        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}

function Links() {
  let { link } = useParams() as { link: string };
  let ref = firebase.database().ref(`links/${link}`);
  ref.get().then((snapshot) => {
    if (snapshot.exists()) {
      let val = snapshot.val();
      val.clicks += 1;
      ref.set(val).then(() => {
        //redirect
        window.location.replace(val.direct);
      });
    } else {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
  });
  return <div className="id"></div>;
}
