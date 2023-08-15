// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore} from 'firebase/firestore';
import { getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY0-xMKhzQUMwv38g99w1DC7KP2a_1tMU",
  authDomain: "highstore-49405.firebaseapp.com",
  projectId: "highstore-49405",
  storageBucket: "highstore-49405.appspot.com",
  messagingSenderId: "199585854500",
  appId: "1:199585854500:web:004ae22142bf099ded14b1",
  measurementId: "G-DXE9XYLBCX"
}



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export default app;