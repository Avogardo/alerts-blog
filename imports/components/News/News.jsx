import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, withStyles, CardContent } from '@material-ui/core';

import SectionHeader from '../NewsContainer/SectionHeader';
import BasicNews from '../NewsContainer/BasicNews';
import './News.css';

const styles = {
  newsCard: {
    padding: 20,
    marginTop: 50,
  },
};

class News extends Component {
  render() {
    const { news, author, unit8ArrayToUrl } = this.props;
    const { newsCard } = this.props.classes;

    return [
      <div key="breaking-news" className="breaking-news-wrapper">
        <SectionHeader breakingNews headerTitle="Astronomy Binoculars A Great Alternative" />
      </div>,
      <article key="news-card">
        <Card className={newsCard}>
          <BasicNews
            topNews={news}
            authors={author}
            unit8ArrayToUrl={unit8ArrayToUrl}
          />
          <CardContent>
            {news[0].content}
          </CardContent>
        </Card>
      </article>,
    ];
  }
}

News.defaultProps = {
  news: [],
  author: [],
};

News.propTypes = {
  classes: PropTypes.shape({
    newsCard: PropTypes.string.isRequired,
  }).isRequired,
  author: PropTypes.arrayOf(PropTypes.string.isRequired),
  news: PropTypes.arrayOf(PropTypes.shape({
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
  unit8ArrayToUrl: PropTypes.func.isRequired,
};

export default withStyles(styles)(News);
