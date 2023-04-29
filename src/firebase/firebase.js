import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCi_sykjemZsDiszXV9UJZHB5joeNiOPuU",
  authDomain: "aniverse-b1f7f.firebaseapp.com",
  projectId: "aniverse-b1f7f",
  storageBucket: "aniverse-b1f7f.appspot.com",
  messagingSenderId: "665152378678",
  appId: "1:665152378678:web:9f2e6a76c633ee260f4597"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const seriesRef=collection(db,"series");
export const reviewsRef=collection(db,"reviews");
export const usersRef=collection(db,"users");
export default app;