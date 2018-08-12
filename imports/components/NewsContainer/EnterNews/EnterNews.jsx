import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { GridListTile, GridListTileBar, withStyles } from '@material-ui/core';
import TileSubtitle from '../TileSubtitle';
import { HistoryContext } from '../../Context';
import './EnterNews.css';

const styles = {
  gridListTileBar: {
    background: 'unset',
  },
};

class EnterNews extends Component {
  render() {
    const {
      topNews,
      authors,
      unit8ArrayToUrl,
      goToNews,
    } = this.props;
    const { gridListTileBar } = this.props.classes;
    const welcomeNews = topNews[0];
    const newsList = topNews.slice(1);

    const enterNews = (news, index) => (
      <GridListTile className="enter-news-tile" key={news._id}>
        <div
          className="enter-news-image"
          style={{ backgroundImage: `url(${unit8ArrayToUrl(news.enterImage.data.image)})` }}
        />
        <HistoryContext.Consumer>
          {history => (
            <GridListTileBar
              onClick={() => goToNews(history, news._id)}
              className={[gridListTileBar, 'enter-news-title-bar'].join(' ')}
              title={<span className="enter-news-title">{news.title}</span>}
              subtitle={
                <TileSubtitle
                  newsId={news._id}
                  authors={authors}
                  createdAt={news.createdAt}
                  index={index}
                />
              }
            />
          )}
        </HistoryContext.Consumer>
      </GridListTile>
    );

    return (
      <div className="enter-news-wrapper">
        {topNews.length ?
          <Fragment>
            {enterNews(welcomeNews, 0)}
            <div className="enter-side-news-wrapper">
              {newsList.map((news, index) => (
                enterNews(news, index + 1)
              ))}
            </div>
          </Fragment>
        :
          [1, 2, 3].map(news => (
            <GridListTile
              className="enter-news-tile"
              key={news + new Date().getTime() + Math.random()}
            >
              <div className="enter-news-image-loading" />
              <GridListTileBar
                className={[gridListTileBar, 'enter-news-title-bar'].join(' ')}
                title={<span className="enter-news-title">Loading</span>}
                subtitle="Wait..."
              />
            </GridListTile>
          ))
        }
      </div>
    );
  }
}

EnterNews.defaultProps = {
  topNews: [],
  authors: [],
};

EnterNews.propTypes = {
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
  classes: PropTypes.shape({
    gridListTileBar: PropTypes.string.isRequired,
  }).isRequired,
  goToNews: PropTypes.func.isRequired,
  unit8ArrayToUrl: PropTypes.func.isRequired,
};

export default withStyles(styles)(EnterNews);
