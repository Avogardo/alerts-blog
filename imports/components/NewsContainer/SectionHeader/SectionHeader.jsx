import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CardHeader, withStyles, IconButton } from '@material-ui/core';
import { YoutubeIcon } from 'mdi-react';
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
    padding: '4px 10px',
    marginBottom: 10,
    backgroundColor: '#c41713',
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

class SectionHeader extends Component {
  render() {
    const {
      headerTitle,
      secondary,
      youtube,
    } = this.props;
    const {
      headerCard,
      secondaryHeaderCard,
      youtubeHeader,
      socialIconButton,
    } = this.props.classes;

    if (youtube) {
      return (
        <CardHeader
          className={youtubeHeader}
          title={
            <Fragment>
              <IconButton className={socialIconButton} color="default">
                <YoutubeIcon color="#c41713" size={14} />
              </IconButton>
              <span className="header-card-title">1023 Subscriber</span>
            </Fragment>
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
  }
}

SectionHeader.defaultProps = {
  secondary: false,
  youtube: false,
  headerTitle: '',
};

SectionHeader.propTypes = {
  headerTitle: PropTypes.string,
  secondary: PropTypes.bool,
  youtube: PropTypes.bool,
  classes: PropTypes.shape({
    headerCard: PropTypes.string.isRequired,
    secondaryHeaderCard: PropTypes.string.isRequired,
    youtubeHeader: PropTypes.string.isRequired,
    socialIconButton: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(SectionHeader);
