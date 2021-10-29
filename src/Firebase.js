
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDHvIfQheiHXlfPGMvu5A8izAqDonX1tJ0",
  authDomain: "votechain-fab33.firebaseapp.com",
  projectId: "votechain-fab33",
  storageBucket: "votechain-fab33.appspot.com",
  messagingSenderId: "633143595003",
  appId: "1:633143595003:web:92c066f46b7699f9d7455e",
  measurementId: "G-F02JSZ8L0J"
};


const firebase = initializeApp(firebaseConfig);

const auth=getAuth(firebase);
const db=getFirestore(firebase);


const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

const registerWithEmailAndPassword = async (email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      await db.collection("users").add({
        uid: user.uid,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

export {auth,registerWithEmailAndPassword,signInWithEmailAndPassword,db,firebase};




