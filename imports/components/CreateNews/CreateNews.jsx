import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  CardHeader,
  TextField,
  CardActions,
  Chip,
  withStyles,
} from '@material-ui/core';

const styles = {
  actions: {
    flexDirection: 'column',
    padding: '8px 16px',
  },
  defaultFileInput: {
    display: 'none',
  },
};

class CreateNews extends React.Component {
  render() {
    const {
      actions,
      defaultFileInput,
    } = this.props.classes;

    return (
      <form>
        <CardHeader title="Create news" />
        <CardActions className={actions}>
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
            className={defaultFileInput}
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
  }
}

CreateNews.propTypes = {
  classes: PropTypes.shape({
    actions: PropTypes.string.isRequired,
    defaultFileInput: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(CreateNews);
