import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Route, Link, useRouteMatch, Switch } from 'react-router-dom';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Hidden,
  Drawer,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Container,  
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { deepPurple } from '@material-ui/core/colors';
import { EDSnackbar } from '@evan-dev/snackbar'

/* eslint-disable-next-line */
export interface AdminProps {}
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  appBarNoDrawer: {
    [theme.breakpoints.up('sm')]: {
      width: `100%`,
    }
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500]
  }
}));

export const Admin = props => {
  const { container, user, routes } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { path, url } = useRouteMatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {routes.map((route, index) => (
          <Link key={route.display} to={route.path !== '' ? `${url}/${route.path}`: url}>
            <ListItem button>
            <ListItemIcon>{route?.icon}</ListItemIcon>
            <ListItemText primary={route?.display} />
          </ListItem>
        </Link>
          
        ))}
      </List>
    </div>
  );

  const adminRoutes = routes => {
    return routes.map((route, index) => {
      const {component: Component} = route;
      return <Route exact key={route.display} path={route.path !== '' ? `${url}/${route.path}`: url} component={() => <Component/>}/>
    });
  };

  const nav = routes => {
   return  (routes.length === 1 ? null : <nav className={classes.drawer}>
    <Hidden smUp implementation="css">
      <Drawer
        container={container}
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </Hidden>
    <Hidden xsDown implementation="css">
      <Drawer
        classes={{
          paper: classes.drawerPaper
        }}
        variant="permanent"
        open
      >
        {drawer}
      </Drawer>
    </Hidden>
  </nav>)
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={routes.length === 1 ? null: classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            {props.title}
          </Typography>

          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Avatar className={classes.purple}>{user?.intials}</Avatar>
          </Button>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={props.onLogOut}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {nav(routes)}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          <Switch>
            {adminRoutes(routes)}
          </Switch>
        </Container>
        <EDSnackbar/>
      </main>
    </div>
  );
};

export default Admin;
