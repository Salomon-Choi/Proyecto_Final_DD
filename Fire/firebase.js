import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
  } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9ipsJYqRFOSS6DTMM3d_QLsR1HyCSYvY",
  authDomain: "proyectodd-eaf93.firebaseapp.com",
  projectId: "proyectodd-eaf93",
  storageBucket: "proyectodd-eaf93.appspot.com",
  messagingSenderId: "789934410887",
  appId: "1:789934410887:web:95432beca3a6dd0ed83c22",
  measurementId: "G-6SDB27K8X2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()


export const safeTask = (title, description)=>{
addDoc(collection(db, 'task'), {title, description})
}

export const getTask =()=> getDocs(collection(db, 'task'))