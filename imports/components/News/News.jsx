import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

const News = props => (
  <p>
    News id: {props.match.params.id}
  </p>
);

News.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default News;
