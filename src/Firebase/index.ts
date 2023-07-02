// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2bLEoFADxUreM0MusS56xo6Gi1mtznzs",
  authDomain: "move-app-2f04f.firebaseapp.com",
  projectId: "move-app-2f04f",
  storageBucket: "move-app-2f04f.appspot.com",
  messagingSenderId: "987646413037",
  appId: "1:987646413037:web:de93cb7c52368d81d9a4e4"
};

// Initialize Firebase
const app =!getApps().length ? initializeApp(firebaseConfig):getApp;
const db=getFirestore();
const auth=getAuth();

export default app;

export{db,auth}
