import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import SectionHeader from '../NewsContainer/SectionHeader';
import './News.css';

const News = props => [
  <div className="breaking-news-wrapper">
    <SectionHeader breakingNews headerTitle="Astronomy Binoculars A Great Alternative" />
  </div>,
  <p>
    News id: {props.match.params.id}
  </p>,
];

News.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default News;
