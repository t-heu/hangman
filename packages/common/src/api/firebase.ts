import * as firebase from 'firebase/app';
import { getDatabase, ref, set, onValue, update, get, child, onDisconnect, remove, push } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";

import {config} from "../../env"
const {API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID} = config

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID
};

/*
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
*/

const app = firebase.initializeApp(firebaseConfig);
const database = getDatabase(app);
isSupported().then(yes => yes ? getAnalytics(app) : null);

export { firebase, database, ref, set, onValue, update, get, child, onDisconnect, remove, push };