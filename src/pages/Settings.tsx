import '../../src/css/Settings.css';
import { auth } from '../config/firebase';
import { signOut, updateEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function Settings() {
  const [signedIn, setSignedIn] = useState<boolean>(true);
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email!, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updateEmail(auth.currentUser, newEmail);
      toast.success('Email updated successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update email.');
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email!, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      toast.success('Password updated successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update password.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('You are being logged out.');
      setTimeout(() => {
        setSignedIn(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error('Failed to log out.');
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
        toast.error('Please sign in to update settings.');
      }
    });
    return () => unsubscribe();
  }, []);

  if (!signedIn) {
    return <Navigate to={'/booth-cosmetics/account/signin/'} />;
  }

  return (
    <div id='settingsContainer'>
      <div id="settingsHeaderContainer">
        <h1>Settings</h1>
      </div>
      <div id="settingsUpdateContainer">
        <form id="settingsEmailPasswordContainer" onSubmit={handleUpdateEmail}>
          <div id="currentEmailContainer">
            <h3 id="currentEmail">Current Email :</h3>
            <input type="email" value={currentEmail} onChange={(e) => setCurrentEmail(e.target.value)} />
          </div>
          <div id="updateEmailContainer">
            <h3 id="newEmail">New Email :</h3>
            <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          </div>
          <div className="submitButtonContainer">
            <button type='submit' className='submitButton'>Update Email</button>
          </div>
        </form>
        <form id="settingsUpdatePasswordContainer" onSubmit={handleUpdatePassword}>
          <div id="currentPasswordContainer">
            <h3 id="currentPassword">Current Password :</h3>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
          <div id="newPasswordContainer">
            <h3 id="newPassword">New Password :</h3>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className="submitButtonContainer">
            <button type="submit" className='submitButton'>Update Password</button>
          </div>
        </form>
      </div>
      <div id="logoutButtonContainer">
        <button onClick={logout} id='logoutButton'>Logout</button>
      </div>
    </div>
  );
}
