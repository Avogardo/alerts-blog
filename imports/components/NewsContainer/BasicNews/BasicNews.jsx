import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  GridList,
  GridListTile,
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import ImageGallery from 'react-image-gallery';
import '/node_modules/react-image-gallery/styles/css/image-gallery.css';
import TileSubtitle from '../TileSubtitle';
import { HistoryContext } from '../../Context';
import { sizes } from '../../../../src/appHelper';
import './BasicNews.css';


const TileCard = styled(Card)`
  && {
    box-shadow: unset;

    ${props => !!props.basicnewslist && css`
      display: flex;
      margin-bottom: 20px;
      align-items: center;

      &:last-child {
        margin-bottom: 0;
      }

      .basic-news-image {
        height: 190px;
        width: 280px;
      }

      .basic-news-image-loading {
        height: 190px;
        width: 280px;
      }

      .basic-news-tile-wrapper {
        flex: 1;
        padding-left: 30px;
      }

      .basic-news-tile {
        height: unset;
      }

      .basic-grid-list {
        height: 190px;
        overflow: hidden;
      }

      @media (max-width: ${sizes.desktop}px) {
        display: block;
        margin-bottom: unset;
        align-items: center;

        .basic-news-image {
          width: unset;
          height: 250px;
        }

        .basic-news-image-loading {
          width: unset;
          height: 250px;
        }

        .basic-news-tile-wrapper {
          flex: 1;
          padding-left: 0;
        }

        .basic-news-tile {
          height: 254px;
        }

        .basic-grid-list {
          height: unset;
          overflow: unset;
        }
      }
    `}
  }
`;
const NewsCardHeader = styled(CardHeader)`
  && {
    padding: 0;
    margin-top: 10px;
    cursor: pointer;
  }
`;

const styles = {
  newsCardContent: {
    paddingTop: 16,
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 16,
  },
};

class BasicNews extends Component {
  render() {
    const {
      topNews,
      authors,
      unit8ArrayToUrl,
      newsCard,
      goToNews,
      exitNews,
      basicNewsList,
    } = this.props;
    const { newsCardContent } = this.props.classes;

    return (
      topNews.length ?
        topNews.map((news, index) => (
          <TileCard
            basicnewslist={basicNewsList ? 1 : 0}
            key={news._id}
          >
            <GridList className="basic-grid-list" cellHeight={250} cols={1}>
              <GridListTile className="basic-news-tile" key={news._id}>
                {newsCard && topNews[0].images ? [
                  <div key="image-gallery-mobile" className="image-gallery-mobile">
                    <ImageGallery
                      showBullets
                      showIndex
                      showThumbnails={false}
                      showPlayButton={false}
                      items={topNews[0].imagesFroSlider}
                    />
                  </div>,
                  <div key="image-gallery-desktop" className="image-gallery-desktop">
                    <ImageGallery
                      showBullets
                      showIndex
                      showPlayButton={false}
                      items={topNews[0].imagesFroSlider}
                    />
                  </div>,
                ] :
                <div
                  className={newsCard ? 'basic-news-image-no-animation' : 'basic-news-image'}
                  style={{ backgroundImage: `url(${unit8ArrayToUrl(news.enterImage.data.image)})` }}
                />
                }
              </GridListTile>
            </GridList>
            <div className="basic-news-tile-wrapper">
              <HistoryContext.Consumer>
                {history => (
                  <NewsCardHeader
                    onClick={() => goToNews(history, news._id)}
                    title={
                      <h4 className={newsCard ? 'news-page-title' : 'news-card-title'}>{news.title}</h4>
                    }
                    subheader={
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
              {!newsCard &&
                <CardContent className={newsCardContent}>
                  <Typography component="p">
                    {news.content.length > 92 ?
                      `${news.content.substring(0, 92).replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, '')}...`
                      :
                      news.content
                    }
                  </Typography>
                </CardContent>
              }
            </div>
          </TileCard>
        ))
        :
        (exitNews || newsCard ? [1] : [1, 2, 3, 4]).map(news => (
          <TileCard
            basicnewslist={basicNewsList ? 1 : 0}
            key={news}
          >
            <GridList className="basic-grid-list" cellHeight={250} cols={1}>
              <GridListTile className="basic-news-tile">
                <div className="basic-news-image-loading" />
              </GridListTile>
            </GridList>
            <div className="basic-news-tile-wrapper">
              <NewsCardHeader title="Loading" subheader="Wait..." />
              {!newsCard &&
              <CardContent className={newsCardContent}>
                <div className="basic-text-loading-placeholder" />
                <div className="basic-text-loading-placeholder" />
                <div className="basic-text-loading-placeholder" />
              </CardContent>
              }
            </div>
          </TileCard>
        ))
    );
  }
}

BasicNews.defaultProps = {
  newsCard: false,
  exitNews: false,
  basicNewsList: false,
  topNews: [],
  authors: [],
  goToNews: () => {},
};

BasicNews.propTypes = {
  newsCard: PropTypes.bool,
  exitNews: PropTypes.bool,
  basicNewsList: PropTypes.bool,
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
    imagesFroSlider: PropTypes.arrayOf(PropTypes.shape({
      original: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
    })),
  })),
  authors: PropTypes.arrayOf(PropTypes.string.isRequired),
  classes: PropTypes.shape({
    newsCardContent: PropTypes.string.isRequired,
  }).isRequired,
  unit8ArrayToUrl: PropTypes.func.isRequired,
  goToNews: PropTypes.func,
};

export default withStyles(styles)(BasicNews);
