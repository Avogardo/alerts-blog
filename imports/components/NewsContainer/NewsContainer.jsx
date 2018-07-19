import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Card,
  CardHeader,
} from '@material-ui/core';
import EnterNews from './EnterNews';
import BasicNews from './BasicNews';
import TileSubtitle from './TileSubtitle';
import './NewsContainer.css';

const styles = {
  mainNewsCard: {
    backgroundColor: 'transparent',
    boxShadow: 'unset',
  },
  newsCard: {
    padding: 20,
    marginTop: 50,
  },
  headerCard: {
    padding: '0 25px',
    backgroundColor: '#000000',
    marginBottom: 20,
  },
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

class NewsContainer extends Component {
  render() {
    const {
      enterContainer,
      bottomContainer,
      topNews,
      authors,
      unit8ArrayToUrl,
      headerTitle,
    } = this.props;
    const {
      mainNewsCard,
      newsCard,
      headerCard,
      asideNewsCard,
      asideNewsHeaderCard,
    } = this.props.classes;

    if (enterContainer) {
      return (
        <section>
          <Card className={mainNewsCard}>
            <EnterNews
              topNews={topNews}
              authors={authors}
              unit8ArrayToUrl={unit8ArrayToUrl}
            />
          </Card>
        </section>
      );
    } else if (bottomContainer) {
      const oneNews = topNews.slice(0, 1);

      // display: flex;
      // align-items: center;
      // border-bottom: 1px solid #eee;
      // border-top: 1px solid #eee;

      return (
        <section>
          <Card className={newsCard}>
            <CardHeader
              className={headerCard}
              title={<span className="header-card-title">{headerTitle}</span>}
            />
            <BasicNews
              topNews={oneNews}
              authors={authors}
              unit8ArrayToUrl={unit8ArrayToUrl}
            />
            {topNews.map((news, index) => (
              <Card key={`bottom${news._id}`} className={asideNewsCard}>
                <div
                  className="aside-news-image"
                  style={{ backgroundImage: `url(${unit8ArrayToUrl(news.enterImage.data.image)})` }}
                />
                <CardHeader
                  className={asideNewsHeaderCard}
                  title={<h6>{news.title}</h6>}
                  subheader={
                    <TileSubtitle isAside createdAt={news.createdAt} index={index} />
                  }
                />
              </Card>
            ))}
          </Card>
        </section>
      );
    }

    return (
      <section>
        <Card className={newsCard}>
          <CardHeader
            className={headerCard}
            title={<span className="header-card-title">{headerTitle}</span>}
          />
          <BasicNews
            topNews={topNews}
            authors={authors}
            unit8ArrayToUrl={unit8ArrayToUrl}
          />
        </Card>
      </section>
    );
  }
}

NewsContainer.defaultProps = {
  enterContainer: false,
  bottomContainer: false,
  headerTitle: '',
  topNews: [],
  authors: [],
};

NewsContainer.propTypes = {
  enterContainer: PropTypes.bool,
  bottomContainer: PropTypes.bool,
  headerTitle: PropTypes.string,
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
    mainNewsCard: PropTypes.string.isRequired,
    newsCard: PropTypes.string.isRequired,
    headerCard: PropTypes.string.isRequired,
    asideNewsCard: PropTypes.string.isRequired,
    asideNewsHeaderCard: PropTypes.string.isRequired,
  }).isRequired,
  unit8ArrayToUrl: PropTypes.func.isRequired,
};

export default withStyles(styles)(NewsContainer);
