import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need

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
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth();
// console.log(app);

export default app;
export { db, auth };

