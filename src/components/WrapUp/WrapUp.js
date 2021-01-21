import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Card, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  header: {
    backgroundColor: "#c78b50",
    width: "100%",
    textAlign: "left",
    padding: "1rem",
    paddingLeft: '20px',
    border: '3px solid #fff9e6',
    letterSpacing: '5px',
    fontFamily: 'Copperplate',
  },
  title: {
    paddingLeft: '20px',
  }
}
class WrapUp extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>

          <h1 className={classes.header}>Summary</h1>

          <Grid item>
            <h3 className={classes.title}>Technologies Used</h3>
            <ul>
              <li>React</li>
              <li>Redux</li>
              <li>JavaScript</li>
              <li>PostgreSQL</li>
              <li>HTML/CSS</li>
              <li>Material UI</li>
              <li>Nodemailer</li>
              <li>Filestack API</li>
              <li>Express</li>
              <li>Moment</li>
              <li>Node.js</li>
              <li>SweetAlerts</li>
              <li>Passport</li>
            </ul>
          </Grid>

          <Grid item>
            <h3 className={classes.title}>Challenges</h3>
          </Grid>

          <section>
            <h3 className={classes.title}>Moving Forward</h3>
          </section>

          <section>
            <h3 className={classes.title}>Thank You</h3>
          </section>

        </Grid>
      </div>


    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(WrapUp));
