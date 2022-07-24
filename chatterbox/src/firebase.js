import firebase from "firebase/app";
import 'firebase/auth';

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyCAdBDZHqBe_8zCMtVndEvxk4j2LHY_fOc",
    authDomain: "chatterboxproject-635d0.firebaseapp.com",
    databaseURL: "https://chatterboxproject-635d0-default-rtdb.firebaseio.com",
    projectId: "chatterboxproject-635d0",
    storageBucket: "chatterboxproject-635d0.appspot.com",
    messagingSenderId: "777465054292",
    appId: "1:777465054292:web:55bad1c13b0492692a59c1",
    measurementId: "G-596DZP3ZVL"
  }).auth();