import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  container: {
    marginLeft: '50px',
    marginRight: '30px',
    width: '95%',
  },
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
  forward: {
    marginRight: '40px'
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
        <Grid container className={classes.container}>

          <h1 className={classes.header}>Summary</h1>

          <Grid item xs={12} sm={2} lg={3} className={classes.leftMargin}>
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

          <Grid item xs={12} sm={2}>
            <h3 className={classes.title}>Challenges</h3>
            <ul>
              <li>Responsiveness</li>
            </ul>
          </Grid>

          <Grid item xs={12} sm={3} className={classes.forward}>
            <h3 className={classes.title}>Moving Forward</h3>
            <ul>
              <li>Build out Gallery Page for likes/comments</li>
              <br></br>
              <li>Work with Google Map API for location data</li>
            </ul>
          </Grid>

          <Grid item xs={12} sm={3}>
            <h3 className={classes.title}>Thank You</h3>
            <ul>
              <li>To all of the PHENOMENAL Vattians and the whole Prime community</li>
              <br></br>
              <li>To Mary Mosman for her incredible guidance and kindness</li>
              <br></br>
              <li>To the amazing friends and family in my life who supported me through this journey</li>
            </ul>
          </Grid>

        </Grid>
      </div>


    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(WrapUp));
