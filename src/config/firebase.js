// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwVWn_XaFhyDHco9_5lkhWyzqJMNO89uw",
  authDomain: "cryptomonster-e99d0.firebaseapp.com",
  projectId: "cryptomonster-e99d0",
  storageBucket: "cryptomonster-e99d0.appspot.com",
  messagingSenderId: "775264672511",
  appId: "1:775264672511:web:ff40e74f1d0dd73f068aca",
  measurementId: "G-ZL9X6Y01ZN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
