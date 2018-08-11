import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  CardHeader,
  withStyles,
  Card,
} from '@material-ui/core';
import TileSubtitle from '../TileSubtitle';
import { HistoryContext } from '../../Context';
import './ExitNews.css';

const styles = {
  asideNewsCard: {
    backgroundColor: 'transparent',
    boxShadow: 'unset',
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid #eeeeee',
  },
  asideNewsHeaderCard: {
    flex: 1,
    paddingRight: 0,
  },
};

class ExitNews extends Component {
  render() {
    const { topNews, unit8ArrayToUrl, goToNews } = this.props;
    const { asideNewsCard, asideNewsHeaderCard } = this.props.classes;

    return (
      topNews.length ?
        topNews.map((news, index) => (
          <Card key={`bottom${news._id}`} className={asideNewsCard}>
            <div
              className="aside-news-image"
              style={{ backgroundImage: `url(${unit8ArrayToUrl(news.enterImage.data.image)})` }}
            />
            <HistoryContext.Consumer>
              {history => (
                <CardHeader
                  onClick={() => goToNews(history, news._id)}
                  className={asideNewsHeaderCard}
                  title={<h6>{news.title}</h6>}
                  subheader={
                    <TileSubtitle
                      newsId={news._id}
                      isAside
                      createdAt={news.createdAt}
                      index={index}
                    />
                  }
                />
              )}
            </HistoryContext.Consumer>
          </Card>
        ))
        :
        [1, 2, 3, 4].map(news => (
          <Card key={news} className={asideNewsCard}>
            <div className="aside-news-image-loading" />
            <CardHeader
              className={asideNewsHeaderCard}
              title="Loading"
              subheader="Wait..."
            />
          </Card>
        ))
    );
  }
}

ExitNews.defaultProps = {
  topNews: [],
};

ExitNews.propTypes = {
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
  classes: PropTypes.shape({
    asideNewsCard: PropTypes.string.isRequired,
    asideNewsHeaderCard: PropTypes.string.isRequired,
  }).isRequired,
  unit8ArrayToUrl: PropTypes.func.isRequired,
  goToNews: PropTypes.func.isRequired,
};

export default withStyles(styles)(ExitNews);
