// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5K4RTFqVZvwYOIj9Liijk8M_zLIjAAQ8",
  authDomain: "internship-project-c70d0.firebaseapp.com",
  databaseURL: "https://internship-project-c70d0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "internship-project-c70d0",
  storageBucket: "internship-project-c70d0.appspot.com",
  messagingSenderId: "425719641991",
  appId: "1:425719641991:web:d6188864de70cf51504522",
  measurementId: "G-0FX2SEFNMW"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const auth = getAuth(app);
const analytics = getAnalytics(app);
export default app;