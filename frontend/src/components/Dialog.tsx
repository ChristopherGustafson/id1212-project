import { Dialog, DialogTitle, styled } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';

interface Message {
  content: string;
  redirect: string;
}

const DialogContext = React.createContext((_: Message) => {});

export const DialogContextProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<Message>({ content: '', redirect: '' });

  const handleClose = () => {
    setIsOpen(false);
    if (message.redirect) {
      history.push(message.redirect);
    }
  };

  const open = useCallback((message: Message) => {
    setMessage(message);
    handleOpen();
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <DialogContext.Provider value={open}>
      {children}
      <Dialog open={isOpen} onClose={handleClose}>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        <DialogTitleCloseButton>{message.content}</DialogTitleCloseButton>
      </Dialog>
    </DialogContext.Provider>
  );
};

const DialogTitleCloseButton = styled(DialogTitle)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
}));

export default DialogContext;
