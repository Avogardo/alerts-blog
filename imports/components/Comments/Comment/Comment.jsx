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
import './Comment.css';

const styles = {
  commentCard: {
    backgroundColor: 'transparent',
    boxShadow: 'unset',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  commentCommentCard: {
    backgroundColor: 'transparent',
    boxShadow: 'unset',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 30,
    marginLeft: 25,
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
  addCommentExpansionPanel: {
    boxShadow: 'unset',
    marginTop: 0,
    '&:before': {
      backgroundColor: 'unset',
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

    if (!this.state.isReplyExpanded) {
      const { comment } = this.props;
      const expansionPanel = document.getElementById(`comment${comment._id}`);
      const rect = expansionPanel.getBoundingClientRect();
      const isVisible = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );

      if (!isVisible) {
        expansionPanel.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  render() {
    const { comment, isAdmin } = this.props;
    const { isReplyExpanded } = this.state;
    const {
      commentCard,
      commentCardHeader,
      commentContentCard,
      replyButton,
      commentCommentCard,
      addCommentExpansionPanel,
    } = this.props.classes;

    return (
      <Fragment>
        <Card className={comment.parentId ? commentCommentCard : commentCard}>
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
          <div className="comment-buttons-wrapper">
            {!comment.parentId &&
              <Button onClick={this.onExpand} className={replyButton} variant="raised">
                Reply
              </Button>
            }
            {isAdmin &&
              <Button color="secondary" variant="raised">
                Remove
              </Button>
            }
          </div>
        </Card>
        {!comment.parentId &&
          <Fragment>
            <Comments isChildComment newsId={comment.newsId} parentId={comment._id} />

            <ExpansionPanel id={`comment${comment._id}`} className={addCommentExpansionPanel} expanded={isReplyExpanded}>
              <ExpansionPanelDetails>
                <AddComment
                  isChildComment
                  newsId={comment.newsId}
                  parentId={comment._id}
                  onExpand={this.onExpand}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Fragment>
        }
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
    commentCommentCard: PropTypes.string.isRequired,
    addCommentExpansionPanel: PropTypes.string.isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  removeComment: PropTypes.func.isRequired,
};

export default withStyles(styles)(Comment);
