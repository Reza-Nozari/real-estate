// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAipdDsrgiGqKA0GrfHNS87S9bKpHnCjJE",
    authDomain: "real-estate-81275.firebaseapp.com",
    projectId: "real-estate-81275",
    storageBucket: "real-estate-81275.appspot.com",
    messagingSenderId: "805242235029",
    appId: "1:805242235029:web:7469eceb078cc61332939c"
};

// Initialize Firebase
const app =initializeApp(firebaseConfig);
export const  db=getFirestore(app);