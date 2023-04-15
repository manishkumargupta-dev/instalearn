import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// import { seedDatabase } from "./../seed";
const config = {
  apiKey: "AIzaSyBnTSe_Y-ch4sAwc--A0hxWTSR4A52VccQ",
  authDomain: "instalearn-clone.firebaseapp.com",
  projectId: "instalearn-clone",
  storageBucket: "instalearn-clone.appspot.com",
  messagingSenderId: "874904582410",
  appId: "1:874904582410:web:920b10609d72ff665da2f3",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
// seedDatabase(firebase);
export { firebase, FieldValue };
