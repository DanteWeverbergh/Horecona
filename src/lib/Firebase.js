/**
 * Firebase
 */
import firebase from 'firebase/app';

export default () => {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: 'AIzaSyDVYbXjLq25PMR4tIPqfemSEydWp21iSqo',
    authDomain: 'horecona-9940c.firebaseapp.com',
    projectId: 'horecona-9940c',
    storageBucket: 'horecona-9940c.appspot.com',
    messagingSenderId: '234560805140',
    appId: '1:234560805140:web:3615922671fb0e45994a01',
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
};
