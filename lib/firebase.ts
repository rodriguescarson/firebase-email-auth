// firebase.js

import {
  FirebaseApp,
  FirebaseOptions,
  getApps,
  initializeApp,
} from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBl64WuPC4kaYrt9ITjA-HtL3Ot0kifHZQ",
  authDomain: "kissan-pride.firebaseapp.com",
  projectId: "kissan-pride",
  storageBucket: "kissan-pride.appspot.com",
  messagingSenderId: "727644852203",
  appId: "1:727644852203:web:8d3ebaac95a3f86a9313ae",
};

// Initialize Firebase
let firebase_app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
