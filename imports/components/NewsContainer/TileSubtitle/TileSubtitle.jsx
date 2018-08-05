import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AccountOutlineIcon,
  CalendarMultipleCheckIcon,
  MessageOutlineIcon,
} from 'mdi-react';
import { formatDate, formatCommentAmount } from '../../../../src/appHelper';
import './TileSubtitle.css';

class TileSubtitle extends Component {
  render() {
    const {
      authors,
      index,
      createdAt,
      isAside,
      commentsAmount,
    } = this.props;
    return (
      <span className={`subtitle-tile${isAside ? ' aside-margin' : ''}`}>
        {authors.length && !isAside ?
          <span className="tile-subtitle-item">
            <AccountOutlineIcon className="user-icon" size={17} /> {authors[index]}
          </span>
          :
          ''
        }
        <span className="tile-subtitle-item">
          <CalendarMultipleCheckIcon
            className="user-icon"
            size={17}
          /> {formatDate(createdAt)}
        </span>
        <span className="tile-subtitle-item">
          <MessageOutlineIcon className="user-icon" size={17} />
          {formatCommentAmount(commentsAmount)} {!isAside ? 'Comments' : ''}
        </span>
      </span>
    );
  }
}

TileSubtitle.defaultProps = {
  authors: [],
  isAside: false,
  commentsAmount: 0,
};

TileSubtitle.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.string.isRequired),
  index: PropTypes.number.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  isAside: PropTypes.bool,
  commentsAmount: PropTypes.number,
};

export default TileSubtitle;
