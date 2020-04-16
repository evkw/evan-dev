import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';

import './gallery.scss';
import { uploadFiles } from './hooks/upload';
import { useDispatch } from 'react-redux'
import { success, error } from '@evan-dev/snackbar';

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

export const Gallery = (props) => {
  const fileInput = useRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(false);

  const upload = useCallback(
    (event) => {
      if(!!fileInput.current) {
        setProgress(true);
        uploadFiles(fileInput.current.files)
        .then(res => {
          setProgress(false);
          dispatch(success(`${fileInput.current.files.length} files uploaded successfully`))
        })
        .catch(err => {
          setProgress(false);
          dispatch(error('Some files were not uploaded successfully'))
        });
      }
  }, [dispatch, setProgress]);

  return (
    <div>
      <h1>Welcome to gallery component!</h1>
      <Button
        variant="contained"
        component="label"
      >
        Upload Files
        <input
          type="file"
          style={{ display: "none" }}
          multiple
          accept=".png,.jpeg"
          ref={fileInput}
          onChange = {upload}/>
          {!!progress ? <CircularProgress className={classes.progress} /> : null}
      </Button>
    </div>
  );
};

export default Gallery;
