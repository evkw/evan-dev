import React, { useEffect, useCallback } from 'react';
import {
  makeStyles,
  CircularProgress,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Drawer
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import UploadBtn from './components/UploadBtn';
import {
  selectGalleryLoaded,
  getGalleryEntities,
  selectGalleryEntities,
  selectSelectedItemId,
  setSelectedItem,
  clearSelected
} from './gallery.slice';
import EditIcon from '@material-ui/icons/Edit';

/* eslint-disable-next-line */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center'
  },
  gridList: {
    width: 500,
    height: 450,
    padding: theme.spacing(3)
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  drawer: {
    width: '50%'
  }
}));

export const Gallery = () => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectGalleryLoaded);
  const gallery = useSelector(selectGalleryEntities);
  const selectedItem = useSelector(selectSelectedItemId);
  const classes = useStyles();

  useEffect(() => {
    if (!isLoaded) {
      dispatch(getGalleryEntities());
    }
  });

  const onEdit = useCallback((event, id: string) => {
    event.preventDefault();
    dispatch(setSelectedItem(id))
  }, [dispatch])

  const closeSidePanel = useCallback(() => {
    dispatch(clearSelected())
  }, [dispatch])

  return (
    <>
      {!isLoaded ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <UploadBtn />
          <GridList className={classes.gridList} cols={3}>
            {gallery.map(item => (
              <GridListTile key={item.id} cols={1}>
                <img src={item.images.original} />
                <GridListTileBar
                  title={item.name}
                  actionIcon={
                    <IconButton
                      aria-label={`Edit ${item.name}`}
                      className={classes.icon}
                      onClick={(event) => onEdit(event, item.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
          <Drawer
            anchor="right"
            open={!!selectedItem}
            classes={{
              paper: classes.drawer
            }}
            onClose={closeSidePanel}
          >
            
          </Drawer>
        </>
      )}
    </>
  );
};

export default Gallery;
