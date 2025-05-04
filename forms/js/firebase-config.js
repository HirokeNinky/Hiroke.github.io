import { firebase.initializeApp } from "firebase/app";
import { firebase.firestore } from "firebase/analytics";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqHJJCa4hbH_Tc9dvqriZ_p41180pKuxA",
  authDomain: "hiroke-d904d.firebaseapp.com",
  databaseURL: "https://hiroke-d904d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hiroke-d904d",
  storageBucket: "hiroke-d904d.firebasestorage.app",
  messagingSenderId: "988494243990",
  appId: "1:988494243990:web:ec5aafe811ea8c686c7ab7",
  measurementId: "G-WTGVNQSHHF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore(); 

