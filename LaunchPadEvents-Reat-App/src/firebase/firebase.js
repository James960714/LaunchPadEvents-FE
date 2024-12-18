import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_r1ahGE_GTu_cKdHI67TXIsHAdYanKWk",
  authDomain: "launchpadeventsplatform.firebaseapp.com",
  projectId: "launchpadeventsplatform",
  storageBucket: "launchpadeventsplatform.firebasestorage.app",
  messagingSenderId: "19197761972",
  appId: "1:19197761972:web:afe556db375e881f09fae1",
  measurementId: "G-21BVKD9GZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export {app, auth}