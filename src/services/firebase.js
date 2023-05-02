import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBzlukE1GlWC2lLxQA1ZE7qNqfKjzPeDwk",
  authDomain: "blog-website-b3911.firebaseapp.com",
  projectId: "blog-website-b3911",
  storageBucket: "blog-website-b3911.appspot.com",
  messagingSenderId: "1075523016373",
  appId: "1:1075523016373:web:88daf32664a71ae24410fc",
  measurementId: "G-74NFXRB9C2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider =  new GoogleAuthProvider();
export const db = getFirestore(app);
