// Import the functions you need from the SDKs you need, firebase 9
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "instagram-clone-fd82a.firebaseapp.com",
  projectId: "instagram-clone-fd82a",
  storageBucket: "instagram-clone-fd82a.appspot.com",
  messagingSenderId: "147860034600",
  appId: "1:147860034600:web:30b4675d862d592c12911d",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase, when using nextjs
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { db, storage, app };
