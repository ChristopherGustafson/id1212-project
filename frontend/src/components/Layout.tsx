import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import {
  AppBar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  styled,
  SwipeableDrawer,
  Toolbar,
} from '@material-ui/core';
import { AddBox, ExitToApp, Games, Menu } from '@material-ui/icons';

import AuthContext from '../context/AuthContext';
import * as ROUTES from '../lib/routes';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  toolbar: theme.mixins.toolbar,
}));

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const navigate = (route: string) => () => {
    history.push(route);
    handleDrawerClose();
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };

  const NavigationList: React.FC = () => (
    <>
      <List>
        <ListItem
          selected={history.location.pathname === ROUTES.JOIN_GAME}
          button
          onClick={navigate(ROUTES.JOIN_GAME)}
        >
          <ListItemIcon>{<Games />}</ListItemIcon>
          <ListItemText primary="Join game" />
        </ListItem>
        <ListItem
          selected={history.location.pathname === ROUTES.CREATE_GAME}
          button
          onClick={navigate(ROUTES.CREATE_GAME)}
        >
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
    </>
  );

  return (
    <>
      <Hidden smUp>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleDrawerOpen}>
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Hidden>
      <nav>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{ root: classes.drawer, paper: classes.drawerPaper }}
          >
            <NavigationList />
          </Drawer>
        </Hidden>
        <Hidden smUp implementation="css">
          <SwipeableDrawer
            variant="temporary"
            open={mobileOpen}
            ModalProps={{ keepMounted: true }}
            classes={{ root: classes.drawer, paper: classes.drawerPaper }}
            onClose={handleDrawerClose}
            onOpen={handleDrawerOpen}
          >
            <div className={classes.toolbar} />
            <Divider />
            <NavigationList />
          </SwipeableDrawer>
        </Hidden>
      </nav>
      <Content>
        <Hidden smUp>
          <div className={classes.toolbar} />
        </Hidden>
        {children}
      </Content>
    </>
  );
};

const UserActions = styled(List)({
  marginTop: 'auto',
});

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
}));

export default Layout;
