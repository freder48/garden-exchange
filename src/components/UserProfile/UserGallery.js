import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import { Card, Button, Grid } from '@material-ui/core';
import swal from 'sweetalert';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const styles = {
    link: {
        backgroundColor: '#fff9e6',
        border: '2px solid #c78b50',
        margin: '2%',
        padding: '10px',
        fontFamily: 'Copperplate',
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
        padding: '20px',
        textAlign: 'center',

      }, 
      descriptionContainer: {
        backgroundColor: '#fff9e6', 
        padding: '1%',
        paddingBottom: '20px',

      },
      icon: {
        paddingRight: '5px',
    },
}

class UserGallery extends Component {

    //deletes item by id
    deleteGalleryItem(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your post has been deleted!", {
                        icon: "success",
                    });
                    this.props.dispatch({ type: 'DELETE_GALLERY', payload: id })
                }
            });
    }//end deleteListing


    render() {
        const { classes } = this.props;
        return (
            <>
                <Grid item xs={12} sm={4} lg={3}>
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
                            <Button onClick={() => { this.deleteGalleryItem(this.props.gallery.id) }}>
                            <DeleteOutlinedIcon className={classes.icon} />
                            Delete
                            </Button>
                        </section>
                    </Card>
                </Grid>
            </>
        );
    }
}


export default connect(mapStoreToProps)(withStyles(styles)(UserGallery));
