import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

interface ChatListItemProps {
  chatName: string;
  isSelected: boolean;
  onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chatName, isSelected, onClick }) => {
  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: isSelected ? "#1171d1" : "#adbbc9",
        color: isSelected ? "primary.contrastText" : "text.primary",
        borderRadius: 1,
        marginBottom: 1,
        cursor: "pointer",
        width: "15vw",
      }}
      onClick={onClick}
    >
      <Grid2 container direction='column'>
        <Grid2>
          <Typography variant='h6'>{chatName}</Typography>
        </Grid2>
        <Grid2 container justifyContent='flex-end'></Grid2>
      </Grid2>
    </Box>
  );
};

export default ChatListItem;
