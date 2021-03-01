import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, database, messaging } from '../misc/firebase';
import firebase from 'firebase/app';

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let userStatusDatabaseRef;
    let tokenRefreshUnsub;

    const authUnsub = auth.onAuthStateChanged(async authObj => {
      if (authObj) {
        userStatusDatabaseRef = database.ref(`/status/${authObj.uid}`);
        console.log(authObj.uid);
        userRef = database.ref(`/profiles/${authObj.uid}`);
        console.log(authObj);

        userRef.on('value', snap => {
          console.log('snap', snap);
          const { name, createdAt, avatar } = snap.val();

          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };

          setProfile(data);
          setIsLoading(false);
        });

        database.ref('.info/connected').on('value', function (snapshot) {
          if (!!snapshot.val() === false) {
            return;
          }

          userStatusDatabaseRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(function () {
              userStatusDatabaseRef.set(isOnlineForDatabase);
            });
        });

        if (messaging) {
          try {
            const currentToken = await messaging.getToken();
            if (currentToken) {
              await database.ref(`fcm_tokens/${currentToken}`).set(authObj.uid);
            }
          } catch (err) {
            console.log('An error occurred while retrieving token. ', err);
          }

          tokenRefreshUnsub = messaging.onTokenRefresh(async () => {
            try {
              const currentToken = await messaging.getToken();
              if (currentToken) {
                await database
                  .ref(`/fcm_tokens/${currentToken}`)
                  .set(authObj.uid);
              }
            } catch (err) {
              console.log('An error occurred while retrieving token. ', err);
            }
          });
        }
      } else {
        if (userRef) {
          // unsubscribe
          userRef.off();
        }
        if (userStatusDatabaseRef) {
          userStatusDatabaseRef.off();
        }
        if (tokenRefreshUnsub) {
          tokenRefreshUnsub();
        }

        database.ref('.info/connected').off();
        setProfile(null);
        setIsLoading(false);
      }
    });

    // cleanup subscription onAuthStateChanged
    return () => {
      authUnsub();

      if (userRef) {
        userRef.off();
      }
      if (userStatusDatabaseRef) {
        userStatusDatabaseRef.off();
      }
      if (tokenRefreshUnsub) {
        tokenRefreshUnsub();
      }

      database.ref('.info/connected').off();
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// call with useProfile function
export const useProfile = () => useContext(ProfileContext);
