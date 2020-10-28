import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7ma-GcXWsC5kt3t27tyrbKjpuvwXFaFA",
    authDomain: "friends-365d0.firebaseapp.com",
    databaseURL: "https://friends-365d0.firebaseio.com",
    projectId: "friends-365d0",
    storageBucket: "friends-365d0.appspot.com",
    messagingSenderId: "1038446780024",
    appId: "1:1038446780024:web:3aeb7df13bdc5f7c2d978d",
    measurementId: "G-X52S3K1HNX"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // ...
      });
   
}


export { firebase };