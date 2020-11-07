import React from 'react'
import { Button, Drawer } from 'rsuite'
import Dashboard from '.';

const DashboardToggle = () => {
    const {isOpen, close, open} = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)');

    return (
        <>
          <Button block  color="blue" onClick={open}>
            <Icon icon="dashboard" />Dashboard
          </Button>
          {/* modal toggler */}
          <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
            <Dashboard />
          </Drawer>
        </>
    )
}

export default DashboardToggle
