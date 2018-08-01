import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardHeader,
  CardContent,
  withStyles,
} from '@material-ui/core';
import { AccountIcon } from 'mdi-react';

const styles = {
  commentCard: {
    backgroundColor: 'transparent',
    boxShadow: 'unset',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  commentCardHeader: {
    paddingTop: 0,
  },
  commentContentCard: {
    paddingTop: 0,
    paddingBottom: 16,
    fontSize: 14,
    color: '#777777',
    lineHeight: '23px',
  },
  replyButton: {
    backgroundColor: '#222222',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#333333',
    },
  },
};

class Comments extends Component {
  renderComments() {
    const { comments } = this.props;
    if (comments) {
      const {
        commentCard,
        commentCardHeader,
        commentContentCard,
        replyButton,
      } = this.props.classes;

      return comments.map(comment => (
        <Card className={commentCard} key={comment._id}>
          {comment.author.avatar ?
            <img
              className="comment-avatar"
              src={comment.author.avatar}
              alt={comment.author.name}
            />
            :
            <AccountIcon size={60} />
          }
          <div className="comment-content-wrapper">
            <CardHeader
              className={commentCardHeader}
              title={<span className="comment-header">{comment.author.name}</span>}
              subheader={<span className="comment-subtitle">{comment.createdAt.toISOString()}</span>}
            />
            <CardContent className={commentContentCard}>
              {comment.content}
            </CardContent>
          </div>
          <Button className={replyButton} variant="raised">
            Reply
          </Button>
        </Card>
      ));
    }

    return '';
  }

  render() {
    const { comments } = this.props;

    return [
      <h6 className="comments-section-header" key="comments-section-header">{comments.length} Comments</h6>,
      <div key="comments-section-body">{this.renderComments()}</div>,
    ];
  }
}

Comments.defaultProps = {
  comments: [],
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
  classes: PropTypes.shape({
    commentCard: PropTypes.string.isRequired,
    commentCardHeader: PropTypes.string.isRequired,
    commentContentCard: PropTypes.string.isRequired,
    replyButton: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Comments);
