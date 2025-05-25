
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
   apiKey: "AIzaSyAZaj3uWazzyg0CwGI_SpV4kAxxO0FwWp0",
  authDomain: "majorproject-285f3.firebaseapp.com",
  databaseURL: "https://majorproject-285f3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "majorproject-285f3",
  storageBucket: "majorproject-285f3.firebasestorage.app",
  messagingSenderId: "7869555302",
  appId: "1:7869555302:web:99beccc57f42ea2ea8c3a7",
  measurementId: "G-3HTVDV2JY2"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);

export default app;
