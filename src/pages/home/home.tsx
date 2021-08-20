import "./home.css";
import firebase from "firebase";
import { useState } from "react";

export function Home() {
  let [error, setError] = useState("");
  return (
    <div className="home">
      <h1>Link Shortener!</h1>
      <div className="form">
        <div id="original-container">
          <h3>Original:</h3>
          <input type="text" id="original"></input>
        </div>
        <div id="shortened-container">
          <h3>Shortened:</h3>
          <input type="text" id="shortened"></input>
        </div>
        <button
          onClick={() => {
            submit(setError);
          }}
        >
          Submit
        </button>
      </div>
      <h2
        hidden={error === "" ? true : false}
      >
        {error}
      </h2>
    </div>
  );
}

function submit(setError: React.Dispatch<React.SetStateAction<string>>) {
  let original = document.getElementById("original") as HTMLInputElement;
  let shortened = document.getElementById("shortened") as HTMLInputElement;
  let ref = firebase.database().ref(`links/${shortened?.value}`);
  if (original.value === "" || shortened.value === "") {
    setError("Cannot have empty links!");
    return;
  }
  ref.get().then((snapshot) => {
    if (snapshot.exists()) {
      setError("URL already exists!");
    } else {
      ref
        .set({
          clicks: 0,
          direct: original?.value,
        })
        .then(() => {
          setError("");
        });
    }
  });
}
