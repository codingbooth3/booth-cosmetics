import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbNFWDeR9LC3qAqI6bKUZRiIG7uhoTgjY",
  authDomain: "booth-cosmetics.firebaseapp.com",
  projectId: "booth-cosmetics",
  storageBucket: "booth-cosmetics.appspot.com",
  messagingSenderId: "854132647638",
  appId: "1:854132647638:web:3eb0b28c6f025a95804b77",
  measurementId: "G-WHNWH7TLGD"
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getFirestore(app)
