import { config } from "dotenv";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";
import { initializeApp as InitializeFirestore, cert } from 'firebase-admin/app';
import  { getFirestore } from 'firebase-admin/firestore';
import serviceAccountKey from '../../serviceAccountKey.json' assert { type: 'json' };

config();

// RTDB
const rtdbApp = initializeApp({
    databaseURL: process.env.VITE_DATABASE_URL
});
// firestore
InitializeFirestore({
    credential: cert(serviceAccountKey),
});

function uuidv4() {
	return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
		(+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
	);
}


async function migrate() {
    // Initialize Realtime Database and get a reference to the service
    const db = getDatabase(rtdbApp);
    let data = (await get(ref(db, `/`))).val();

    // convert to appropriate types
    let links = {};
    for (let key in data.links) {
        let UUID = uuidv4();
        links[UUID] = {
            url: data.links[key].direct,
            alias: key,
            views: data.links[key].clicks,
            uuid: UUID
        };
    }

    let rickrolls = data.rickrolls;

    // migrate to firestore
    const firestore = getFirestore();
    const linksCollection = firestore.collection('links');
    const rickrollsCollection = firestore.collection('rickrolls');

    // add links to firestore
    for (let key in links) {
        await linksCollection.doc(key).set(links[key]);
    }

    // add rickrolls to firestore
    for (let key in rickrolls) {
        await rickrollsCollection.doc(key).set(rickrolls[key]);
    }
}

migrate();