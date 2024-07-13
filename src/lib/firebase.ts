import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG!));


// Initialize Realtime Database and get a reference to the service
const db = getFirestore(app);
export default db;