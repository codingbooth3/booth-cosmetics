import '../../src/css/Signin.css';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import google from '../../src/imgs/google.png'

export default function Signin() {

  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (auth.currentUser) {
      setSignedIn(true);
      setEmailVerified(auth.currentUser.emailVerified);
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.emailVerified) {
        toast.success('Signed in with Google successfully.');
        setSignedIn(true);
        setEmailVerified(true);
      } else {
        toast.error('Please verify your email address.');
        await signOut(auth);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to sign in with Google.');
    }
  };

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (!auth.currentUser?.emailVerified) {
        setEmailVerified(false);
        toast.error('Please verify your email address.');
        await signOut(auth);
      } else {
        setSignedIn(true);
        setEmailVerified(true);
        toast.success('Signed in successfully.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to sign in.');
    }
  };

  if (signedIn && !emailVerified) {
    return <Navigate to="/booth-cosmetics/account/signin/confirm-email/" />;
  }

  if (signedIn && emailVerified) {
    return <Navigate to="/booth-cosmetics/account/settings/" />;
  }

  return (
    <div id='signInContainer'>
      <form onSubmit={signIn} id='signInForm'>
        <h3>Sign In</h3>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder='email@example.com'
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password1234'
          value={password}
        />
        <button type='submit' id='submitSignIn'>
          Submit
        </button>
        <h5>Need an account ? <Link to={'/booth-cosmetics/account/signup/'}>Signup Here</Link></h5>
      </form>
      <button id='signInWithGoogle' onClick={signInWithGoogle} ><img src={google} alt="" id='google'/>Sign In With Google</button>
    </div>
  );
}
 