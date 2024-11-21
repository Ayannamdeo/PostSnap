import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const Apikey = import.meta.env.VITE_APIKEY;
const AuthDomain = import.meta.env.VITE_AUTHDOMAIN;
const ProjectId = import.meta.env.VITE_PROJECTID;
const StorageBucket = import.meta.env.VITE_STORAGEBUCKET;
const MessagingSenderId = import.meta.env.VITE_MESSAGINGSENDERID;
const AppId = import.meta.env.VITE_APPID;
const MeasurementId = import.meta.env.VITE_MEASUREMENTID;
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${Apikey}`,
  authDomain: `${AuthDomain}`,
  projectId: `${ProjectId}`,
  storageBucket: `${StorageBucket}`,
  messagingSenderId: `${MessagingSenderId}`,
  appId: `${AppId}`,
  measurementId: `${MeasurementId}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

