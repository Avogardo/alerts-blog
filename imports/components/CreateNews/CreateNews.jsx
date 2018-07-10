import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  CardHeader,
  TextField,
  CardActions,
  Chip,
  withStyles,
  CardContent,
  Typography,
} from '@material-ui/core';

const styles = {
  actions: {
    flexDirection: 'column',
    padding: '8px 16px',
  },
  defaultFileInput: {
    display: 'none',
  },
  topInput: {
    marginTop: 0,
  },
  customFileButton: {
    marginTop: 35,
  },
};

class CreateNews extends React.Component {
  render() {
    const {
      actions,
      defaultFileInput,
      topInput,
      customFileButton,
    } = this.props.classes;

    return (
      <form>
        <CardHeader title="Create news" />
        <CardActions className={actions}>
          <TextField
            label="Post title"
            fullWidth
            margin="normal"
            className={topInput}
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
            className={defaultFileInput}
          />
          <label className={customFileButton} htmlFor="raised-button-file">
            <Button variant="raised" component="span">
              Upload images
            </Button>
          </label>
          <CardContent>
            <Typography paragraph>
              Select images to import (max 15 photos, 300kb per file)
            </Typography>
          </CardContent>

          <TextField
            label="Type tags"
            fullWidth
            margin="normal"
            className={topInput}
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
  }
}

CreateNews.propTypes = {
  classes: PropTypes.shape({
    actions: PropTypes.string.isRequired,
    defaultFileInput: PropTypes.string.isRequired,
    topInput: PropTypes.string.isRequired,
    customFileButton: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(CreateNews);
