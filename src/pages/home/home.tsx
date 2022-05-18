import firebase from "firebase";
import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import "./home.css";

export function Home() {
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");

  let [original, setOriginal] = useState("");
  let [shortened, setShortened] = useState("");

  let [errorOriginal, setErrorOriginal] = useState(false);
  let [errorShortened, setErrorShortened] = useState(false);

  return (
    <div className="home">
      <h1>Link Shortener</h1>
      <div className="form">
        <Stack
          direction="column"
          className="form-fields"
          style={{ paddingLeft: "3vw", paddingRight: "3vw" }}
          spacing={3}
        >
          <TextField
            label="Original Link To Shorten"
            variant="outlined"
            className="textfield"
            onChange={(evt) => { setOriginal(evt.target.value); }}
            error={errorOriginal}
          />

          <TextField
            label="Shortened"
            variant="outlined"
            className="textfield"
            onChange={(evt) => { setShortened(evt.target.value); }}
            error={errorShortened}
          />

          <Button
            onClick={() => {
              submit(setError, setSuccess, original, shortened);
            }}
            color="success"
            variant="contained"
            id="create"
          >
            Create
          </Button>
        </Stack>
      </div>
      <br></br>

      {success !== "" ? (
        <div className="error" id="status">
          <h2>{success}</h2>
        </div>
      ) : (
        <></>
      )}

      {error !== "" ? (
        <div className="success" id="status">
          <h2>{error}</h2>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function submit(
  setError: React.Dispatch<React.SetStateAction<string>>,
  setSuccess: React.Dispatch<React.SetStateAction<string>>,
  original: string,
  shortened: string
) {
  if (original === "" || shortened === "") {
    setError("Cannot have empty links!");
    setSuccess("");
    return;
  } else if (
    !original.includes("http://") &&
    !original.includes("https://")
  ) {
    setError("Must contain `http://` so it redirects properly!!");
    setSuccess("");
    return;
  } else if (original.includes("link-short.web.app")) {
    setError(
      "Cannot redirect to this site. This is to prevent recursive redirects."
    );
    setSuccess("");
    return;
  }
  let ref = firebase.database().ref(`links/${shortened}`);
  ref.get().then((snapshot) => {
    if (snapshot.exists()) {
      setError("URL already exists!");
      setSuccess("");
    } else {
      ref
        .set({
          clicks: 0,
          direct: original,
        })
        .then(() => {
          setError("");
          setSuccess("Link Created!");
        });
    }
  });
}
