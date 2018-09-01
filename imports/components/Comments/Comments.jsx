import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Snackbar } from '@material-ui/core';
import Comment from './Comment';
import { formatCommentAmount } from '../../../src/appHelper';

const AddCommentElement = styled.h6`
  padding-top: 20px;
  padding-bottom: 20px;
`;

class Comments extends Component {
  constructor(props) {
    super(props);
    this.onCommentDelete = this.onCommentDelete.bind(this);

    this.state = {
      snackBarMessage: '',
      isSnackBarOpen: false,
    };
  }

  onCommentDelete(commentId) {
    const { removeComment } = this.props;

    removeComment(commentId).then(() => {
      this.setState({
        snackBarMessage: 'Comment has been removed',
        isSnackBarOpen: true,
      });
    }).catch((error) => {
      this.setState({
        snackBarMessage: `Error: ${error.message}`,
        isSnackBarOpen: true,
      });
    });
  }

  snackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      isSnackBarOpen: false,
    });
  };

  renderComments() {
    const { comments } = this.props;
    if (comments) {
      return comments.map(comment => (
        <Comment onCommentDelete={this.onCommentDelete} key={comment._id} comment={comment} />
      ));
    }

    return '';
  }

  render() {
    const { isChildComment, commentAmount } = this.props;
    const { snackBarMessage, isSnackBarOpen } = this.state;

    return (
      <Fragment>
        {!isChildComment &&
          <AddCommentElement>{formatCommentAmount(commentAmount)} Comments</AddCommentElement>
        }
        <div>{this.renderComments()}</div>

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
      </Fragment>
    );
  }
}

Comments.defaultProps = {
  comments: [],
  isChildComment: false,
  commentAmount: 0,
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    newsId: PropTypes.string.isRequired,
  })),
  removeComment: PropTypes.func.isRequired,
  isChildComment: PropTypes.bool,
  commentAmount: PropTypes.number,
};

export default Comments;
