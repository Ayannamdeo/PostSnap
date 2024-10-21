import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIHZdDIaH_2JSRpfKqNRg-tQ8sG0_mlqk",
  authDomain: "postsnap-15c17.firebaseapp.com",
  projectId: "postsnap-15c17",
  storageBucket: "postsnap-15c17.appspot.com",
  messagingSenderId: "391924389530",
  appId: "1:391924389530:web:219c2f46f7127a079ab123",
  measurementId: "G-6CRB31FSNV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

