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
import styled from 'styled-components';

import BasicNews from '../NewsContainer/BasicNews';
import Comments, { AddComment } from '../Comments';
import './News.css';

const NewsCard = styled(Card)`
  padding: 20px;
  margin-top: 50px;
`;
const NewsContentCard = styled(CardContent)`
  && {
    margin-top: 30px;
    padding-left: 0;
    padding-top: 0;
    padding-right: 0;
  }
`;

const styles = {
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
    const { editButton } = this.props.classes;

    return (
      <article key="news-card">
        <NewsCard>
          <BasicNews
            newsCard
            topNews={news}
            authors={author}
            unit8ArrayToUrl={unit8ArrayToUrl}
          />

          {news[0] ?
            <Fragment>
              <NewsContentCard
                dangerouslySetInnerHTML={{ __html: (news[0].content || '') }}
              />

              Views: {news[0].views}
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
        </NewsCard>
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
    chips: PropTypes.string.isRequired,
    editButton: PropTypes.string.isRequired,
  }).isRequired,
  author: PropTypes.arrayOf(PropTypes.string.isRequired),
  news: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
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
