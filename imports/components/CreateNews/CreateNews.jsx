import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import RichTextEditor from 'react-rte';
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
import './CreateNews.css';

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
    this.onFileChange = this.onFileChange.bind(this);
    this.onTagKeyPress = this.onTagKeyPress.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.clearState = this.clearState.bind(this);

    this.state = {
      title: '',
      value: RichTextEditor.createEmptyValue(),
      content: '',
      tagInput: '',
      unit8ArrayFiles: [],
      tags: [],
      isSnackBarOpen: false,
      snackBarMessage: '',
      titleError: '',
      contentError: '',
      wasDataLoaded: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (Object.keys(props.news).length && !state.wasDataLoaded) {
      const {
        title,
        authorId,
        content,
        tags,
        images,
      } = props.news;

      return {
        title,
        authorId,
        content,
        tags,
        unit8ArrayFiles: images.data,
        wasDataLoaded: true,
      };
    }

    return null;
  }

  onTitleChange({ target: { value } }) {
    this.setState({
      title: value,
    });
  }

  onChange = (value) => {
    this.setState({
      value,
      content: value.toString('html'),
    });
  };

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
    const {
      createNews,
      updateNews,
      news,
      goToNews,
      history,
    } = this.props;
    const isNews = Object.keys(news).length;
    const {
      title,
      content,
      unit8ArrayFiles,
      tags,
    } = this.state;

    if (this.validateForm(title, content)) {
      return;
    }

    if (isNews) {
      updateNews(
        news._id,
        title,
        content,
        { data: unit8ArrayFiles },
        tags,
      ).then(() => {
        this.setState({
          snackBarMessage: 'News has been edited',
          isSnackBarOpen: true,
        });
        goToNews(history, news._id);
      }).catch((error) => {
        this.setState({
          snackBarMessage: `Error: ${error.message}`,
          isSnackBarOpen: true,
        });
      });
    } else {
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
          snackBarMessage: `Error: ${error.message}`,
          isSnackBarOpen: true,
        });
      });
    }
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
      value: RichTextEditor.createEmptyValue(),
      content: '',
      tagInput: '',
      unit8ArrayFiles: [],
      tags: [],
    });
  }

  deleteTag = index => () => {
    this.setState((state) => {
      const tags = [...state.tags];
      tags.splice(index, 1);
      return { tags };
    });
  };

  deleteChip = index => () => {
    this.setState((state) => {
      const unit8ArrayFiles = [...state.unit8ArrayFiles];
      unit8ArrayFiles.splice(index, 1);
      return { unit8ArrayFiles };
    });
  };

  renderTags() {
    const { tags } = this.state;
    const { chips } = this.props.classes;
    return tags.map((tag, index) => (
      <Chip
        key={tag + new Date().getTime() + Math.random()}
        label={tag}
        onDelete={this.deleteTag(index)}
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
      const labelName = name.length < 30 ? name : `${name.substring(0, 30)}...`;
      return (
        <Chip
          key={image[0] + new Date().getTime() + Math.random()}
          avatar={<Avatar src={imageUrl} />}
          label={labelName}
          className={chips}
          onDelete={this.deleteChip(index)}
        />
      );
    });
  }

  render() {
    const { news } = this.props;
    const isNews = Object.keys(news).length;
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
      value,
      tagInput,
      isSnackBarOpen,
      snackBarMessage,
      titleError,
      contentError,
      wasDataLoaded,
    } = this.state;

    return (
      <form>
        <CardHeader title={isNews && wasDataLoaded ? 'Edit News' : 'Create news'} />
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

          <RichTextEditor
            value={value}
            editorClassName="create-news-editor-field"
            onChange={this.onChange}
            placeholder="Post content"
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

CreateNews.defaultProps = {
  news: {},
};

CreateNews.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
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
  updateNews: PropTypes.func.isRequired,
  goToNews: PropTypes.func.isRequired,
  news: PropTypes.shape({
    _id: PropTypes.string,
    authorId: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    tags: PropTypes.arrayOf(PropTypes.string),
    enterImage: PropTypes.shape({
      data: PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.instanceOf(Uint8Array),
      }),
    }),
    images: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.instanceOf(Uint8Array),
        name: PropTypes.string.isRequired,
      })).isRequired,
    }),
  }),
};

export default withStyles(styles)(CreateNews);
