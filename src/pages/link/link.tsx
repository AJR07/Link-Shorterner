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
      let rickrolls = firebase.database().ref(`rickrolls/${link}`);
      rickrolls.get().then((snapshot) => {
        if (snapshot.exists()) {
          let val2 = snapshot.val();
          val2.clicks += 1;
          rickrolls.set(val2);
        } else {
          rickrolls.set({ clicks: 1 });
        }
        props.setNoExist(true);
      });
    }
  });
  return (
    <div>
      <h1 className="center" style={{ color: "green" }}>
        Searching...
      </h1>
      <LinearProgress color="success" className="progress" />
    </div>
  );
}
