import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';

import { firebaseApp } from './firebase';

const auth = getAuth(firebaseApp);

export const firebaseSignIn = async () => {
  await setPersistence(auth, browserLocalPersistence);

  const provider = new GoogleAuthProvider();

  const e = localStorage.getItem('last-g-user');
  if (e) {
    provider.setCustomParameters({
      login_hint: e,
    });
  }

  return signInWithPopup(auth, provider);
};

export const firebaseSignOut = () => {
  localStorage.removeItem('last-g-user');
  return signOut(auth);
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const event = new CustomEvent('authStateChange', { detail: { user } });
    window.dispatchEvent(event);
    localStorage.setItem('last-g-user', user.email ?? '');
  } else {
    const event = new CustomEvent('authStateChange', {
      detail: { user: null },
    });
    window.dispatchEvent(event);
  }
});

export enum FirebaseAuthCustomEvents {
  AuthStateChanged = 'authStateChange',
}

export type FirebaseAuthCustomEventsPayload = {
  [FirebaseAuthCustomEvents.AuthStateChanged]: { user: User | null };
};
