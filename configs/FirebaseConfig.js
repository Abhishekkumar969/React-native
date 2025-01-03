// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAayqukJTQTiWpCd5g7i7ZEcNkhU5eITgA",
    authDomain: "kabadiwala-b17b7.firebaseapp.com",
    projectId: "kabadiwala-b17b7",
    storageBucket: "kabadiwala-b17b7.firebasestorage.app",
    messagingSenderId: "327756702954",
    appId: "1:327756702954:web:6967ea3253529b5240a393",
    measurementId: "G-XHXVM1M1FT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);