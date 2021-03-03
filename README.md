# Chat Application with React and RSuite

### [Demo](public/demo.mp4)

## Features:

- Sign in with Facebook and Google
- Link your social media accounts and create one account
- users can upload/edit images to their profile
- cache user avatar images for 3 days
- user can edit their nickname through the use of reusable and editable input component
- users nickname updates concurrently inside firebase storage
- Create a new chat room
- Like messages
- user online / offline status
- see messages
- send a new message
- send files to chat rooms
- send audio files and play audio files
- see room information
- role-based permissions, admin can edit room information
- broadcast message to send notification to other members
- notifications for subscribing or unsubscribing from notifications
- only the admin user of the room can edit the room information and the admin can grant permission to another user
- chats are grouped by dates
- pagination and scroll to bottom of the page when the user types a new message

## Technologies

- [REACT SUITE UI LIBRARY](https://rsuitejs.com/guide/introduction/) and SASS
- React Context API with `useContext` hook to get the username for signin and registration
- Firebase Realtime database to store profiles, rooms, status of the user(online/offline) and messages
- Firebase Authentication with Facebook and Google
- Firebase Storage to store profile avatar image, chat images and audio
- `useRef` hook to access Canvas element for avatar image
- Firebase Cloud Functions to add realtime data and send notifications to the user
- [FCM cloud functions](https://firebase.google.com/docs/cloud-messaging/send-message) Send messages to multiple devices
- [`Service Worker`](https://firebase.google.com/docs/cloud-messaging/js/receive) to get a background notification, even if the app is offline, user can get notifications.
- [`use-context-selector`](https://github.com/dai-shi/use-context-selector) hook 
- Build presence in [CLoud Firestore](https://firebase.google.com/docs/firestore/solutions/presence)
- [`useHover`](https://usehooks.com/useHover/) hook
- User avatar made with [React avatar editor](https://www.npmjs.com/package/react-avatar-editor)
- [react-mic](https://github.com/hackingbeauty/react-mic) for recording audio from a user's microphone 

## Installation

```bash
# application
yarn install

yarn start

# runs on http://localhost:3000/

# backend
cd functions

npm install

npm start

# runs on http://localhost:4000/
```

![firebase](public/firebase.png)

The App is developed using Node v10. 

## Run frontend locally

1. Inside `src/misc/firebase.js` replace config with your firebase project config.
2. Get FCM vapid key for real-time notificaitons from `Firebase dashboard > Cog icon > Project Settings > Cloud Messaging > Web push certificates > Key pair` and put it as `fcmVapidKey` inside `src/misc/firebase.js`.
3. Run `npm run start` and develop

## Run functions locally

1. Download a service account from `Firebase dashboard > Cog icon > Project Settings > Service accounts > Generate new private key.`
2. Put the file as `functions/service-account.json`
3. Run `npm run start` from functions

## Deployment

1. Install firebase-cli by running `npm install -g firebase-tools`
2. Run `firebase deploy`
