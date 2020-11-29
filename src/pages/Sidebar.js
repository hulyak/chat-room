import React, { useRef, useState, useEffect } from 'react';
import { Divider } from 'rsuite';
import CreateRoomBtnModal from '../components/CreateRoomBtnModal';
import DashboardToggle from '../components/dashboard/DashboardToggle';
import ChatRoomList from '../components/rooms/ChatRoomList';

const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height, setHeight] = useState(null);

  useEffect(() => {
    if (topSidebarRef.current) {
      setHeight(topSidebarRef.current.scrollHeight);
    }
  }, [topSidebarRef]);

  return (
    <div className="h-100 pt-2">
      {/* get the height of components */}
      <div ref={topSidebarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join Conversation</Divider>
      </div>
      {/* Chat room list*/}
      <ChatRoomList aboveElementHeight={height} />
    </div>
  );
};

export default Sidebar;
