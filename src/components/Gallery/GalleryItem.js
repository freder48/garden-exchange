import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Card, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import gallerySaga from '../../redux/sagas/gallery.saga';

const styles = {
    card: {
        margin: 'auto',
        width: '80%',
        marginTop: '15%',
        justifyContent: 'center',
        backgroundColor: '#c78b50',
        border: '20px solid white',
        padding: '2%',
        textAlign: 'center',
      }, 
}

class GalleryItem extends Component {

  render() {
    const { classes } = this.props;
    return (
      <>
      <Grid container>
      <Grid item xs={12} sm={6}>
       <Card
        className={classes.card}>
            <img src={this.props.gallery.url} alt={this.props.gallery.description}></img>
            <p>{this.props.gallery.description}</p>
            <a href={this.props.gallery.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            >Link to Image
            </a>
       </Card>
       </Grid>
       </Grid>
      </>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(GalleryItem));

