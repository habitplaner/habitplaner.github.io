import {
  child,
  get,
  getDatabase,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';

import { firebaseApp } from './firebase';

const database = getDatabase(firebaseApp);

export const firebaseDatabaseGetData = async (path: string) => {
  const snapshot = await get(child(ref(database), path));
  if (snapshot.exists()) {
    return snapshot.val();
  }

  return null;
};

export const firebaseDatabaseSetData = async <R>(path: string, data: R) => {
  return await set(ref(database, path), data);
};

export const firebaseDatabaseUpdateData = async (pathValueMap: object) => {
  return await update(ref(database), pathValueMap);
};

export const firebaseDatabaseGetUniqueKey = async (path: string) => {
  return await push(child(ref(database), path)).key;
};

export const firebaseDatabaseDeleteData = async (path: string) => {
  return await remove(ref(database, path));
};
