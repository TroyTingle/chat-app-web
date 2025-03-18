import { Box } from '@mui/material';
import ChatBox from '../components/ChatBox';
import ChatList from '../components/ChatList';
import React from "react";

const Page: React.FC = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            {/*<MenuBar />*/}
            <ChatList />
            <ChatBox />
        </Box>
    );
};

export default Page;