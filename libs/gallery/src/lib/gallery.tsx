import React, { useEffect, useCallback, useState } from 'react';
import {
  makeStyles,
  CircularProgress,
  GridList,
  GridListTile,
  GridListTileBar
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import UploadBtn from './components/UploadBtn';
import {
  selectGalleryLoaded,
  getGalleryEntities,
  selectGalleryEntities,
  editGalleryRecord
} from './gallery.slice';
import { SidePanel } from '@evan-dev/side-panel';
import { GridItemMenu } from './components/GridItemMenu';
import GridDetails from './components/GridDetails';

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
    width: '100%',
    height: '100vh',
    padding: theme.spacing(3)
  },
  gridTile: {},
  gridTileBar: {},
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  drawer: {
    width: '50%'
  }
}));

export const Gallery = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const isLoaded = useSelector(selectGalleryLoaded);
  const gallery = useSelector(selectGalleryEntities);
  const classes = useStyles();

  useEffect(() => {
    if (!isLoaded) {
      dispatch(getGalleryEntities());
    }
  });

  const closeSidePanel = () => {
    setItem(null);
  };

  const onEdit = item => {
    setItem(item);
  };

  const onSave = useCallback((item) => {
    setItem(null);
    dispatch(editGalleryRecord(item));
  }, [dispatch]);

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
              <GridListTile key={item.id} cols={1} className={classes.gridTile}>
                <img src={item.images.original} />
                <GridListTileBar
                  title={item.name}
                  className={classes.gridTileBar}
                  actionIcon={<GridItemMenu item={item} onEdit={onEdit} />}
                />
              </GridListTile>
            ))}
          </GridList>
          <SidePanel
            open={!!item}
            onClose={closeSidePanel}
            title={item?.name}
            component={
            <GridDetails 
              item={item}
              onSave={onSave}
              />
          }
          />
        </>
      )}
    </>
  );
};

export default Gallery;
