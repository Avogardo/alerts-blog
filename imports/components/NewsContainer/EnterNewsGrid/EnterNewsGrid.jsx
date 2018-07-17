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
import './EnterNewsGrid.css';

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

class EnterNewsGrid extends Component {
  static renderImage(news) {
    const blob = new Blob([news.enterImage.data.image], { type: 'image/jpeg' });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    return (
      <div>
        <img className="enter-news-image" src={imageUrl} alt={news.enterImage.data.name} />
      </div>
    );
  }

  render() {
    const { topNews, authors } = this.props;
    const {
      gridListTileBar,
      breakingNews,
    } = this.props.classes;

    return (
      <Fragment>
        {topNews.length ?
          <GridList cellHeight={250} cols={1}>
            {topNews.map((news, index) => (
              <GridListTile className="enter-news-tile" key={news._id}>
                {EnterNewsGrid.renderImage(news)}
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

EnterNewsGrid.defaultProps = {
  topNews: [],
  authors: [],
};

EnterNewsGrid.propTypes = {
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
};

export default withStyles(styles)(EnterNewsGrid);
