import { useParams } from "react-router-dom";
import firebase from "firebase";
import { LinearProgress } from "@mui/material";
import "./link.css";

export default function Links(props: {
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
      }, 500);
      props.setNoExist(true);
    }
  });
  return (
    <div>
      <h1 style={{ color: "green" }}>Searching...</h1>
      <LinearProgress color="success" className="progress" />
    </div>
  );
}
