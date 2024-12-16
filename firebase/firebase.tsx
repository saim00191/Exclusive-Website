import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDgHTvN8-EyUyginwla0LZPxHh1-LhhBCc",
  authDomain: "e-commerce-fd857.firebaseapp.com",
  projectId: "e-commerce-fd857",
  storageBucket: "e-commerce-fd857.firebasestorage.app",
  messagingSenderId: "1092024982730",
  appId: "1:1092024982730:web:f3641369d823f2c9506833",
  measurementId: "G-YXHK0PSK3G",
};

export const app = initializeApp(firebaseConfig);
