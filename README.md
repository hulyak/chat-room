# Chat Application with React and RSuite

## Features:

- Sign in with Facebook and Google
- Link your social media accounts and create one account
- User avatar made with [React avatar editor](https://www.npmjs.com/package/react-avatar-editor)
- users can upload/edit images to their profile
- cache user avatar images for 3 days
- user can edit their nickname through the use of reusable and editable input component
- users nickname updates concurrently inside firebase storage
- Create a new chat room
- Like messages
- user online / offline
- see messages
- send a new message
- send files to chat rooms
- send audio files and play audio files
- see room information
- admin can edit room information
- broadcast message to send notification to other members
- notifications for subscribing or unsubscribing from notifications
- real-time notifications from browser
- even if the app is offline, user can get notifications
- validate user room form info with RSuite by comparing against our model Schema

## Technologies

- [REACT SUITE UI LIBRARY](https://rsuitejs.com/guide/introduction/)
- React Context API with `useContext` hook to get the username for signin and registration
- Firebase Realtime database to store profile and room info
- Firebase Authentication with Facebook and Google
- Firebase Storage to store profile info
- `useRef` hook to access Canvas element for avatar image
- React Portals/Modals.

## Installation

```bash
yarn install

yarn start
```
