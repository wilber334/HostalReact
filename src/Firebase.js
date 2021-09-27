
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyANTC8NfD2N1scn0ajo8pJtNGvNSig-lrM",
    authDomain: "hostal-santa-catalina.firebaseapp.com",
    projectId: "hostal-santa-catalina",
    storageBucket: "hostal-santa-catalina.appspot.com",
    messagingSenderId: "495019195926",
    appId: "1:495019195926:web:2e13f2b1c7d70e1bc3ff37",
    measurementId: "G-TXQ2MGYN2E",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();