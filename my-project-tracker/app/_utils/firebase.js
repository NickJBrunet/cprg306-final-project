// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3DKdTD_Fj3dspTgUQ-4XbVLM3OaM1wvI",
  authDomain: "my-project-tracker-7639c.firebaseapp.com",
  projectId: "my-project-tracker-7639c",
  storageBucket: "my-project-tracker-7639c.firebasestorage.app",
  messagingSenderId: "241382270610",
  appId: "1:241382270610:web:23b4f9916c1d211b63a84b"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();