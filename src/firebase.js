// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Aapki Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAqXevjsgDZHIxkrlAXJEqR5OrIKzaBgw",
  authDomain: "mediconnect-36e6f.firebaseapp.com",
  projectId: "mediconnect-36e6f",
  storageBucket: "mediconnect-36e6f.firebasestorage.app",
  messagingSenderId: "625028088885",
  appId: "1:625028088885:web:c27fc4155676dbecc39d7c",
  measurementId: "G-8S7PGJRJ2M"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Authentication aur Google Provider setup kar rahe hain
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();