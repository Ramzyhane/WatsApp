import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDHW-KWHJkZBexdoj8-76_gbqo3WA9RMgU",
  authDomain: "chatap-f17f2.firebaseapp.com",
  projectId: "chatap-f17f2",
  storageBucket: "chatap-f17f2.appspot.com",
  messagingSenderId: "694033270449",
  appId: "1:694033270449:web:f53f4a220c3357123d4490"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)