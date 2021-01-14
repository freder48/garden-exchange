import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Card} from '@material-ui/core';

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
  textField: {
    marginTop: '1rem',
    width: '90%',
    backgroundColor: '#fff9e6',
  },

};

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

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
              className={classes.textField}
              label="Password"
              type="password"
              name="password"
              required
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
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