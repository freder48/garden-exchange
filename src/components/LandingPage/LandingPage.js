import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card} from '@material-ui/core';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

const styles = {
  card: {
    margin: 'auto',
    width: '60%',
    marginTop: '9%',
    justifyContent: 'center',
    backgroundColor: '#c78b50',
    border: '20px solid white',
    padding: '2%',
    textAlign: 'center',
  }, 
  header: {
    textAlign: 'center',
    fontFamily: 'Copperplate',
    fontSize: '26px',
    letterSpacing: '5px',
  },
  quote: {
    textAlign: 'center',
    backgroundColor: '#7e9a9a',
    padding: '2%',
    border: '3px solid #fff9e6',
  }
}

class LandingPage extends Component {

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    const { classes } = this.props;
    return (
      // <div className="container">
      <Grid container>
          {/* <div className="grid-col grid-col_5"> */}
          <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
          <h2 className={classes.header}>Welcome!</h2>
            <p>
          <p className={classes.quote}>"You don't have a garden just for yourself.  You have it to share."
          -  Augusta Carter</p>
            </p>
            <p>
              Welcome to Garden Exchange, an open forum dedicated to preventing food waste while cultivating
              community connections. 
            </p>
            <p>
              As a member, you will have the ability to browse, message, and exchange surplus garden and 
              artisinal products with fellow users located within your area. 
            </p>
            </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
          {/* <div className="grid-col grid-col_5"> */}
            <RegisterForm /> 
            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={this.onLogin}>
                Login
              </button>
            </center>
            </Grid>
        </Grid>
 
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(LandingPage));
