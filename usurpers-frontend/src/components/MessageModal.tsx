import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

interface Message {
  id: number;
  sender: string;
  date: string;
  subject: string;
  message: string;
  location: string;
  read?: boolean;
}

interface MessageModalProps {
  open: boolean;
  onClose: () => void;
  message: Message | null;
}

const MessageModal: React.FC<MessageModalProps> = ({ open, onClose, message }) => {
  if (!message) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{message.subject}</DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          <Typography variant="subtitle2" color="primary">
            From: {message.sender}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(message.date).toLocaleString()} &mdash; {message.location}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {message.message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageModal; 