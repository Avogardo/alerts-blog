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
  Snackbar,
  Avatar,
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
  contentInput: {
    marginBottom: 35,
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
      unit8ArrayFiles: [],
      tags: [],
      isSnackBarOpen: false,
      snackBarMessage: '',
      titleError: '',
      contentError: '',
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

  onFileChange({ target }) {
    const fileArray = [...target.files];
    // read the file as arraybuffer
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // convert to binary
        const buffer = new Uint8Array(reader.result);
        this.setState(prevState => ({
          unit8ArrayFiles: [
            ...prevState.unit8ArrayFiles,
            { image: buffer, name: file.name },
          ],
        }));
      };

      reader.readAsArrayBuffer(file);
    });

    target.value = null;
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
    const { createNews } = this.props;
    const {
      title,
      content,
      unit8ArrayFiles,
      tags,
    } = this.state;

    if (this.validateForm(title, content)) {
      return;
    }

    createNews(
      title,
      content,
      { data: unit8ArrayFiles },
      tags,
    ).then(() => {
      this.clearState();
      this.setState({
        snackBarMessage: 'News has been created',
        isSnackBarOpen: true,
      });
    }).catch((error) => {
      this.setState({
        snackBarMessage: error,
        isSnackBarOpen: true,
      });
    });
  }

  validateForm(title, content) {
    let isError = false;
    if (title.length < 3) {
      isError = true;
      this.setState({
        titleError: 'Tittle is too short',
      });
    } else {
      this.setState({
        titleError: '',
      });
    }

    if (content.length < 15) {
      isError = true;
      this.setState({
        contentError: 'Article is too short',
      });
    } else {
      this.setState({
        contentError: '',
      });
    }

    return isError;
  }

  snackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      isSnackBarOpen: false,
    });
  };

  clearState() {
    this.setState({
      title: '',
      content: '',
      tagInput: '',
      unit8ArrayFiles: [],
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

  deleteImage = index => () => {
    this.setState((state) => {
      const unit8ArrayFiles = [...state.unit8ArrayFiles];
      unit8ArrayFiles.splice(index, 1);
      return { unit8ArrayFiles };
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

  renderImages() {
    const { unit8ArrayFiles } = this.state;

    return unit8ArrayFiles.map(({ image, name }, index) => {
      const blob = new Blob([image], { type: 'image/jpeg' });
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob);
      const { chips } = this.props.classes;
      const labelName = name.length < 40 ? name : `${name.substring(0, 40)}...`;
      return (
        <Chip
          key={image[0] + new Date().getTime() + Math.random()}
          avatar={<Avatar src={imageUrl} />}
          label={labelName}
          className={chips}
          onDelete={this.deleteImage(index)}
        />
      );
    });
  }

  render() {
    const {
      actions,
      defaultFileInput,
      topInput,
      secondActions,
      actionButtons,
      chipsActions,
      chipsInput,
      contentInput,
    } = this.props.classes;

    const {
      title,
      content,
      tagInput,
      isSnackBarOpen,
      snackBarMessage,
      titleError,
      contentError,
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
            error={!!titleError}
            helperText={titleError}
          />
          <TextField
            label="Post content"
            fullWidth
            multiline
            margin="normal"
            rowsMax="15"
            onChange={this.onContentChange}
            value={content}
            error={!!contentError}
            helperText={contentError}
            className={contentInput}
          />

          <CardActions className={chipsActions}>
            {this.renderImages()}
          </CardActions>
          <input
            accept="image/*"
            id="raised-button-file"
            multiple
            type="file"
            className={defaultFileInput}
            onChange={this.onFileChange}
          />
          <label htmlFor="raised-button-file">
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

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isSnackBarOpen}
          autoHideDuration={3500}
          onClose={this.snackBarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snackBarMessage}</span>}
        />
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
    actionButtons: PropTypes.string.isRequired,
    chipsActions: PropTypes.string.isRequired,
    chips: PropTypes.string.isRequired,
    chipsInput: PropTypes.string.isRequired,
    contentInput: PropTypes.string.isRequired,
  }).isRequired,
  createNews: PropTypes.func.isRequired,
};

export default withStyles(styles)(CreateNews);
