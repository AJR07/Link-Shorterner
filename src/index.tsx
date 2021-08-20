import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";

//other values
import { App } from "./pages/app/app";

console.clear();

//FIREBASE STARTUP
firebase.initializeApp(require("./firebase.json"));
firebase.database();

//REACT STARTUP
ReactDOM.render(<App />, document.getElementById("root"));
