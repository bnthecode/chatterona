import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAQiIHfR0KBO0EpYIXZwdbNn95han5aAU0",
    authDomain: "chatteroni-14e1d.firebaseapp.com",
    projectId: "chatteroni-14e1d",
    storageBucket: "chatteroni-14e1d.appspot.com",
    messagingSenderId: "352450124925",
    appId: "1:352450124925:web:d361865755bcb31595e514",
    measurementId: "G-EPRLJTMZZT"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();;
  
  export { auth, provider };
  export default db;