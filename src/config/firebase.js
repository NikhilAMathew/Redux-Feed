import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJ1S6t3M9LmNApLZzhNdQfIGIBy6KQuew",
  authDomain: "social-redux-d9bea.firebaseapp.com",
  projectId: "social-redux-d9bea",
  storageBucket: "social-redux-d9bea.firebasestorage.app",
  messagingSenderId: "907629154787",
  appId: "1:907629154787:web:95700d10024805ca4b90d6",
  measurementId: "G-NK0MBM4XME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc };
