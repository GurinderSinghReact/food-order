import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  get,
  child,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBTZ7S6kgtse2vVMt86WUJALZ-y6RCFdVA",
  authDomain: "drinks-2abb3.firebaseapp.com",
  databaseURL:
    "https://drinks-2abb3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "drinks-2abb3",
  storageBucket: "drinks-2abb3.firebasestorage.app",
  messagingSenderId: "832813172406",
  appId: "1:832813172406:web:db7870e731f8308bd24817",
  measurementId: "G-PW8PFTRT4K",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, set, push, get, child };
