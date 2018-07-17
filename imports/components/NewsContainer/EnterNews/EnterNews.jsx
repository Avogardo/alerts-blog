import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  withStyles,
  Card,
} from '@material-ui/core';
import {
  AccountOutlineIcon,
  CalendarMultipleCheckIcon,
  MessageOutlineIcon,
} from 'mdi-react';
import './EnterNews.css';

const formatDate = (date) => {
  const monthNamesEng = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNamesEng[monthIndex]}, ${year}`;
};

const styles = {
  gridListTileBar: {
    background: 'unset',
  },
  breakingNews: {
    padding: '12px 15px',
    marginTop: 4,
    fontSize: 14,
  },
};

class EnterNews extends Component {
  render() {
    const { topNews, authors, unit8ArrayToUrl } = this.props;
    const { gridListTileBar, breakingNews } = this.props.classes;

    return (
      <Fragment>
        {topNews.length ?
          <GridList cellHeight={250} cols={1}>
            {topNews.map((news, index) => (
              <GridListTile className="enter-news-tile" key={news._id}>
                <div>
                  <img
                    className="enter-news-image"
                    src={unit8ArrayToUrl(news.enterImage.data.image)}
                    alt={news.enterImage.data.name}
                  />
                </div>
                <GridListTileBar
                  className={gridListTileBar}
                  title={news.title}
                  subtitle={
                    <span className="main-subtitle-tile">
                      {authors.length ?
                        <Fragment>
                          <AccountOutlineIcon className="user-icon" size={17} /> {authors[index]}
                        </Fragment>
                        :
                        ''
                      }
                      <CalendarMultipleCheckIcon
                        className="middle-icon"
                        size={17}
                      /> {formatDate(news.createdAt)}
                      <MessageOutlineIcon className="middle-icon" size={17} /> 06 Comments
                    </span>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
          :
          ''
        }

        <Card className={breakingNews}>
          <strong className="breaking-news-strong">Breaking News: </strong>
          Astronomy Binoculars A Great Alternative
        </Card>
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
    breakingNews: PropTypes.string.isRequired,
  }).isRequired,
  unit8ArrayToUrl: PropTypes.func.isRequired,
};

export default withStyles(styles)(EnterNews);
