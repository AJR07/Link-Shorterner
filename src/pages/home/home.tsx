import firebase from "firebase";
import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import "./home.css";

export function Home() {
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");

  return (
    <div className="home">
      <h1>Link Shortener!</h1>
      <div className="form">
        <Stack direction="column" className="form-fields" style={{paddingLeft: "3vw", paddingRight: "3vw"}}>
          <TextField label="Original" variant="outlined" className="textfield"/>
          <TextField label="Shortened" variant="outlined" className="textfield"/>
        </Stack>
        <Button
          onClick={() => {
            submit(setError, setSuccess);
          }}
          id="submit"
        >
          Submit
        </Button>
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
  setSuccess: React.Dispatch<React.SetStateAction<string>>
) {
  let original = document.getElementById("original") as HTMLInputElement;
  let shortened = document.getElementById("shortened") as HTMLInputElement;
  if (original.value === "" || shortened.value === "") {
    setError("Cannot have empty links!");
    setSuccess("");
    return;
  } else if (
    !original.value.includes("http://") &&
    !original.value.includes("https://")
  ) {
    setError("Must contain `http://` so it redirects properly!!");
    setSuccess("");
    return;
  } else if (original.value.includes("link-short.web.app")) {
    setError(
      "Cannot redirect to this site. This is to prevent recursive redirects XD"
    );
    setSuccess("");
    return;
  }
  let ref = firebase.database().ref(`links/${shortened?.value}`);
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
