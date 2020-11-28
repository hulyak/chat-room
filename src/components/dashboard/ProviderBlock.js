import { auth } from '../../misc/firebase'
import firebase from 'firebase/app';
import React, {useState} from 'react'
import { Alert, Button, Icon, Tag } from 'rsuite';

const ProviderBlock = () => {
    // console.log(auth.currentUser); // access current user info
    const [isConnected, setIsConnected] = useState({
        'google.com' : auth.currentUser.providerData.some((data) => data.providerId === 'google.com'), 
        'facebook.com' : auth.currentUser.providerData.some((data) => data.providerId === 'facebook.com'),
    });

    const updateIsConnected = (providerId , value) => {
        setIsConnected(prev => {
            return {
                ...prev,
                [providerId]: value
            }
        });
    }

    const unlink = async (providerId) => {
        try {
            if(auth.currentUser.providerData.length === 1 ){
                throw new Error(`You cannot disconnect from ${providerId}`)
            }

            await auth.currentUser.unlink(providerId);
            updateIsConnected(providerId, false);
            Alert.info(`Disconnected from ${providerId}`, 4000)

        }catch(err){
            Alert.error(err.message, 4000)
        }
    }
    const unlinkFacebook = () => {
        unlink('facebook.com')
    }
    const unlinkGoogle = () => {
        unlink('google.com')
    }

    // return provider object
    const link = async (provider) => {
        try {
           await auth.currentUser.linkWithPopup(provider);
           Alert.info(`Linked to ${provider.providerId} `, 4000);
        
           updateIsConnected(provider.providerId, true);
        }catch(err){
            Alert.error(err.message, 4000)
        }
    }

    const linkFacebook = () => {
        link(new firebase.auth.FacebookAuthProvider())
    }

    const linkGoogle = () => {
        link(new firebase.auth.GoogleAuthProvider())
    }

    return (
        <div>
        {isConnected["google.com"] && 
            <Tag closable color="green" onClose={unlinkGoogle}>
                    <Icon icon="google" /> Connected
             </Tag>
        }
         {isConnected["facebook.com"] && 
            <Tag closable color="blue" onClose={unlinkFacebook}>
                <Icon icon="facebook" /> Connected
            </Tag>
         }
            <div className="mt-2">
            {!isConnected["google.com"] && 
                <Button block color="green" onClick={linkGoogle}>
                    <Icon icon="google" /> Link to Google
                </Button>
            } 
               {!isConnected["facebook.com"] &&
               <Button block color="blue" onClick={linkFacebook}>
                    <Icon icon="facebook" /> Link to Facebook
                </Button>
               }
              
            </div>
        </div>
    )
}

export default ProviderBlock
