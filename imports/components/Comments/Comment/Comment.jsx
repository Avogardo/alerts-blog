import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardHeader,
  CardContent,
  CardActions,
  withStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
} from '@material-ui/core';
import { AccountIcon } from 'mdi-react';
import styled, { css } from 'styled-components';
import { formatDate } from '../../../../src/appHelper';
import AddComment from '../AddComment';
import Comments from '../../Comments';

const CommentCard = styled(Card)`
  && {
    background-color: transparent;
    box-shadow: unset;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 30px;

    ${props => !!props.childcommentcard && css`
      margin-left: 25px;
    `}
  }
`;
const CommentCardHeader = styled(CardHeader)`
  && {
    padding-top: 0;
  }
`;
const CommentContentCard = styled(CardContent)`
  && {
    padding-top: 0;
    padding-bottom: 16px;
    font-size: 14px;
    color: #777777;
    line-height: 23px;
  }
`;

const styles = {
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
  commentCardActions: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
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
    const { comment, isAdmin, onCommentDelete } = this.props;
    const { isReplyExpanded } = this.state;
    const { replyButton, addCommentExpansionPanel, commentCardActions } = this.props.classes;

    return (
      <Fragment>
        <CommentCard childcommentcard={comment.parentId ? 1 : 0}>
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
            <CommentCardHeader
              title={<span className="comment-header">{comment.author.name}</span>}
              subheader={<span className="comment-subtitle">{formatDate(comment.createdAt)}</span>}
            />
            <CommentContentCard>
              {comment.content}
            </CommentContentCard>
          </div>
          <CardActions className={commentCardActions}>
            {!comment.parentId &&
              <Button onClick={this.onExpand} className={replyButton} variant="raised">
                Reply
              </Button>
            }
            {isAdmin &&
              <Button onClick={() => onCommentDelete(comment._id)} color="secondary" variant="raised">
                Remove
              </Button>
            }
          </CardActions>
        </CommentCard>
        {!comment.parentId &&
          <Fragment>
            <Comments isChildComment newsId={comment.newsId} parentId={comment._id} />

            <ExpansionPanel
              id={`comment${comment._id}`}
              className={addCommentExpansionPanel}
              expanded={isReplyExpanded}
            >
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
    replyButton: PropTypes.string.isRequired,
    addCommentExpansionPanel: PropTypes.string.isRequired,
    commentCardActions: PropTypes.string.isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(Comment);
