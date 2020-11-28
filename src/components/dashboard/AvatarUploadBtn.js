import React, {useState, useRef} from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Alert, Button, Modal } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { useModalState } from '../../misc/custom-hooks';
import { storage, database } from '../../misc/firebase';
import ProfileAvatar from './ProfileAvatar';

const fileInputTypes = ".png, .jpeg, .jpg";

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg']

const isValidFile = (file) => acceptedFileTypes.includes(file.type)

const getBlob = (canvas) => {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if(blob) {
                resolve(blob)
            }else{
                reject(new Error("File process error"))
            }
        });
    });
}

const AvatarUploadBtn = () => {
    const {isOpen, open, close} = useModalState();
    const {profile} = useProfile();

    const [img, setImg ] = useState(null);
    const [isLoading,setIsLoading] = useState(false)
    const avatarEditorRef = useRef(); // access for avatar canvas
   
    const onFileInputChange = (e) => {
        const currFiles = e.target.files; // returns an array of files
        if(currFiles.length === 1){
            const file = currFiles[0];
            if(isValidFile(file)) {
                setImg(file);
                open();
            }else{
                Alert.warning(`Wrong file type ${file.type}`, 4000)
            }
        }
    }

    const onUploadClick = async () => {
        // get access to edited image/ canvas
        const canvas = avatarEditorRef.current.getImageScaledToCanvas();
        // convert canvas to blob file - binary
        // canvas.toBlob(() => {

        // })
        setIsLoading(true)
        try{
            const blob = await getBlob(canvas);
            const avatarFileRef = storage.ref(`/profile/${profile.uid}`).child('avatar')
            const uploadAvatarResult = await avatarFileRef.put(blob, {  // Metadata for the newly uploaded object.
                cacheControl: `public, max-age = ${3600 * 24 * 3 }`
            })

            const downloadUrl = await uploadAvatarResult.ref.getDownloadURL()
            const userAvatarRef = database.ref(`/profiles/${profile.uid}`).child("avatar")
            userAvatarRef.set(downloadUrl)
            setIsLoading(false)
            Alert.info("Avatar has been downloaded", 4000)
        }catch(err){
            setIsLoading(false)
            Alert.error(err.message, 4000)
        }
    }

    return (
        <div className="mt-3 text-center">
            <ProfileAvatar src={profile.avatar} name={profile.name} className="width-200 height-200 img-fullsize font-huge"/>
            <div>
                <label htmlFor="avatar-upload" className="d-block cursor-pointer padded">
                    Select New Avatar
                    <input id="avatar-upload" type="file" className="d-none" accept={fileInputTypes} onChange={onFileInputChange} /> 
                </label>

                <Modal show={isOpen} onHide={close}>
                    <Modal.Header>
                        <Modal.Title>
                            Adjust and upload new avatar
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        {img && 
                            <AvatarEditor
                            // shows up as a canvas element 
                                ref={avatarEditorRef}
                                image={img}
                                width={200}
                                height={200}
                                border={10}
                                borderRadius={100}
                                rotate={0}
                            /> 
                        }
                    </div>
                     
                    </Modal.Body>
                    <Modal.Footer>
                    <Button appearance="ghost" block onClick={onUploadClick} disabled={isLoading}>
                        Upload new avatar
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default AvatarUploadBtn;
