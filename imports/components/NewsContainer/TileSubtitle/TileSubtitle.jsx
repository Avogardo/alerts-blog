import React from 'react';
import PropTypes from 'prop-types';
import {
  AccountOutlineIcon,
  CalendarMultipleCheckIcon,
  MessageOutlineIcon,
} from 'mdi-react';
import './TileSubtitle.css';

const formatDate = (date) => {
  const monthNamesEng = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNamesEng[monthIndex]}, ${year}`;
};

const TileSubtitle = ({ authors, index, createdAt }) => (
  <span className="subtitle-tile">
    {authors.length ?
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
      <MessageOutlineIcon className="user-icon" size={17} /> 06 Comments
    </span>
  </span>
);

TileSubtitle.defaultProps = {
  authors: [],
};

TileSubtitle.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.string.isRequired),
  index: PropTypes.number.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
};

export default TileSubtitle;
