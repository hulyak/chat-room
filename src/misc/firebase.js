import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';
import 'firebase/functions';
import { isLocalhost } from './helpers';
import { Notification as Toast } from 'rsuite';

const config = {
  apiKey: 'AIzaSyCbKuG7VyI6jjs4-wGSA0UvQZK8ohBp0x4',
  authDomain: 'chat-app-a2a87.firebaseapp.com',
  databaseURL: 'https://chat-app-a2a87.firebaseio.com',
  projectId: 'chat-app-a2a87',
  storageBucket: 'chat-app-a2a87.appspot.com',
  messagingSenderId: '327178180054',
  appId: '1:327178180054:web:b7967252a0ab081f328077',
  measurementId: 'G-7946Z8KJ0N',
};

// instance of firebase app
const app = firebase.initializeApp(config);

// auth for Facebook and Google
export const auth = app.auth();

export const database = app.database();

export const storage = app.storage();

export const functions = app.functions('us-central1');

export const messaging = firebase.messaging.isSupported()
  ? app.messaging()
  : null;

// if (messaging) {
//   messaging.getToken({
//     vapidKey:
//       'BJ_lFbdq1RmUrKGgv4RD57-9_UstBgLx1EKm3rd2G43WK2qlPfT91e_5WhXJYcEOyfOg_EyfTVnzK_NeMAOT_r8',
//   });
if (messaging) {
  messaging.usePublicVapidKey(
    'BJ_lFbdq1RmUrKGgv4RD57-9_UstBgLx1EKm3rd2G43WK2qlPfT91e_5WhXJYcEOyfOg_EyfTVnzK_NeMAOT_r8'
  );

  // foreground
  messaging.onMessage(({ notification }) => {
    // console.log(data);
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  functions.useFunctionsEmulator('http://localhost:5001');
}
