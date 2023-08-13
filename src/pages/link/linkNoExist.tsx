import { LinearProgress } from "@mui/material";
import { useState } from "react";
import Links from "./link";
import "./link.css";

export default function LinkNoExist() {
  let [noExist, setNoExist] = useState(false);

  setTimeout(() => {
    // redirect
    window.location.href = "https://youtu.be/dQw4w9WgXcQ?si=cywTyZOgPgleGYsn";
  }, 3000);

  if (noExist) {
    return (
      <div id="app">
        <h1 className="center" style={{ color: "red" }}>
          ERROR 404
        </h1>
        <LinearProgress
          variant="determinate"
          value={100}
          color="error"
          className="progress"
        />
        <h2 className="center">Link doesn't exist.</h2>
      </div>
    );
  } else {
    return <Links setNoExist={setNoExist}></Links>;
  }
}
