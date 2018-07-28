import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Card,
} from '@material-ui/core';
import EnterNews from './EnterNews';
import BasicNews from './BasicNews';
import ExitNews from './ExitNews';
import SectionHeader from './SectionHeader';

const styles = {
  mainNewsCard: {
    backgroundColor: 'transparent',
    boxShadow: 'unset',
  },
  newsCard: {
    padding: 20,
    marginTop: 50,
  },
};

class NewsContainer extends Component {
  render() {
    const {
      enterContainer,
      exitContainer,
      topNews,
      authors,
      unit8ArrayToUrl,
      headerTitle,
      goToNews,
    } = this.props;
    const {
      mainNewsCard,
      newsCard,
    } = this.props.classes;

    if (enterContainer) {
      return (
        <section>
          <Card className={mainNewsCard}>
            <EnterNews
              goToNews={goToNews}
              topNews={topNews}
              authors={authors}
              unit8ArrayToUrl={unit8ArrayToUrl}
            />
          </Card>
        </section>
      );
    } else if (exitContainer) {
      const oneNews = topNews.slice(0, 1);

      return (
        <section>
          <Card className={newsCard}>
            <SectionHeader headerTitle="Most Popular" />
            <BasicNews
              topNews={oneNews}
              authors={authors}
              unit8ArrayToUrl={unit8ArrayToUrl}
            />
            <ExitNews topNews={topNews} unit8ArrayToUrl={unit8ArrayToUrl} />
            <SectionHeader secondary headerTitle="Social Networks" />
            <SectionHeader facebook />
            <SectionHeader youtube />
          </Card>
        </section>
      );
    }

    return (
      <section>
        <Card className={newsCard}>
          <SectionHeader headerTitle={headerTitle} />
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
  exitContainer: false,
  headerTitle: '',
  topNews: [],
  authors: [],
};

NewsContainer.propTypes = {
  enterContainer: PropTypes.bool,
  exitContainer: PropTypes.bool,
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
  }).isRequired,
  goToNews: PropTypes.func.isRequired,
  unit8ArrayToUrl: PropTypes.func.isRequired,
};

export default withStyles(styles)(NewsContainer);
