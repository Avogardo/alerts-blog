import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const formatCommentAmount = amount => (amount < 10 ? `0${amount}` : amount);

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
    const { isChildComment, commentAmount } = this.props;

    return (
      <Fragment>
        {!isChildComment &&
          <h6 className="comments-section-header">{formatCommentAmount(commentAmount)} Comments</h6>
        }
        <div>{this.renderComments()}</div>
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
  isChildComment: PropTypes.bool,
  commentAmount: PropTypes.number,
};

export default Comments;
