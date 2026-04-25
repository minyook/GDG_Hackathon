import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrotj0zf01CLhJ4mYhf9lClMgIHeS0LG0",
  authDomain: "destiny-scanner-494400.firebaseapp.com",
  projectId: "destiny-scanner-494400",
  storageBucket: "destiny-scanner-494400.firebasestorage.app",
  messagingSenderId: "14432417743",
  appId: "1:14432417743:web:16e8c64f8a519fe1e444ba",
  measurementId: "G-YW6XLZTYP2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
