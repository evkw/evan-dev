import React, { useState } from 'react';
import {
  makeStyles,
  TextField,
  FormControlLabel,
  Switch,
  Button} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

/* eslint-disable-next-line */
export interface GridDetailsProps {
  item: any;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& .MuiFormControl-root': {
      margin: theme.spacing(1)
    }
  }
}));

export const GridDetails = props => {
  const [detail, setDetails] = useState(props.item);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...detail, [event.target.name]: event.target.value });
  };
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...detail, [event.target.name]: event.target.checked });
  };

  const hanelAddChip = chip => {
    setDetails({ ...detail, tags: [...detail.tags, chip] });
  };

  const handleDeleteChip = (chip, index) => {
    const removedTag = [
      ...detail.tags.slice(0, index),
      ...detail.tags.slice(index + 1)
    ];
    setDetails({ ...detail, tags: removedTag });
  };

  const classes = useStyles();
  return (
    <>
      <form noValidate autoComplete="off" className={classes.root}>
        <FormControlLabel
          control={
            <Switch
              checked={detail.showInGallery}
              onChange={handleCheck}
              name="showInGallery"
              color="primary"
            />
          }
          label="Show In Gallery"
        />

        <TextField
          value={detail.name}
          onChange={handleChange}
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
        />
         <TextField
          value={new Date(detail.dateUploaded).toDateString()}
          name="name"
          label="Uploaded"
          variant="outlined"
          fullWidth
          disabled
        />
        <TextField
          onChange={handleChange}
          name="shopAddress"
          label="Shop URL"
          variant="outlined"
          fullWidth
          value={detail.shopAddress || ''}
        />

        <ChipInput
          label="Tags"
          variant="outlined"
          fullWidth
          value={detail.tags}
          onAdd={chip => hanelAddChip(chip)}
          onDelete={(chip, index) => handleDeleteChip(chip, index)}
        />
      </form>

      <Button variant="contained"  color="primary" onClick={() => props.onSave(detail)}> Save </Button>
    </>
  );
};

export default GridDetails;
