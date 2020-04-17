import React, { Component, useCallback } from 'react';
import {
  makeStyles,
  Drawer,
  Typography,
  Container,
  IconButton,
  Toolbar,
  AppBar
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: '50%'
  },
  title: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
}));

export const SidePanel = props => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="right"
      open={!!props.open}
      classes={{
        paper: classes.drawer
      }}
      onClose={props.onClose}
    >
      
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>

          <IconButton color="inherit" onClick={props.onClose}>
            <Close/>
          </IconButton>
        </Toolbar>
        </AppBar>
        <Container className={classes.content}>
        {props.component}
      </Container>
    </Drawer>
  );
};

export default SidePanel;
