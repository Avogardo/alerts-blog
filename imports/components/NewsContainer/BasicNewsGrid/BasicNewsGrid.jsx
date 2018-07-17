import React, { Component, Fragment } from 'react';
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
import {
  AccountOutlineIcon,
  CalendarMultipleCheckIcon,
  MessageOutlineIcon,
} from 'mdi-react';
import './BasicNewsGrid.css';

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

class BasicNewsGrid extends Component {
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
      newsCardHeader,
      newsCardContent,
      tileCard,
    } = this.props.classes;

    return (
      topNews.length ?
        topNews.map((news, index) => (
          <Card className={tileCard} key={news._id}>
            <GridList cellHeight={250} cols={1}>
              <GridListTile className="enter-news-tile" key={news._id}>
                {BasicNewsGrid.renderImage(news)}
              </GridListTile>
            </GridList>
            <CardHeader
              className={newsCardHeader}
              title={<h4 className="news-card-title">{news.title}</h4>}
              subheader={
                <span className="subtitle-tile">
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

BasicNewsGrid.defaultProps = {
  topNews: [],
  authors: [],
};

BasicNewsGrid.propTypes = {
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
};

export default withStyles(styles)(BasicNewsGrid);
