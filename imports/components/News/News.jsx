import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import SectionHeader from '../NewsContainer/SectionHeader';
import './News.css';

class News extends Component {
  render() {
    const { match } = this.props;

    return [
      <div key="breaking-news" className="breaking-news-wrapper">
        <SectionHeader breakingNews headerTitle="Astronomy Binoculars A Great Alternative" />
      </div>,
      <p key="news-id">
        News id: {match.params.id}
      </p>,
    ];
  }
}

News.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default News;
