import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  Card,
  withStyles,
  CardContent,
  Chip,
  Button,
  CardActions,
} from '@material-ui/core';

import BasicNews from '../NewsContainer/BasicNews';
import Comments, { AddComment } from '../Comments';
import './News.css';

const styles = {
  newsCard: {
    padding: 20,
    marginTop: 50,
  },
  newsContentCard: {
    marginTop: 30,
    paddingLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
  },
  chips: {
    margin: 4,
  },
  editButton: {
    backgroundColor: '#222222',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#333333',
    },
  },
};

class News extends Component {
  constructor(props) {
    super(props);
    this.goToTagSearch = this.goToTagSearch.bind(this);
  }

  goToTagSearch({ target }) {
    const { goToTagSearch, history } = this.props;
    goToTagSearch(history, target.textContent);
  }

  renderTags() {
    const { tags } = this.props.news[0];
    const { chips } = this.props.classes;

    return tags.map(tag => (
      <Chip
        key={tag + new Date().getTime() + Math.random()}
        label={tag}
        className={chips}
        onClick={this.goToTagSearch}
      />
    ));
  }

  render() {
    const {
      news,
      author,
      unit8ArrayToUrl,
      isAdmin,
      onRemoveNews,
      goToCreateNews,
      history,
    } = this.props;
    const { newsCard, newsContentCard, editButton } = this.props.classes;

    return (
      <article key="news-card">
        <Card className={newsCard}>
          <BasicNews
            newsCard
            topNews={news}
            authors={author}
            unit8ArrayToUrl={unit8ArrayToUrl}
          />

          {news[0] ?
            <Fragment>
              <CardContent
                className={newsContentCard}
                dangerouslySetInnerHTML={{ __html: (news[0].content || '') }}
              />

              {!!news[0].tags.length &&
                <div className="news-tags-wrapper">{this.renderTags()}</div>
              }

              {isAdmin &&
                <CardActions>
                  <Button onClick={() => onRemoveNews(news[0]._id)} variant="raised" color="secondary">
                    Remove
                  </Button>
                  <Button onClick={() => goToCreateNews(history, news[0]._id)} className={editButton} variant="raised">
                    Edit
                  </Button>
                </CardActions>
              }

              <Comments newsId={news[0]._id} />

              <AddComment newsId={news[0]._id} />
            </Fragment>
            :
            ['fake-1', 'fake-2', 'fake-3', 'fake-4', 'fake-5'].map(line => (
              <div key={line} className="text-loading-placeholder" />
            ))
          }
        </Card>
      </article>
    );
  }
}

News.defaultProps = {
  news: [],
  author: [],
};

News.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  classes: PropTypes.shape({
    newsCard: PropTypes.string.isRequired,
    newsContentCard: PropTypes.string.isRequired,
    chips: PropTypes.string.isRequired,
    editButton: PropTypes.string.isRequired,
  }).isRequired,
  author: PropTypes.arrayOf(PropTypes.string.isRequired),
  news: PropTypes.arrayOf(PropTypes.shape({
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
  unit8ArrayToUrl: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onRemoveNews: PropTypes.func.isRequired,
  goToCreateNews: PropTypes.func.isRequired,
  goToTagSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(News);
