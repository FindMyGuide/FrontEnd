import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdM2Y7S23vVd8qhxCIwDMlIUp2f8B0iHQ",
  authDomain: "findmyguide-a6c92.firebaseapp.com",
  projectId: "findmyguide-a6c92",
  storageBucket: "findmyguide-a6c92.appspot.com",
  messagingSenderId: "342830270347",
  appId: "1:342830270347:web:48ed7998e9244e2b3a118e",
  measurementId: "G-NQSDRLWJX3",
};

export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
