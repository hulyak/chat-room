import React, {createContext, useState,  useContext, useEffect} from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {

    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let userRef;

        const authUnsub = auth.onAuthStateChanged(async authObj => {

            if(authObj) {
                // create references
                userRef = database.ref(`/profiles/${authObj.uid}`);
                console.log(authObj);
                // sync object changes with "on", subscription, runs every time our path info changes
                userRef.on('value',(snap) => {
                    console.log("snap", snap)
                    const {name, createdAt, avatar} = snap.val();
                    
                    const data = {
                        name,
                        createdAt,
                        avatar,
                        uid : authObj.uid,
                        email : authObj.email,
                    };

                    setProfile(data);
                    setIsLoading(false)
                })
            } else {
                if(userRef) {
                    // unsubscribe
                    userRef.off();
                }
                setProfile(null);
                setIsLoading(false)
            }
        });

        // cleanup subscription onAuthStateChanged
        return () => {
            authUnsub();

            if(userRef) {
                userRef.off();
            }
        }
    }, [])

    return (
    <ProfileContext.Provider value={{isLoading, profile}}> 
        {children}
    </ProfileContext.Provider>
  );
}

// call with useProfile function
export const useProfile = () => useContext(ProfileContext)
