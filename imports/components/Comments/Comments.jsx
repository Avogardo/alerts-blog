import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';

class Comments extends Component {
  renderComments() {
    const { comments } = this.props;
    if (comments) {
      return comments.map(comment => (
        <Card key={comment._id}>
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
          />
          <CardHeader
            title={comment.author.name}
            subheader={comment.createdAt.toISOString()}
          />
          <CardContent>
            {comment.content}
          </CardContent>
        </Card>
      ));
    }

    return '';
  }

  render() {
    const { comments } = this.props;

    return [
      <h6 key="comments-section-header">{comments.length} Comments</h6>,
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
};

export default Comments;
