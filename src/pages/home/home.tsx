import "./home.css";
import firebase from "firebase";
import { useState } from "react";

export function Home() {
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");

  let htmlError = (
    <div className="error" id="status">
      <h2>{error}</h2>
      <button
        onClick={() => {
          setError("");
        }}
        className="cancel"
      >
        x
      </button>
    </div>
  );

  let htmlSuccess = (
    <div className="success" id="status">
      <h2>{success}</h2>
      <button
        onClick={() => {
          setSuccess("");
        }}
        className="cancel"
      >
        x
      </button>
    </div>
  );
  if (success === "") htmlSuccess = <div></div>;
  if (error === "") htmlError = <div></div>;

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
            submit(setError, setSuccess);
          }}
        >
          Submit
        </button>
      </div>
      <br></br>
      {htmlSuccess}
      {htmlError}
    </div>
  );
}

function submit(
  setError: React.Dispatch<React.SetStateAction<string>>,
  setSuccess: React.Dispatch<React.SetStateAction<string>>
) {
  let original = document.getElementById("original") as HTMLInputElement;
  let shortened = document.getElementById("shortened") as HTMLInputElement;
  let ref = firebase.database().ref(`links/${shortened?.value}`);
  if (original.value === "" || shortened.value === "") {
    setError("Cannot have empty links!");
    setSuccess("");
    return;
  }
  ref.get().then((snapshot) => {
    if (snapshot.exists()) {
      setError("URL already exists!");
      setSuccess("");
    } else {
      ref
        .set({
          clicks: 0,
          direct: original?.value,
        })
        .then(() => {
          setError("");
          setSuccess("Link Created!");
        });
    }
  });
}
