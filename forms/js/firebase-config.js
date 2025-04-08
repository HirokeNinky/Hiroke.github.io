// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqHJJCa4hbH_Tc9dvqriZ_p41180pKuxA",
    authDomain: "hiroke-d904d.firebaseapp.com",
    projectId: "hiroke-d904d",
    storageBucket: "hiroke-d904d.firebasestorage.app",
    messagingSenderId: "988494243990",
    appId: "1:988494243990:web:cece57d16d851e8e6c7ab&"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore(); 