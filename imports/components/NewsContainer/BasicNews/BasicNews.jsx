import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  GridListTile,
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import TileSubtitle from '../TileSubtitle';
import './BasicNews.css';

const styles = {
  tileCard: {
    boxShadow: 'unset',
  },
  newsCardHeader: {
    padding: 0,
    marginTop: 10,
  },
  newsCardContent: {
    paddingTop: 16,
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 16,
  },
};

class BasicNews extends Component {
  render() {
    const { topNews, authors, unit8ArrayToUrl } = this.props;
    const { newsCardHeader, newsCardContent, tileCard } = this.props.classes;

    return (
      topNews.length ?
        topNews.map((news, index) => (
          <Card className={tileCard} key={news._id}>
            <GridList cellHeight={250} cols={1}>
              <GridListTile className="enter-news-tile" key={news._id}>
                <div>
                  <img
                    className="enter-news-image"
                    src={unit8ArrayToUrl(news.enterImage.data.image)}
                    alt={news.enterImage.data.name}
                  />
                </div>
              </GridListTile>
            </GridList>
            <CardHeader
              className={newsCardHeader}
              title={<h4 className="news-card-title">{news.title}</h4>}
              subheader={
                <TileSubtitle authors={authors} createdAt={news.createdAt} index={index} />
              }
            />
            <CardContent className={newsCardContent}>
              <Typography component="p">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
                , sed do eiusmod tempor incididunt.
              </Typography>
            </CardContent>
          </Card>
        ))
        :
        ''
    );
  }
}

BasicNews.defaultProps = {
  topNews: [],
  authors: [],
};

BasicNews.propTypes = {
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
    newsCardHeader: PropTypes.string.isRequired,
    newsCardContent: PropTypes.string.isRequired,
    tileCard: PropTypes.string.isRequired,
  }).isRequired,
  unit8ArrayToUrl: PropTypes.func.isRequired,
};

export default withStyles(styles)(BasicNews);
