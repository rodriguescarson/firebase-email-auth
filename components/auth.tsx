// components/Auth.js

import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useEffect, useState } from "react";

import firebase_app from "../lib/firebase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");

  useEffect(() => {
    setupRecaptcha(); // Setup reCAPTCHA when component mounts
  }, []);

  const handleSignUp = async () => {
    const auth = getAuth(firebase_app);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully!");
    } catch (error: any) {
      console.error("Error registering user:", error.message);
    }
  };

  const handleSignIn = async () => {
    const auth = getAuth(firebase_app);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!", user);
    } catch (error: any) {
      console.error("Error logging in:", error.message);
    }
  };

  const setupRecaptcha = () => {
    const auth = getAuth(firebase_app);
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved, allow user to proceed
            console.log("reCAPTCHA solved");
          },
          "expired-callback": () => {
            // Response expired, reCAPTCHA will request a new challenge
            console.log("reCAPTCHA expired");
          },
        }
      );
    }
  };

  const handleSendOtp = async () => {
    const auth = getAuth(firebase_app);
    const appVerifier = window.recaptchaVerifier;
    console.log("appVerifier", appVerifier);
    console.log("auth", auth.app.name);
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      console.log("OTP sent successfully!");
    } catch (error: any) {
      console.log(error);
      console.error("Error sending OTP:", error.message);
    }
  };

  const handleVerifyOtp = async () => {
    const auth = getAuth(firebase_app);
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    try {
      const userCredential = await signInWithCredential(auth, credential);
      console.log("User logged in successfully with OTP!", userCredential);
    } catch (error: any) {
      console.error("Error verifying OTP:", error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
      <br />
      <input
        type="text"
        placeholder="Phone Number"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>

      <input
        type="text"
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Auth;
