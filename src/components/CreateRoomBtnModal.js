import React, {useState, useCallback, useRef} from 'react'
import { Alert, Button, ControlLabel, Form, FormControl, FormGroup, Icon, Modal, Schema } from 'rsuite'
import { useModalState } from '../misc/custom-hooks'
import firebase from 'firebase/app'
import { database } from '../misc/firebase'

const { StringType } = Schema.Types;
const model = Schema.Model({
    name: StringType().isRequired('Chat name is required'),
    description: StringType().isRequired('Description is required')
})

const INITIAL_FORM = {
    name: '',
    description: ''
}

const CreateRoomBtnModal = () => {
    const {isOpen, open, close} = useModalState();
    const [formValue, setFormValue] = useState(INITIAL_FORM);
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef();

    const onFormChange = useCallback(value => {
        setFormValue(value)
    }, []);

    const onSubmit = async ()=> {
        if(!formRef.current.check()) return;
        setIsLoading(true);

        // save obj to database
        const newRoomData = {
            ...formValue, 
            createdAt: firebase.database.ServerValue.TIMESTAMP
        }
        try {
            await database.ref("rooms").push(newRoomData); // push new value
            Alert.info(`${formValue.name} has been created`, 4000)
            setIsLoading(false)
            setFormValue(INITIAL_FORM)
            close(); //close modal window
        }catch(err){
            setIsLoading(false)
            Alert.error(err.message, 4000)
        }
    }

    return (
        <div className="mt-1">
          <Button block color="green" onClick={open}>
              <Icon icon="creative" /> Create new chat room
          </Button>

          <Modal show={isOpen} onHide={close}>
              <Modal.Header>
                  <Modal.Title>
                      New  Chatroom
                  </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <Form fluid onChange={onFormChange} formValue={formValue} model={model} ref={formRef}> 
                      <FormGroup>
                          <ControlLabel>Room name</ControlLabel>
                          {/* input */}
                          <FormControl name="name" placeholder="Enter chat room name..." />
                      </FormGroup>

                      <FormGroup>
                        <ControlLabel>Description</ControlLabel>
                        <FormControl componentClass="textarea" name="name" rows={5} name="description" placeholder="Enter room description..." />
                      </FormGroup>
                  </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button block appearance="primary" onClick={onSubmit} disabled={isLoading}>
                    Create new chat room
                </Button>
              </Modal.Footer>
         </Modal>
        </div>
    )
}

export default CreateRoomBtnModal
