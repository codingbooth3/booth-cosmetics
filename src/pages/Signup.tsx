import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, Link } from "react-router-dom";
import '../../src/css/Signup.css';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      toast.success('User Created. Please verify your email before logging in.');

      setTimeout(() => {
        setSuccess(true);
      }, 3500);

    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
          toast.error('Email already in use. Please login to continue.');
          setTimeout(() => {
            setRedirect(true);
          }, 1000);
        } else {
          toast.error(err.message);
        }
      } else {
        toast.error('An unknown error occurred.');
      }
    }
  };

  if (auth && auth.currentUser?.emailVerified) {
    return <Navigate to={'/booth-cosmetics/account/settings/'} />
  }

  if (redirect) {
    return <Navigate to={'/booth-cosmetics/account/signin/'} />;
  }

  if (success) {
    return <Navigate to={'/booth-cosmetics/account/signin/confirm-email/'} />;
  }

  return (
    <div id="signupContainer">
      <form onSubmit={signUp} id="signUpForm">
        <h3>Sign Up</h3>
        <label htmlFor="email">
          Email :
        </label>
        <input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email@example.com"
          value={email}
        />
        <label htmlFor="password">
          Password :
        </label>
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password1234"
          value={password}
        />
        <button type="submit" id="submitSignup">Submit</button>
        <h5>Already have an account ? <Link to={'/booth-cosmetics/account/signin/'}>Login Here</Link></h5>
      </form>
    </div>
  );
}
