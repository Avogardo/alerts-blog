import React from 'react';
import PropTypes from 'prop-types';
import EnterNewsGrid from './EnterNewsGrid';
import BasicNewsGrid from './BasicNewsGrid';

const NewsContainer = ({ enterContainer }) => (
  enterContainer ? <EnterNewsGrid /> : <BasicNewsGrid />
);

NewsContainer.defaultProps = {
  enterContainer: false,
};

NewsContainer.propTypes = {
  enterContainer: PropTypes.bool,
};

export default NewsContainer;
