import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Card, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = {
  button: {
    backgroundColor: '#fff9e6',
    border: '2px solid #c78b50',
    justifyContent: 'center',
    marginBottom: '3%',
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
  checkbox: {
    padding: '2%',
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
    fontFamily: 'Copperplate', 
    fontSize: '26px',
  },
  textField: {
    marginTop: '1rem',
    width: '90%',
    backgroundColor: '#fff9e6',
  },

};

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    email_messages: false,
    showPassword: false, 
  };


  //toggles the password from visible to hidden
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
    console.log('flipped boolean', this.state.showPassword);
  };

  //handle inputs user information
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  //toggles the boolean of if users want email notifications for their messages
  handleCheck = () => {
    this.setState({
      ...this.state,
      email_messages: !this.state.email_messages
    })
  }
//handle registration
  registerUser = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        email_messages: this.state.email_messages,
      },
    });
  }; // end registerUser

  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Card className={classes.card} >
          <form onSubmit={this.registerUser} className={classes.form}>
            <Typography gutterBottom variant="h4" component="h2" className={classes.header}>
              Register User
          </Typography>
            {this.props.store.errors.registrationMessage && (
              <h3 className="alert" role="alert">
                {this.props.store.errors.registrationMessage}
              </h3>
            )}
            <div>

              <label htmlFor="username">
                <TextField
                  type="text"
                  id="filled-required"
                  label="Username"
                  variant="filled"
                  name="username"
                  value={this.state.username}
                  required
                  className={classes.textField}
                  onChange={this.handleInputChangeFor('username')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                <TextField
                   type={this.state.showPassword ? 'text' : 'password'}
                  name="password"
                  id="filled-required"
                  label="Password"
                  variant="filled"
                  value={this.state.password}
                  required
                  className={classes.textField}
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
              <label htmlFor="first_name">
                <TextField
                  id="filled-required"
                  label="First Name"
                  variant="filled"
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  required
                  className={classes.textField}
                  onChange={this.handleInputChangeFor('first_name')}
                />
              </label>
              <label htmlFor="last_name">
                <TextField
                  type="last_name"
                  name="last_name"
                  id="filled-required"
                  label="Last Name"
                  variant="filled"
                  value={this.state.last_name}
                  required
                  className={classes.textField}
                  onChange={this.handleInputChangeFor('last_name')}
                />
              </label>
              <label htmlFor="email">
                <TextField
                  type="email"
                  name="email"
                  id="filled-required"
                  label="Email"
                  variant="filled"
                  value={this.state.email}
                  required
                  className={classes.textField}
                  onChange={this.handleInputChangeFor('email')}
                />
              </label>
              <FormControlLabel
                className={classes.checkbox}
                control={<Checkbox
                  
                  checked={this.state.email_messages}
                  onClick={this.handleCheck}
                  name="checked" />}
                label="Get Email Updates"
                
              />
            </div>
            <div>
              <Button className={classes.button}
                type="submit"
                name="submit" 
                alue="Register"
                variant="outlined">
                Register
                </Button>
            </div>
          </form>
        </Card>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(RegisterForm));