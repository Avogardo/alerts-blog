import React from 'react';
import PropTypes from 'prop-types';
import './NewsContainer.css';

const NewsContainer = props => (
  <section>
    <h2>content {props.newsArray[0]}</h2>
  </section>
);

NewsContainer.propTypes = {
  newsArray: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default NewsContainer;
