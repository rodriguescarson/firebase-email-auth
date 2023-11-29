// firebase.js
import { initializeApp, getApps, FirebaseOptions } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyApxadBnmqkL3N5i549wUCmW8z1jRT2m4I",
  authDomain: "falcon-dev-f53dc.firebaseapp.com",
  projectId: "falcon-dev-f53dc",
  storageBucket: "falcon-dev-f53dc.appspot.com",
  messagingSenderId: "499217073015",
  appId: "1:499217073015:web:803dfdfcafe71c32e25772",
  measurementId: "G-CDVL1K4654",
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
