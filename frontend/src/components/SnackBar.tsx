import React, { useCallback, useState } from 'react';

import { IconButton, Snackbar } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Alert, AlertProps } from '@material-ui/lab';

interface Message extends Partial<AlertProps> {
  content: string;
}
const SnackbarContext = React.createContext((_: Message) => {});

export const SnackbarContextProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<Message>({ content: '', severity: 'success' });

  const handleClose = () => {
    setIsOpen(false);
  };

  const open = useCallback((newMessage: Message) => {
    setMessage(newMessage);
    handleOpen();
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <SnackbarContext.Provider value={open}>
      {children}
      <Snackbar
        autoHideDuration={5000}
        open={isOpen}
        onClose={handleClose}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={handleClose} {...message}>
          {message.content}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
