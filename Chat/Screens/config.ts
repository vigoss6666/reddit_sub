import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDaNVhjI57pzOgi7wctWm-5y9Vvtbey0Kc",
    authDomain: "friends-4b02d.firebaseapp.com",
    databaseURL: "https://friends-4b02d.firebaseio.com",
    projectId: "friends-4b02d",
    storageBucket: "friends-4b02d.appspot.com",
    messagingSenderId: "666403732793",
    appId: "1:666403732793:web:5cbd60e55a155f43453ce8",
    measurementId: "G-SB24S4SYE9"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };