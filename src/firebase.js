
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC4Yvqz2zWAJlNwSyfdzID2rTIdpjDQyg",
  authDomain: "trigan-44971.firebaseapp.com",
  projectId: "trigan-44971",
  storageBucket: "trigan-44971.appspot.com",
  messagingSenderId: "1038116310237",
  appId: "1:1038116310237:web:a6b5a57759d4c5d3281f34",
  measurementId: "G-69W68F7R11"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {app, auth, db, storage};

