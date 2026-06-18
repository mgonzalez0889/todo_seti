import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBDkTNetlKnyaFnB0DJdB7W7_IApsKejl4",
  authDomain: "feature-flag-seti.firebaseapp.com",
  projectId: "feature-flag-seti",
  storageBucket: "feature-flag-seti.firebasestorage.app",
  messagingSenderId: "676013973370",
  appId: "1:676013973370:web:6d08b516e38208d67ac0c3",
  measurementId: "G-MYCSVDKSM5"
};

export const firebaseApp = initializeApp(firebaseConfig);
