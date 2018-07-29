import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardActions,
  Button,
  withStyles,
  Input,
} from '@material-ui/core';
import './AddComment.css';

const styles = {
  addCommentCard: {
    backgroundColor: '#ecf0f1',
    boxShadow: 'unset',
    padding: '50px 20px',
    marginTop: 50,
  },
  addCommentHeader: {
    padding: 0,
    marginBottom: 50,
  },
  actionCard: {
    flexDirection: 'column',
    padding: 0,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: '6px 12px',
    fontSize: 13,
    color: '#777777',
    boxSizing: 'border-box',
    marginBottom: '16px',
    marginLeft: 0,
    marginRight: 0,
    '&:focus': {
      border: '1px solid #ced4da',
    },
  },
  inputMultiline: {
    backgroundColor: '#ffffff',
    padding: 12,
    fontSize: 13,
    color: '#777777',
    boxSizing: 'border-box',
    marginBottom: '16px',
    marginLeft: 0,
    marginRight: 0,
    '&:focus': {
      border: '1px solid #ced4da',
    },
  },
  button: {
    backgroundColor: '#f6214b',
  },
};

class AddComment extends Component {
  render() {
    const {
      addCommentCard,
      addCommentHeader,
      actionCard,
      input,
      inputMultiline,
      button,
    } = this.props.classes;

    return (
      <Card className={addCommentCard}>
        <CardHeader
          className={addCommentHeader}
          title={<h4 className="add-comment-header">Post Comment</h4>}
        />

        <CardActions className={actionCard}>
          <Input
            className={input}
            placeholder="Enter Name"
            disableUnderline
            fullWidth
            inputProps={{
              'aria-label': 'Description',
            }}
          />

          <Input
            className={inputMultiline}
            placeholder="Message"
            disableUnderline
            fullWidth
            multiline
            inputProps={{
              'aria-label': 'Description',
            }}
          />

          <Button
            className={button}
            variant="raised"
            color="secondary"
          >
            Post Comment
          </Button>
        </CardActions>
      </Card>
    );
  }
}

AddComment.propTypes = {
  classes: PropTypes.shape({
    addCommentCard: PropTypes.string.isRequired,
    addCommentHeader: PropTypes.string.isRequired,
    actionCard: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
    inputMultiline: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }).isRequired,
  createComment: PropTypes.func.isRequired,
};


export default withStyles(styles)(AddComment);
