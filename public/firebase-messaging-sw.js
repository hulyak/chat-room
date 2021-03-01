// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/7.22.0/firebase-app.js');
// importScripts(
//   'https://www.gstatic.com/firebasejs/7.22.0/firebase-messaging.js'
// );
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js'
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyCbKuG7VyI6jjs4-wGSA0UvQZK8ohBp0x4',
  authDomain: 'chat-app-a2a87.firebaseapp.com',
  databaseURL: 'https://chat-app-a2a87.firebaseio.com',
  projectId: 'chat-app-a2a87',
  storageBucket: 'chat-app-a2a87.appspot.com',
  messagingSenderId: '327178180054',
  appId: '1:327178180054:web:b7967252a0ab081f328077',
  measurementId: 'G-7946Z8KJ0N',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
firebase.messaging();
