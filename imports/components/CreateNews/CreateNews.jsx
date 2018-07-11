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
  secondActions: {
    justifyContent: 'space-between',
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
  actionButtons: {
    margin: 16,
  },
};

class CreateNews extends React.Component {
  constructor(props) {
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);

    this.state = {
      title: '',
      content: '',
      files: [],
    };
  }

  onTitleChange({ target: { value } }) {
    this.setState({
      title: value,
    });
  }

  onContentChange({ target: { value } }) {
    this.setState({
      content: value,
    });
  }

  onFileChange({ target: { files } }) {
    this.setState({
      files,
    });
  }

  render() {
    const {
      actions,
      defaultFileInput,
      topInput,
      customFileButton,
      secondActions,
      actionButtons,
    } = this.props.classes;

    const {
      title,
      content,
    } = this.state;

    return (
      <form>
        <CardHeader title="Create news" />
        <CardActions className={actions}>
          <TextField
            label="Post title"
            fullWidth
            margin="normal"
            className={topInput}
            onChange={this.onTitleChange}
            value={title}
          />
          <TextField
            label="Post content"
            fullWidth
            multiline
            margin="normal"
            rowsMax="15"
            onChange={this.onContentChange}
            value={content}
          />

          <input
            accept="image/*"
            id="raised-button-file"
            multiple
            type="file"
            className={defaultFileInput}
            onChange={this.onFileChange}
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
        </CardActions>

        <CardActions className={secondActions}>
          <Button
            className={actionButtons}
            variant="flat"
            color="secondary"
          >
            Clear
          </Button>
          <Button
            className={actionButtons}
            variant="raised"
            color="primary"
          >
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
    secondActions: PropTypes.string.isRequired,
    defaultFileInput: PropTypes.string.isRequired,
    topInput: PropTypes.string.isRequired,
    customFileButton: PropTypes.string.isRequired,
    actionButtons: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(CreateNews);
