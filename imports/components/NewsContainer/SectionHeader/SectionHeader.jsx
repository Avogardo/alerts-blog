import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardHeader, withStyles } from '@material-ui/core';
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
    } = this.props.classes;

    if (youtube) {
      return (
        <CardHeader
          className={youtubeHeader}
          title={<span className="header-card-title">1023 Subscriber</span>}
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
  }).isRequired,
};

export default withStyles(styles)(SectionHeader);
