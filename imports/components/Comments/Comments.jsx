import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class Comments extends Component {
  renderComments() {
    const { comments } = this.props;
    if (comments) {
      return comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
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
};

export default Comments;
