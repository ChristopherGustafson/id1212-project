import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  styled,
} from '@material-ui/core';
import { AddBox, ExitToApp, Games } from '@material-ui/icons';

import AuthContext from '../context/AuthContext';
import * as ROUTES from '../lib/routes';

const drawerWidth = 240;

const useStyles = makeStyles({
  drawerPaper: {
    width: drawerWidth,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
});

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const { logout } = useContext(AuthContext);

  const navigate = (route: string) => () => {
    history.push(route);
  };

  return (
    <>
      <Drawer variant="permanent" classes={{ root: classes.drawer, paper: classes.drawerPaper }}>
        <List>
          <ListItem button onClick={navigate(ROUTES.JOIN_GAME)}>
            <ListItemIcon>{<Games />}</ListItemIcon>
            <ListItemText primary="Join game" />
          </ListItem>
          <ListItem button onClick={navigate(ROUTES.CREATE_GAME)}>
            <ListItemIcon>{<AddBox />}</ListItemIcon>
            <ListItemText primary="Create game" />
          </ListItem>
        </List>
        <UserActions>
          <ListItem onClick={logout} button>
            <ListItemIcon>{<ExitToApp />}</ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </UserActions>
      </Drawer>
      <Content>{children}</Content>
    </>
  );
};

const UserActions = styled(List)({
  marginTop: 'auto',
});

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

export default Layout;
