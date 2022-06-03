import firebase from "firebase";
import { useState } from "react";
import { Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import "./home.css";

export function Home() {
  let [notif, setNotif] = useState({ notif: "", error: false });

  let [original, setOriginal] = useState("");
  let [shortened, setShortened] = useState("");

  let [errorOriginal, setErrorOriginal] = useState(false);
  let [errorShortened, setErrorShortened] = useState(false);

  let [loading, setLoading] = useState(false);

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
            onChange={(evt) => {
              setOriginal(evt.target.value);
            }}
            error={errorOriginal}
          />

          <TextField
            className="textfield"
            label="https://link-short.web.app/<shortened>"
            variant="outlined"
            onChange={(evt) => {
              setShortened(evt.target.value);
            }}
            error={errorShortened}
          />

          <LoadingButton
            onClick={() => {
              submit(
                setNotif,
                original,
                shortened,
                setErrorOriginal,
                setErrorShortened,
                setLoading
              );
            }}
            color="success"
            variant="contained"
            id="create"
            loading={loading}
            loadingIndicator={"Creating..."}
          >
            Create
          </LoadingButton>
        </Stack>
      </div>
      <br></br>

      {notif.error ? (
        <h2 id="error">{notif.notif}</h2>
      ) : (
        <h2 id="success">{notif.notif}</h2>
      )}
    </div>
  );
}

function submit(
  setNotif: React.Dispatch<
    React.SetStateAction<{ notif: string; error: boolean }>
  >,
  original: string,
  shortened: string,
  setErrorOriginal: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorShortened: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setErrorOriginal(false);
  setErrorShortened(false);

  if (original === "" || shortened === "") {
    setNotif({ notif: "Cannot have empty links!", error: true });
    if (original === "") setErrorOriginal(true);
    if (shortened === "") setErrorShortened(true);
  } else if (!original.includes("http://") && !original.includes("https://")) {
    setNotif({
      notif: "Must contain `http://` so it redirects properly!",
      error: true,
    });
    setErrorOriginal(true);
  } else if (original.includes("link-short.web.app")) {
    setNotif({
      notif:
        "Cannot redirect to this site. This is to prevent recursive redirects.",
      error: true,
    });
    setErrorOriginal(true);
  } else {
    setLoading(true);
    let ref = firebase.database().ref(`links/${shortened}`);
    ref.get().then((snapshot) => {
      if (snapshot.exists()) {
        setNotif({ notif: "Shortened has already been taken!", error: true });
        setErrorShortened(true);
        setLoading(false);
      } else {
        ref
          .set({
            clicks: 0,
            direct: original,
          })
          .then(() => {
            setNotif({ notif: "Link Created!", error: false });
            setTimeout(() => {
              setNotif({ notif: "", error: false });
            }, 1000);
            setLoading(false);
          });
      }
    });
  }
}
