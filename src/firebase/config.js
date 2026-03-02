import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuT1oWF7Rk6qwi6f2opyXyBauBJs9oTW8",
  authDomain: "enraizarte-backend.firebaseapp.com",
  projectId: "enraizarte-backend",
  storageBucket: "enraizarte-backend.firebasestorage.app",
  messagingSenderId: "376581096846",
  appId: "1:376581096846:web:705c22b80c7fc917d210df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
