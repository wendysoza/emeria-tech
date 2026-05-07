import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDabe6Kmg8-uylWkqL7XiRyxcN57g4MdPw",
  authDomain: "emeria-tech.firebaseapp.com",
  projectId: "emeria-tech",
  storageBucket: "emeria-tech.firebasestorage.app",
  messagingSenderId: "831464365204",
  appId: "1:831464365204:web:0db27221dad9da01f2a881",
  measurementId: "G-H02F81SHYT"
};

export const isConfigured = firebaseConfig.apiKey !== "TU_API_KEY";
export const appId = 'emeria-tech-unesum';

let app, auth, db;
if (isConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { auth, db };