import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardActions,
  TextField,
  Button,
} from '@material-ui/core';

class AddComment extends Component {
  render() {
    return (
      <Card>
        <CardHeader title="Post Comment" />

        <CardActions>
          <TextField
            label="Enter Name"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Message"
            fullWidth
            multiline
            margin="normal"
            rowsMax="8"
          />

          <Button
            variant="raised"
            color="primary"
          >
            Post Comment
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default AddComment;
