import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Card, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    link: {
        backgroundColor: '#c78b50',
        color: 'black',
        border: '2px solid black',
        margin: '2%',
        padding: '2%',
        textDecoration: 'none',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: 'rgb(69, 109, 109);',
            color: '#fff9e6'
        }
    },
    card: {
        marginTop: '15%',
        margin: '5%',
        justifyContent: 'center',
        backgroundColor: '#7e9a9a',
        border: '20px solid white',
        padding: '2%',
        textAlign: 'center',
      }, 
      descriptionContainer: {
        backgroundColor: '#fff9e6', 
        padding: '1%',
        paddingBottom: '20px',

      },
      itemDescription: {
        marginBottom: '35px',
      }
}

class GalleryItem extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>  
      <Grid item xs={12} sm={6} lg={4}>
       <Card 
        className={classes.card}>
            <img src={this.props.gallery.url} alt={this.props.gallery.description}></img>
            <section className={classes.descriptionContainer}>
            <p className={classes.itemDescription}>{this.props.gallery.description}</p>
            <a href={this.props.gallery.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={classes.link}
            >Image Link
            </a>
            </section>
       </Card>    
       </Grid>
      </>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(GalleryItem));

