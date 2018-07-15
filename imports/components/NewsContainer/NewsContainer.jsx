import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  withStyles,
} from '@material-ui/core';
import { AccountOutlineIcon } from 'mdi-react';
import './NewsContainer.css';

const styles = {
  gridListTileBar: {
    background: 'unset',
  },
};

class NewsContainer extends Component {
  static renderImage(news) {
    const blob = new Blob([news.enterImage.data.image], { type: 'image/jpeg' });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    return <img src={imageUrl} alt={news.enterImage.data.name} />;
  }

  render() {
    const { topNews, authors } = this.props;
    const { gridListTileBar } = this.props.classes;

    return (
      <section>
        {topNews.length &&
          <GridList cellHeight={250} cols={1}>
            {topNews.map((news, index) => (
              <GridListTile key={news._id}>
                {NewsContainer.renderImage(news)}
                <GridListTileBar
                  className={gridListTileBar}
                  title={news.title}
                  subtitle={
                    <span className="subtitle-tile">
                      <AccountOutlineIcon className="user-icon" size={17} /> {authors[index]}
                    </span>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        }
      </section>
    );
  }
}

NewsContainer.defaultProps = {
  topNews: [],
  authors: [],
};

NewsContainer.propTypes = {
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
};

export default withStyles(styles)(NewsContainer);
