import React, { useRef, useState, useCallback } from 'react';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';

import { uploadFiles } from '../hooks/upload';
import { useDispatch, useSelector } from 'react-redux';
import { success, error } from '@evan-dev/snackbar';
import { selectFileUploading } from '../gallery.slice';

/* eslint-disable-next-line */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  progress: {
    height: '20px !important',
    width: '20px !important',
    marginLeft: '8px'
  }
}));

export const UploadBtn = props => {
  const fileInput = useRef();
  const classes = useStyles();
  const fileUploading = useSelector(selectFileUploading);
  const dispatch = useDispatch();

  const upload = useCallback(
    () => dispatch(uploadFiles(fileInput.current.files)),
    [dispatch]
  );

  return (
    <Button variant="contained" component="label">
      Upload Files
      <input
        type="file"
        style={{ display: 'none' }}
        multiple
        accept=".png,.jpeg"
        ref={fileInput}
        onChange={upload}
      />
      {!!fileUploading ? <CircularProgress className={classes.progress} /> : null}
    </Button>
  );
};

export default UploadBtn;
