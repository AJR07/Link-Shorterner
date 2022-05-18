import { LinearProgress } from "@mui/material";
import { useState } from "react";
import Links from "./link";
import "./link.css";

export default function LinkNoExist() {
  let [noExist, setNoExist] = useState(false);

  if (noExist) {
    return (
      <div id="app">
        <h1 style={{ color: "red" }}>ERROR 404</h1>
        <h2>Link doesn't exist.</h2>
        <LinearProgress variant="determinate" value={100} color="error" className="progress" />
      </div>
    );
  } else {
    return <Links setNoExist={setNoExist}></Links>;
  }
}
