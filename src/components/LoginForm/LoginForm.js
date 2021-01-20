import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Card,} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = {
  button: {
    backgroundColor: '#fff9e6',
    justifyContent: 'center',
    border: '2px solid black',
    marginBottom: '1%',
    marginTop: '1%',
    '&:hover': {
      backgroundColor: 'rgb(69, 109, 109);',
      color: '#fff9e6'
    }
  },
  card: {
    margin: 'auto',
    width: '60%',
    height: '100%',
    marginTop: '6em',
    justifyContent: 'center',
    backgroundColor: '#7e9a9a',
    border: '20px solid white'
  },
  form: {
    textAlign: 'center'
  },
  header: {
    backgroundColor: "#c78b50",
    margin: " auto",
    width: "100%",
    textAlign: "center",
    padding: "3%",
    border: '3px solid #fff9e6',
    letterSpacing: '5px',
    fontFamily: 'Copperplate'
  },
  input: {
    marginTop: '1rem',
    width: '90%',
    backgroundColor: '#fff9e6',
  },
  textField: {
    marginTop: '1rem',
    width: '90%',
    backgroundColor: '#fff9e6',
  },
  icon: {
    paddingBottom: '25px',
  }

};

class LoginForm extends Component {

//local state
  state = {
    username: '',
    password: '',
    showPassword: false, 
  };

  //handle login
  login = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  //toggles the password from visible to hidden
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
    console.log('flipped boolean', this.state.showPassword);
  };

  //handle inputs
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
      <form className={classes.form} onSubmit={this.login}>
        <h2 className={classes.header}>Login</h2>
        {this.props.store.errors.loginMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
          </h3>
        )},
        <div>
          <label htmlFor="username">
           
            <TextField
              className={classes.textField}
              label="Username"
              type="text"
              name="username"
              required
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            
            <TextField
              required
              className={classes.input}
              label="Password"
              type={this.state.showPassword ? 'text' : 'password'}
              // name="password"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                <IconButton
                  className={classes.icon}
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}>
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>,
              }}

            />
          </label>
        </div>
        <div>
          <Button 
          className={classes.button}
          type="submit" 
          name="submit" 
          value="Log In" >Log In</Button>
        </div>
      </form>
      </Card>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(LoginForm));