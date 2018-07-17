import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EnterNewsGrid from './EnterNewsGrid';
import BasicNewsGrid from './BasicNewsGrid';

class NewsContainer extends Component {
  render() {
    const {
      enterContainer,
      topNews,
      authors,
    } = this.props;

    return (
      enterContainer ?
        <EnterNewsGrid
          topNews={topNews}
          authors={authors}
        />
        :
        <BasicNewsGrid
          topNews={topNews}
          authors={authors}
        />
    );
  }
}

NewsContainer.defaultProps = {
  enterContainer: false,
  topNews: [],
  authors: [],
};

NewsContainer.propTypes = {
  enterContainer: PropTypes.bool,
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
  authors: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default NewsContainer;
