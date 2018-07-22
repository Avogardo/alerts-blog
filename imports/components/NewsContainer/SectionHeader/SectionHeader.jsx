import React from 'react';
import PropTypes from 'prop-types';
import { CardHeader, withStyles, IconButton } from '@material-ui/core';
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
};

const SectionHeader = ({
  headerTitle,
  secondary,
  youtube,
  facebook,
  classes: {
    headerCard,
    secondaryHeaderCard,
    youtubeHeader,
    socialIconButton,
    facebookHeader,
  },
}) => {
  if (youtube) {
    return (
      <CardHeader
        className={youtubeHeader}
        title={
          <div className="social-header-content-wrapper">
            <div className="social-header-wrapper">
              <IconButton className={socialIconButton} color="default">
                <YoutubeIcon color="#c41713" size={14} />
              </IconButton>
              <span className="social-header">1023 Subscriber</span>
            </div>
            <span className="social-header-action">Subscribe</span>
          </div>
        }
      />
    );
  } else if (facebook) {
    return (
      <CardHeader
        className={facebookHeader}
        title={
          <div className="social-header-content-wrapper">
            <div className="social-header-wrapper">
              <IconButton className={socialIconButton} color="default">
                <FacebookIcon color="#4c63a2" size={14} />
              </IconButton>
              <span className="social-header">924 Likes</span>
            </div>
            <span className="social-header-action">Like our page</span>
          </div>
        }
      />
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
  headerTitle: '',
};

SectionHeader.propTypes = {
  headerTitle: PropTypes.string,
  secondary: PropTypes.bool,
  youtube: PropTypes.bool,
  facebook: PropTypes.bool,
  classes: PropTypes.shape({
    headerCard: PropTypes.string.isRequired,
    secondaryHeaderCard: PropTypes.string.isRequired,
    youtubeHeader: PropTypes.string.isRequired,
    socialIconButton: PropTypes.string.isRequired,
    facebookHeader: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(SectionHeader);
