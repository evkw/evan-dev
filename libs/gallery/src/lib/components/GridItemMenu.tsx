import React, { useCallback } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  makeStyles
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import MoreVert from '@material-ui/icons/MoreVert';
import Delete from '@material-ui/icons/Delete';
import Preview from '@material-ui/icons/InsertPhoto';
import { useDispatch } from 'react-redux';
import { deleteFile } from '../gallery.slice';
import { openSidePanel } from '@evan-dev/side-panel';
import GridDetails from './GridDetails';

/* eslint-disable-next-line */
export interface GridItemMenuProps {
  item: any;
  onEdit;
}

const useStyles = makeStyles(theme => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
}));

export const GridItemMenu = (props: GridItemMenuProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const onMenuOpen = event => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const onDelete = useCallback(event => {
    event.preventDefault();
    dispatch(deleteFile(props.item))
  }, [dispatch])

  return (
    <>
      <IconButton className={classes.icon} onClick={event => onMenuOpen(event)}>
        <MoreVert />
      </IconButton>
      <Menu
        open={!!menuOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>
          <ListItemIcon>
            <Preview fontSize="small" />
          </ListItemIcon>
          Preview
        </MenuItem>
        <MenuItem onClick={() => props.onEdit(props.item)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={onDelete}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};
