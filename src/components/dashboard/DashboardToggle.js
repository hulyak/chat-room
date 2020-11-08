import { auth } from 'firebase';
import React, {useCallback} from 'react'
import { Alert, Button, Drawer, Icon} from 'rsuite'
import Dashboard from '.';
import {useModalState, useMediaQuery} from '../../misc/custom-hooks'

const DashboardToggle = () => {
    const {isOpen, close, open} = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)');

    const onSignOut = useCallback(() => {  // memoize 
        auth.signOut(); // firebase
        Alert.info('Signed out', 4000);
        close();
    }, [close])

    return (
        <>
          <Button block  color="blue" onClick={open}>
            <Icon icon="dashboard" />Dashboard
          </Button>
          {/* modal toggler */}
          <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
            <Dashboard onSignOut={onSignOut} />
          </Drawer>
        </>
    )
}

export default DashboardToggle;
