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
  chipsActions: {
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  chips: {
    margin: 4,
  },
  chipsInput: {
    margin: 0,
  },
};

class CreateNews extends React.Component {
  constructor(props) {
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onTagKeyPress = this.onTagKeyPress.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.clearState = this.clearState.bind(this);

    this.state = {
      title: '',
      content: '',
      tagInput: '',
      files: [],
      tags: [],
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

  onTagChange({ target: { value } }) {
    this.setState({
      tagInput: value.trim(),
    });
  }

  onTagKeyPress({ key, target }) {
    const { tags } = this.state;
    if (target.value && key === 'Enter' && tags.length < 5) {
      this.setState(prevState => ({
        tags: [...prevState.tags, target.value],
        tagInput: '',
      }));
    }
  }

  onCreate() {
    const {
      title,
      content,
      tagInput,
      files,
      tags,
    } = this.state;
  }

  clearState() {
    this.setState({
      title: '',
      content: '',
      tagInput: '',
      files: [],
      tags: [],
    });
  }

  deleteTag = tag => () => {
    this.setState((state) => {
      const tags = [...state.tags];
      const chipToDelete = tags.indexOf(tag);
      tags.splice(chipToDelete, 1);
      return { tags };
    });
  };

  renderTags() {
    const { tags } = this.state;
    const { chips } = this.props.classes;
    return tags.map(tag => (
      <Chip
        key={tag + new Date().getTime() + Math.random()}
        label={tag}
        onDelete={this.deleteTag(tag)}
        className={chips}
      />
    ));
  }

  render() {
    const {
      actions,
      defaultFileInput,
      topInput,
      customFileButton,
      secondActions,
      actionButtons,
      chipsActions,
      chipsInput,
    } = this.props.classes;

    const {
      title,
      content,
      tagInput,
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
            label="Add tags - max 5"
            fullWidth
            margin="normal"
            className={chipsInput}
            onKeyPress={this.onTagKeyPress}
            onChange={this.onTagChange}
            value={tagInput}
          />
        </CardActions>
        <CardActions className={chipsActions}>
          {this.renderTags()}
        </CardActions>

        <CardActions className={secondActions}>
          <Button
            className={actionButtons}
            variant="flat"
            color="secondary"
            onClick={this.clearState}
          >
            Clear
          </Button>
          <Button
            className={actionButtons}
            variant="raised"
            color="primary"
            onClick={this.onCreate}
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
    chipsActions: PropTypes.string.isRequired,
    chips: PropTypes.string.isRequired,
    chipsInput: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(CreateNews);
