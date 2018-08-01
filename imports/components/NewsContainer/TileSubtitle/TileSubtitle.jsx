import React from 'react';
import PropTypes from 'prop-types';
import {
  AccountOutlineIcon,
  CalendarMultipleCheckIcon,
  MessageOutlineIcon,
} from 'mdi-react';
import { formatDate } from '../../../../src/appHelper';
import './TileSubtitle.css';


const TileSubtitle = ({
  authors,
  index,
  createdAt,
  isAside,
}) => (
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
      <MessageOutlineIcon className="user-icon" size={17} /> 06 {!isAside ? 'Comments' : ''}
    </span>
  </span>
);

TileSubtitle.defaultProps = {
  authors: [],
  isAside: false,
};

TileSubtitle.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.string.isRequired),
  index: PropTypes.number.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  isAside: PropTypes.bool,
};

export default TileSubtitle;
