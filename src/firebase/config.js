// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFVEeN7LkYT2J4ZNeHT4_iS3M-zSLaESc",
  authDomain: "ssd-manager.firebaseapp.com",
  projectId: "ssd-manager",
  storageBucket: "ssd-manager.appspot.com",
  messagingSenderId: "572135334447",
  appId: "1:572135334447:web:0d39e4a9a1181e33025cda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;