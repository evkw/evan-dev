import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { Snackbar } from '@material-ui/core';
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

  return (
    <Snackbar open={snackState.isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={snackState.type}>
        {snackState.message}
      </Alert>
    </Snackbar>
  );
};

export default Snackbar;
