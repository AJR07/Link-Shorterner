import { config } from "dotenv";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";

config();
console.log(process.env.VITE_DATABASE_URL)
const firebaseConfig = {
    databaseURL: process.env.VITE_DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

async function migrate() {
    // Initialize Realtime Database and get a reference to the service
    const db = getDatabase(app);
    let data = (await get(ref(db, `/`))).val();

    // convert to appropriate types
    let links = {};
    for (let key in data.links) {
        let UUID = Math.random().toString(36);
        links[UUID] = {
            url: data.links[key].direct,
            alias: key,
            views: data.links[key].clicks,
            uuid: UUID
        };
    }

    let rickrolls = data.rickrolls;
}

migrate();