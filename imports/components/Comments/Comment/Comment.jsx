import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardHeader,
  CardContent,
  withStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
} from '@material-ui/core';
import { AccountIcon } from 'mdi-react';
import { formatDate } from '../../../../src/appHelper';
import AddComment from '../AddComment';
import Comments from '../../Comments';

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

class Comment extends Component {
  constructor(props) {
    super(props);
    this.onExpand = this.onExpand.bind(this);

    this.state = {
      isReplyExpanded: false,
    };
  }

  onExpand() {
    this.setState({
      isReplyExpanded: !this.state.isReplyExpanded,
    });
  }

  render() {
    const { comment } = this.props;
    const { isReplyExpanded } = this.state;
    const {
      commentCard,
      commentCardHeader,
      commentContentCard,
      replyButton,
    } = this.props.classes;

    return (
      <Fragment>
        <Card className={commentCard}>
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
              subheader={<span className="comment-subtitle">{formatDate(comment.createdAt)}</span>}
            />
            <CardContent className={commentContentCard}>
              {comment.content}
            </CardContent>
          </div>
          <Button onClick={this.onExpand} className={replyButton} variant="raised">
            Reply
          </Button>
        </Card>

        <Comments newsId={comment.newsId} parentId={comment._id} />

        <ExpansionPanel expanded={isReplyExpanded}>
          <ExpansionPanelDetails>
            <AddComment newsId={comment.newsId} parentId={comment._id} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Fragment>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    newsId: PropTypes.string.isRequired,
  }).isRequired,
  classes: PropTypes.shape({
    commentCard: PropTypes.string.isRequired,
    commentCardHeader: PropTypes.string.isRequired,
    commentContentCard: PropTypes.string.isRequired,
    replyButton: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Comment);