import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { Snackbar, SnackbarContent } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import './snackbar.scss';
import { selectSnackbarState, close } from './snackbar.slice';

/* eslint-disable-next-line */
export interface SnackbarProps {}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const EDSnackbar = (props: SnackbarProps) => {
  const dispatch = useDispatch();
  const snackState = useSelector(selectSnackbarState)
  const handleClose = useCallback(() => dispatch(close()), [dispatch]);

  const content = snackState.type === 'info' 
  ? <SnackbarContent message={snackState.message} />
  : <Alert onClose={handleClose} severity={snackState.type}>{snackState.message}</Alert>


  return (
    <Snackbar open={snackState.isOpen} autoHideDuration={6000} onClose={handleClose}>
      {content}
    </Snackbar>
  );
};

export default Snackbar;
