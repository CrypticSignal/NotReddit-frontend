import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyAwZEpWpPeX-k4Cnti9u2o3d7dmcGBYDls",
  authDomain: "notreddit-41b5d.firebaseapp.com",
  projectId: "notreddit-41b5d",
  storageBucket: "notreddit-41b5d.appspot.com",
  messagingSenderId: "792304051151",
  appId: "1:792304051151:web:dd2eda899e6507fe2de8ba",
});

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, provider);

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
