import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebaseConfig.json';
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const db = getFirestore(app);
export default db;