import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Card, CardActionArea, CardContent, Typography, TextField, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

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
  },
};

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <RegisterForm />

        <center>
        <h5 className={classes.question}>Already a member?</h5>
          <Button
            type="button"
            className={classes.button}
            onClick={() => {
              this.props.history.push('/login');
            }}
          >
            Login
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(RegisterPage));
