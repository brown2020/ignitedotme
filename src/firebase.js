import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBI3laHoOF3cmU7WT5RaPydHkKW2LWwV_Q",
  authDomain: "ignitedotme.firebaseapp.com",
  projectId: "ignitedotme",
  storageBucket: "ignitedotme.appspot.com",
  messagingSenderId: "610259718984",
  appId: "1:610259718984:web:a4dd11b686e67f0550197d",
  clientId: process.env.GOOGLE_CLIENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export const auth = getAuth(app);

export { db, storage };
