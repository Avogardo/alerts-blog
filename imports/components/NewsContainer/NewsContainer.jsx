import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import './NewsContainer.css';

class NewsContainer extends Component {
  static renderImage(news) {
    const blob = new Blob([news.enterImage.data.image], { type: 'image/jpeg' });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    return <img src={imageUrl} alt={news.enterImage.data.name} />;
  }

  render() {
    const { topNews } = this.props;

    return (
      <section>
        {topNews.length &&
          <GridList cellHeight={250} cols={1}>
            {topNews.map(news => (
              <GridListTile key={news._id}>
                {NewsContainer.renderImage(news)}
                <GridListTileBar
                  title={news.title}
                  subtitle={<span>by: {news.authorId}</span>}
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
};

export default NewsContainer;
