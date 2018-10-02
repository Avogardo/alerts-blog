import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from '@material-ui/core';
import styled from 'styled-components';
import EnterNews from './EnterNews';
import BasicNews from './BasicNews';
import ExitNews from './ExitNews';
import SectionHeader from './SectionHeader';

const MainNewsCard = styled(Card)`
  && {
    background-color: transparent;
    box-shadow: unset;
  }
`;
const NewsCard = styled(Card)`
  padding: 20px;
  margin-top: 50px;
`;

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
      tagName,
    } = this.props;

    if (enterContainer) {
      return (
        <section>
          <MainNewsCard>
            <EnterNews
              goToNews={goToNews}
              topNews={topNews}
              authors={authors}
              unit8ArrayToUrl={unit8ArrayToUrl}
            />
            <SectionHeader breakingNews />
          </MainNewsCard>
        </section>
      );
    } else if (exitContainer) {
      const newsList = topNews.slice(1, topNews.length);
      const singleNews = topNews[0] ? [topNews[0]] : [];

      return (
        <section>
          <NewsCard>
            <SectionHeader headerTitle="Most Popular" />
            <BasicNews
              exitNews
              goToNews={goToNews}
              topNews={singleNews}
              authors={authors}
              unit8ArrayToUrl={unit8ArrayToUrl}
            />
            <ExitNews goToNews={goToNews} topNews={newsList} unit8ArrayToUrl={unit8ArrayToUrl} />
            <SectionHeader secondary headerTitle="Social Networks" />
            <SectionHeader facebook />
            <SectionHeader youtube />
          </NewsCard>
        </section>
      );
    } else if (tagName) {
      return (
        <section>
          <NewsCard>
            <SectionHeader headerTitle={`Searching for: #${tagName}`} />
            <ExitNews goToNews={goToNews} topNews={topNews} unit8ArrayToUrl={unit8ArrayToUrl} />
          </NewsCard>
        </section>
      );
    }

    return (
      <section>
        <NewsCard>
          <SectionHeader headerTitle={headerTitle} />
          <BasicNews
            basicNewsList
            goToNews={goToNews}
            topNews={topNews}
            authors={authors}
            unit8ArrayToUrl={unit8ArrayToUrl}
          />
        </NewsCard>
      </section>
    );
  }
}

NewsContainer.defaultProps = {
  enterContainer: false,
  exitContainer: false,
  headerTitle: '',
  tagName: '',
  topNews: [],
  authors: [],
};

NewsContainer.propTypes = {
  enterContainer: PropTypes.bool,
  exitContainer: PropTypes.bool,
  headerTitle: PropTypes.string,
  tagName: PropTypes.string,
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
  goToNews: PropTypes.func.isRequired,
  unit8ArrayToUrl: PropTypes.func.isRequired,
};

export default NewsContainer;
