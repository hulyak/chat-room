import React from 'react'
import CreateRoomBtnModal from '../components/CreateRoomBtnModal'
import DashboardToggle from '../components/dashboard/DashboardToggle'

const Sidebar = () => {
    return (
        <div className="h-100 pt-2">
            <div>
                <DashboardToggle />
                <CreateRoomBtnModal />
            </div>  
            {/* Chat room list*/}

        </div>
    )
}

export default Sidebar
