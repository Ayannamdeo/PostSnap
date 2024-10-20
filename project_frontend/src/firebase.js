// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1Mye3GP0qCCkfZ9BpaHAqVvr8yTjzH0A",
  authDomain: "bloggerproject-d7b7d.firebaseapp.com",
  projectId: "bloggerproject-d7b7d",
  storageBucket: "bloggerproject-d7b7d.appspot.com",
  messagingSenderId: "209992592070",
  appId: "1:209992592070:web:8201cc8531337c911c85c7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;