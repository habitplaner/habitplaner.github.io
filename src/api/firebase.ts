import { initializeApp } from 'firebase/app';

import { firebaseConfig } from './firebase.config';

export const firebaseApp = await initializeApp(firebaseConfig);
