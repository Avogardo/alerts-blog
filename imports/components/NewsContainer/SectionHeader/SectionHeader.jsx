import React from 'react';
import PropTypes from 'prop-types';
import {
  CardHeader,
  withStyles,
  IconButton,
  Card,
} from '@material-ui/core';
import { YoutubeIcon, FacebookIcon } from 'mdi-react';
import './SectionHeader.css';

const styles = {
  headerCard: {
    padding: '0 25px',
    backgroundColor: '#000000',
    marginBottom: 20,
  },
  secondaryHeaderCard: {
    padding: '0 25px',
    backgroundColor: '#000000',
    marginBottom: 20,
    marginTop: 30,
  },
  youtubeHeader: {
    padding: 9,
    marginBottom: 10,
    backgroundColor: '#c41713',
  },
  facebookHeader: {
    padding: 9,
    marginBottom: 10,
    backgroundColor: '#4c63a2',
  },
  socialIconButton: {
    borderRadius: 0,
    backgroundColor: '#ffffff',
    height: 25,
    width: 25,
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
  breakingNewsCard: {
    padding: '12px 15px',
    marginTop: 4,
    fontSize: 14,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
};

const SectionHeader = ({
  headerTitle,
  secondary,
  youtube,
  facebook,
  breakingNews,
  breakingNewsData,
  classes: {
    headerCard,
    secondaryHeaderCard,
    youtubeHeader,
    socialIconButton,
    facebookHeader,
    breakingNewsCard,
  },
}) => {
  if (youtube || facebook) {
    const socialHeader = youtube ? '1023 Subscriber' : '924 Likes';
    const socialHeaderAction = youtube ? 'Subscribe' : 'Like our page';

    return (
      <CardHeader
        className={youtube ? youtubeHeader : facebookHeader}
        title={
          <div className="social-header-content-wrapper">
            <div className="social-header-wrapper">
              <IconButton className={socialIconButton} color="default">
                {youtube ?
                  <YoutubeIcon color="#c41713" size={14} />
                  :
                  <FacebookIcon color="#4c63a2" size={14} />
                }
              </IconButton>
              <span className="social-header">{socialHeader}</span>
            </div>
            <span className="social-header-action">{socialHeaderAction}</span>
          </div>
        }
      />
    );
  } else if (breakingNews) {
    return (
      <Card className={breakingNewsCard}>
        <strong className="breaking-news-strong">Breaking News: </strong>
        {breakingNewsData.title ?
          breakingNewsData.title
          :
          <div className="basic-text-loading-placeholder" />
        }
      </Card>
    );
  }

  return (
    <CardHeader
      className={secondary ? secondaryHeaderCard : headerCard}
      title={<span className="header-card-title">{headerTitle}</span>}
    />
  );
};

SectionHeader.defaultProps = {
  secondary: false,
  youtube: false,
  facebook: false,
  breakingNews: false,
  headerTitle: '',
  breakingNewsData: {},
};

SectionHeader.propTypes = {
  headerTitle: PropTypes.string,
  secondary: PropTypes.bool,
  youtube: PropTypes.bool,
  facebook: PropTypes.bool,
  breakingNews: PropTypes.bool,
  breakingNewsData: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
  }),
  classes: PropTypes.shape({
    headerCard: PropTypes.string.isRequired,
    secondaryHeaderCard: PropTypes.string.isRequired,
    youtubeHeader: PropTypes.string.isRequired,
    socialIconButton: PropTypes.string.isRequired,
    facebookHeader: PropTypes.string.isRequired,
    breakingNewsCard: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(SectionHeader);
