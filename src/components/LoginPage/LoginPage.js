import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = {
  button: {
    backgroundColor: '#c78b50',
    border: '2px solid white', 
    justifyContent: 'center',
    marginTop: '0',
    marginBottom: '1%',
    '&:hover': {
      backgroundColor: 'rgb(69, 109, 109);',
      color: '#fff9e6'
    }
  },
  question: {
    marginBottom: '1%',
  }
};

class LoginPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <LoginForm />
        <center>
          <h5 className={classes.question}>Not a member yet?</h5>
          <Button
            type="button"
            className={classes.button}
            onClick={() => {
              this.props.history.push('/registration');
            }}
          >
            Register
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(LoginPage));
