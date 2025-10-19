      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
      import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
      import { getDatabase, ref, set, child, get, push, increment, onValue, update } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js'
      import { getStorage, ref as storageRef, getDownloadURL, listAll, uploadBytes  } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js'
      import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js'
 

      const firebaseConfig = {
        apiKey: "AIzaSyDCFjWcf_awq1d6DHe7DtFoOywSjgz5Qaw",
        authDomain: "habit-planer.firebaseapp.com",
        databaseURL: "https://habit-planer-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "habit-planer",
        storageBucket: "habit-planer.firebasestorage.app",
        messagingSenderId: "677287849901",
        appId: "1:677287849901:web:2c60a691a3820bbfb4fb24",
        measurementId: "G-2C07MZMTS1"
      };
    
      // Initialize Firebase
      const app = await initializeApp(firebaseConfig);
        
      const database = getDatabase(app);
        
      const auth = getAuth(app);

      const storage = getStorage(app);

      const messaging = getMessaging(app);

      //console.log('auth.currentUser', auth.currentUser)

      window.db = {
        set: async (path, data) => {
          return await set(ref(database, path), data);
        },
        get: async (path) => {
          const snapshot = await get(child(ref(database), path));
          if (snapshot.exists()) {
            return snapshot.val()
          }

          return null;
        },
        update: async (pathValueMap) => {
          return update(ref(database), pathValueMap);
        },
        getUniqueKey: async (path) => {
          return await push(child(ref(database), path)).key
        },
        increment: async (count = 1) => {
          return increment(count);
        },
        

        addListener: (path, cb) => {
          const r = ref(database, path);
          onValue(r, (snapshot) => {
            const data = snapshot.val();
            cb(data);
          });
        },
        removeListener: (path) => {

        },
        
      }

      window.cloudStorage = {
        addFile: async (path, file) => {
          const fileRef = storageRef(storage, path);
          return await uploadBytes(fileRef, file);
        },
        getFileUrl: async (path) => {
            const fileRef = storageRef(storage, path);
            return await getDownloadURL(fileRef)
        },
        listFiles: async (path) => {
            const fileRef = storageRef(storage, path);
            const { items } = await listAll(fileRef);
            return items
        },
      }

 
       
      window.auth = {
        user: null,
        login: () => {
          return setPersistence(auth, browserLocalPersistence).then(() => {
            const provider = new GoogleAuthProvider();

            const e = localStorage.getItem('last-g-user');
            if (e) {
              provider.setCustomParameters({
                'login_hint': e
              });
            }


            return signInWithPopup(auth,provider);
          })
        },
        logout: () => {
          localStorage.removeItem('last-g-user');
          return signOut(auth);
        },
        loginListeners: [],
        logoutListeners: []
      }

      onAuthStateChanged(auth, async (user) => {
        if (user) {
       
          localStorage.setItem('last-g-user', user.email)

          console.info('onAuthStateChanged', user)
          window.auth.user = user;
          const cur = await window.db.get(`users/${user.uid}`)
          if (!cur) {
            await window.db.set(`users/${user.uid}`, { name: user.displayName, photo: user.photoURL, email: user.email, lastLogin: new Date().toISOString() });
          }
          const event = new CustomEvent("authStateChange", { detail: { user } });
          window.dispatchEvent(event)

          window.auth.loginListeners.forEach((cb) => cb.call(cb, user))
        } else {
          const event = new CustomEvent("authStateChange", { detail: { user: null } });
          window.dispatchEvent(event)
          window.auth.user = null;
          console.log('onAuthStateChanged NO', user);
          window.auth.logoutListeners.forEach((cb) => cb.call(cb))
        }
      });