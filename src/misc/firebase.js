import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCbKuG7VyI6jjs4-wGSA0UvQZK8ohBp0x4',
  authDomain: 'chat-app-a2a87.firebaseapp.com',
  databaseURL: 'https://chat-app-a2a87.firebaseio.com',
  projectId: 'chat-app-a2a87',
  storageBucket: 'chat-app-a2a87.appspot.com',
  messagingSenderId: '327178180054',
  appId: '1:327178180054:web:62a9b3eafeab2b9e328077',
  measurementId: 'G-RNY6TT1FP1',
};

// instance of firebase app
const app = firebase.initializeApp(config);

// auth for Facebook and Google
export const auth = app.auth();

export const database = app.database();
