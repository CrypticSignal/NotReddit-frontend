import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    localStorage.setItem("loggedInWithGoogle", true);
    localStorage.setItem("googleAccountDetails", JSON.stringify(response.user));
    return {
      successful: true,
      userData: response.user,
    };
  } catch (err) {
    console.log(err);
    return {
      successful: false,
      err: err,
    };
  }
};

export const googleAccountSignOut = async () => {
  try {
    await signOut(auth);
    return {
      successful: true,
    };
  } catch (err) {
    console.log(err);
    return {
      successful: false,
      err: err,
    };
  }
};
