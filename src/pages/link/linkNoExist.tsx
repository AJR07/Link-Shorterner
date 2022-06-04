import { LinearProgress } from "@mui/material";
import { useState } from "react";
import Links from "./link";
import "./link.css";

export default function LinkNoExist() {
  let [noExist, setNoExist] = useState(false);
  console.log(
    `${window.location.protocol + window.location.hostname}/ERROR-404.mp4`
  );
  if (noExist) {
    return (
      <div id="app">
        <h1 style={{ color: "red" }}>ERROR 404</h1>
        <LinearProgress
          variant="determinate"
          value={100}
          color="error"
          className="progress"
        />
        <h2>Link doesn't exist.</h2>
        <video width="750vw" controls autoPlay muted>
          <source
            src={`http://localhost:3000/ERROR-404.mp4`}
            type="video/mp4"
          />
        </video>
      </div>
    );
  } else {
    return <Links setNoExist={setNoExist}></Links>;
  }
}
