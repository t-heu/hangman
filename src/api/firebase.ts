import 'dotenv/config'
import * as firebase from 'firebase/app';
import { getDatabase, ref, set, onValue, update, get, child, onDisconnect, remove, push } from "firebase/database";

const {API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID} = process.env;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID
};

const app = firebase.initializeApp(firebaseConfig);
const database = getDatabase(app);

export { firebase, database, ref, set, onValue, update, get, child, onDisconnect, remove, push };