import React from 'react';

import {
  Button,
  CardHeader,
  TextField,
  CardActions,
  Chip,
} from '@material-ui/core';

const CreateNews = () => (
  <form>
    <CardHeader title="Create news" />
    <CardActions>
      <TextField
        label="Post title"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Post content"
        fullWidth
        multiline
        margin="normal"
        rowsMax="15"
      />

      <input
        accept="image/*"
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span">
          Upload images
        </Button>
      </label>

      <TextField
        label="Type tags"
        fullWidth
        margin="normal"
      />
      <Chip label="data.label" />

      <Button variant="flat" color="secondary">
        Clear
      </Button>
      <Button variant="raised" color="primary">
        Create
      </Button>
    </CardActions>
  </form>
);

export default CreateNews;
