// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeEYpGmSz5j-A-QZZedtpDu8sjqvisrHE",
  authDomain: "planning-app-1c3ca.firebaseapp.com",
  projectId: "planning-app-1c3ca",
  storageBucket: "planning-app-1c3ca.appspot.com",
  messagingSenderId: "708439457525",
  appId: "1:708439457525:web:bfb3d6ff8b45faf05fcfbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth()

export {
    db,
    auth
}