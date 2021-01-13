import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Card, Typography, FormControlLabel, Checkbox } from '@material-ui/core';

const styles = {
  button: {
    backgroundColor: '#fff9e6',
    justifyContent: 'center',
    marginBottom: '1%',
    '&:hover': {
      backgroundColor: 'rgb(69, 109, 109);',
      color: '#fff9e6'
    }
  },
  card: {
    margin: 'auto',
    width: '80%',
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
                  type="password"
                  name="password"
                  id="filled-required"
                  label="Password"
                  variant="filled"
                  value={this.state.password}
                  required
                  className={classes.textField}
                  onChange={this.handleInputChangeFor('password')}
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
                control={<Checkbox
                  checked={this.state.email_messages}
                  onClick={this.handleCheck}
                  name="checked" />}
                label="Want Email Updates"
              />
            </div>
            <div>
              <Button className={classes.button}
                type="submit"
                name="submit" v
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