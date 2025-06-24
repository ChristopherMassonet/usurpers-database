import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';
import messages from '../data/inboxMessages.json';
import MessageModal from '../components/MessageModal';

const Inbox: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = (msg: any) => {
    setSelectedMessage(msg);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedMessage(null);
  };

  return (
    <Box maxWidth="md" mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>
        Inbox
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((msg) => (
            <React.Fragment key={msg.id}>
              <ListItem alignItems="flex-start" button onClick={() => handleOpen(msg)}>
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6">{msg.subject}</Typography>
                      <Typography variant="caption" color="text.secondary">{new Date(msg.date).toLocaleString()}</Typography>
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="subtitle2" color="primary">From: {msg.sender} &mdash; {msg.location}</Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>{msg.message}</Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <MessageModal open={modalOpen} onClose={handleClose} message={selectedMessage} />
    </Box>
  );
};

export default Inbox; 