import React, { useContext } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, styled } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import AuthContext from '../context/AuthContext';

const Layout: React.FC = ({ children }) => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <Drawer variant="permanent">
        <List />
        <UserActions>
          <ListItem onClick={logout} button>
            <ListItemIcon>{<ExitToApp />}</ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </UserActions>
      </Drawer>
      <main>{children}</main>
    </>
  );
};

const UserActions = styled(List)({
  marginTop: 'auto',
});

export default Layout;
