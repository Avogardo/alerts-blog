import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardActions,
  Button,
  Input,
  Snackbar,
} from '@material-ui/core';
import styled, { css } from 'styled-components';
import './AddComment.css';

const AddCommentElement = styled(Card)`
  && {
    background-color: #ecf0f1;
    box-shadow: unset;

    ${props => !!props.ischildcomment ? css`
      padding: 50px 20px;
      margin-top: 80px;
    ` : css`
      padding: 25px 20px;
      width: 100%;
    `}
  }
`;
const AddCommentHeader = styled(CardHeader)`
  && {
    padding: 0;
    margin-bottom: ${props => !!props.ischildcomment ? 50 : 20}px;
  }
`;
const ActionsCard = styled(CardActions)`
  && {
    flex-direction: column;
    padding: 0;
  }
`;
const AddInput = styled(Input)`
  && {
    background-color: #ffffff;
    font-size: 13px;
    color: #777777;
    box-sizing: border-box;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 16px;
    padding: ${props => props.multiline ? '12px' : '6px 12px'};

    &:focus: {
      border: 1px solid #ced4da;
    }
  }

  div {
    min-height: 17px;
  }
`;
const PostCommentButton = styled(Button)`
  background-color: #f6214b;
`;

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
    this.onAuthorChange = this.onAuthorChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);

    this.state = {
      author: '',
      content: '',
      isSnackBarOpen: false,
      snackBarMessage: '',
      authorError: false,
      contentError: false,
    };
  }

  onAuthorChange({ target: { value } }) {
    this.setState({
      author: value,
    });
  }

  onContentChange({ target: { value } }) {
    this.setState({
      content: value,
    });
  }

  addComment() {
    const { author, content } = this.state;
    const {
      createComment,
      parentId,
      newsId,
      isChildComment,
      onExpand,
    } = this.props;

    if (this.validateForm(author, content)) {
      return;
    }

    createComment(
      author,
      content,
      newsId,
      parentId,
    ).then(() => {
      this.clearState();
      if (isChildComment) {
        onExpand();
      }
      this.setState({
        snackBarMessage: 'Comment has been created',
        isSnackBarOpen: true,
      });
    }).catch((error) => {
      this.setState({
        snackBarMessage: `Error: ${error.message}`,
        isSnackBarOpen: true,
      });
    });
  }

  clearState() {
    this.setState({
      author: '',
      content: '',
    });
  }

  validateForm(author, content) {
    const { isLoggedIn } = this.props;
    let isError = false;

    if (!isLoggedIn) {
      if (author.length < 3) {
        isError = true;
        this.setState({
          authorError: true,
        });
      } else {
        this.setState({
          authorError: false,
        });
      }
    }

    if (content.length < 3) {
      isError = true;
      this.setState({
        contentError: true,
      });
    } else {
      this.setState({
        contentError: false,
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

  render() {
    const { isLoggedIn, isChildComment } = this.props;
    const {
      author,
      content,
      isSnackBarOpen,
      snackBarMessage,
      authorError,
      contentError,
    } = this.state;

    return (
      <AddCommentElement
        ischildcomment={isChildComment ? 0 : 1}
      >
        <AddCommentHeader
          ischildcomment={isChildComment ? 0 : 1}
          title={<h4 className="add-comment-header">Post Comment</h4>}
        />

        <ActionsCard>
          {!isLoggedIn &&
            <AddInput
              placeholder="Enter Name"
              fullWidth
              inputProps={{
                'aria-label': 'Description',
              }}
              onChange={this.onAuthorChange}
              value={author}
              error={authorError}
              disableUnderline={!authorError}
            />
          }

          <AddInput
            placeholder="Message"
            fullWidth
            multiline
            inputProps={{
              'aria-label': 'Description',
            }}
            onChange={this.onContentChange}
            value={content}
            error={contentError}
            disableUnderline={!contentError}
          />

          <PostCommentButton
            onClick={this.addComment}
            variant="raised"
            color="secondary"
          >
            Post Comment
          </PostCommentButton>
        </ActionsCard>

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
      </AddCommentElement>
    );
  }
}

AddComment.defaultProps = {
  parentId: '',
  newsId: '',
  isChildComment: false,
  onExpand: () => {},
};

AddComment.propTypes = {
  parentId: PropTypes.string,
  newsId: PropTypes.string,
  onExpand: PropTypes.func,
  isChildComment: PropTypes.bool,
  createComment: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};


export default AddComment;
