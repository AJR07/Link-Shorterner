import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { Home } from "../home/home";
import firebase from "firebase";
import { useState } from "react";

export function App() {
  let [noExist, setNoExist] = useState(false);

  if (noExist) {
    return (
      <div id="id">
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

function Links(props: {
  setNoExist: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
      setTimeout(() => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      }, 1000);
      props.setNoExist(true);
    }
  });
  return (
    <div id="id">
      <h1 style={{ color: "green" }}>Searching...</h1>
      <h2>Please be patient...</h2>
    </div>
  );
}
