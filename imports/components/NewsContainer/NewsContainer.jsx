import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewsContainer.css';

class NewsContainer extends Component {
  render() {
    const { topNews } = this.props;

    return (
      <section>
        <h2>{topNews.length ? topNews[0].title : ''}</h2>
      </section>
    );
  }
}

NewsContainer.defaultProps = {
  topNews: [],
};

NewsContainer.propTypes = {
  topNews: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    enterImage: PropTypes.shape({
      data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.instanceOf(Uint8Array).isRequired,
      }),
    }).isRequired,
  }).isRequired),
};

export default NewsContainer;
