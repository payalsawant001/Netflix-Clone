import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection
} from "firebase/firestore";
import { toast } from "react-toastify";

// 🔥 Your ONE Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyAkezUruRtkc1xdgep6uMfIxAPg9nd0DgQ",
  authDomain: "netflix-clone-565c3.firebaseapp.com",
  projectId: "netflix-clone-565c3",
  storageBucket: "netflix-clone-565c3.appspot.com",
  messagingSenderId: "84246594626",
  appId: "1:84246594626:web:a5474ac32ca57e7351d9db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// 🔹 Signup
export const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      authProvider: "local"
    });

    toast.success("User registered successfully!");
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};

// 🔹 Login
export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in successfully!");
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};

// 🔹 Logout
export const logout = async () => {
  await signOut(auth);
  toast.info("Logged out successfully!");
};