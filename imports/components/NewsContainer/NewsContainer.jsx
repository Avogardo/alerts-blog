import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Card,
  CardHeader,
} from '@material-ui/core';
import EnterNews from './EnterNews';
import BasicNews from './BasicNews';
import ExitNews from './ExitNews';

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
};

class NewsContainer extends Component {
  render() {
    const {
      enterContainer,
      exitNews,
      topNews,
      authors,
      unit8ArrayToUrl,
      headerTitle,
    } = this.props;
    const {
      mainNewsCard,
      newsCard,
      headerCard,
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
    } else if (exitNews) {
      const oneNews = topNews.slice(0, 1);

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
            <ExitNews topNews={topNews} unit8ArrayToUrl={unit8ArrayToUrl} />
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
  exitNews: false,
  headerTitle: '',
  topNews: [],
  authors: [],
};

NewsContainer.propTypes = {
  enterContainer: PropTypes.bool,
  exitNews: PropTypes.bool,
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
  }).isRequired,
  unit8ArrayToUrl: PropTypes.func.isRequired,
};

export default withStyles(styles)(NewsContainer);
