import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Card,
  CardHeader,
} from '@material-ui/core';
import EnterNewsGrid from './EnterNewsGrid';
import BasicNewsGrid from './BasicNewsGrid';

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
      topNews,
      authors,
    } = this.props;
    const {
      mainNewsCard,
      newsCard,
      headerCard,
    } = this.props.classes;

    return (
      <section>
        {enterContainer ?
          <Card className={mainNewsCard}>
            <EnterNewsGrid
              topNews={topNews}
              authors={authors}
            />
          </Card>
          :
          <Card className={newsCard}>
            <CardHeader className={headerCard} title={<span className="header-card-title">Latest News</span>} />
            <BasicNewsGrid
              topNews={topNews}
              authors={authors}
            />
          </Card>
        }
      </section>
    );
  }
}

NewsContainer.defaultProps = {
  enterContainer: false,
  topNews: [],
  authors: [],
};

NewsContainer.propTypes = {
  enterContainer: PropTypes.bool,
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
};

export default withStyles(styles)(NewsContainer);
