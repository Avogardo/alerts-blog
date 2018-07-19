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
};

class SectionHeader extends Component {
  render() {
    const {
      headerTitle,
      classes,
    } = this.props;
    return (
      <CardHeader
        className={classes.headerCard}
        title={<span className="header-card-title">{headerTitle}</span>}
      />
    );
  }
}

SectionHeader.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    headerCard: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(SectionHeader);
