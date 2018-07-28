import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  withStyles,
} from '@material-ui/core';
import TileSubtitle from '../TileSubtitle';
import { HistoryContext } from '../../MainLayout';
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

    return (
      <Fragment>
        {topNews.length ?
          <GridList cellHeight={250} cols={1}>
            {topNews.map((news, index) => (
              <GridListTile className="enter-news-tile" key={news._id}>
                <div
                  className="enter-news-image"
                  style={{ backgroundImage: `url(${unit8ArrayToUrl(news.enterImage.data.image)})` }}
                />
                <HistoryContext.Consumer>
                  {history => (
                    <GridListTileBar
                      onClick={() => goToNews(history, news._id)}
                      className={gridListTileBar}
                      title={news.title}
                      subtitle={
                        <TileSubtitle authors={authors} createdAt={news.createdAt} index={index} />
                      }
                    />
                  )}
                </HistoryContext.Consumer>
              </GridListTile>
            ))}
          </GridList>
          :
          ''
        }
      </Fragment>
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
