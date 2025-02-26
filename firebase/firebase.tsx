import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8iU9Rn3s7ge2vjFT9nfadg99Usu5we3g",
  authDomain: "exclusive-ecommerce-d7964.firebaseapp.com",
  projectId: "exclusive-ecommerce-d7964",
  storageBucket: "exclusive-ecommerce-d7964.firebasestorage.app",
  messagingSenderId: "970593423120",
  appId: "1:970593423120:web:033568387df329d81f1f95",
  measurementId: "G-WBQLXFXTKT"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);