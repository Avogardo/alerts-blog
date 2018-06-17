import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewsContainer.css';

class NewsContainer extends Component {
  render() {
    const { newsArray } = this.props;
    return (
      <section>
        <h2>content {newsArray[0]}</h2>
      </section>
    );
  }
}

NewsContainer.propTypes = {
  newsArray: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default NewsContainer;
