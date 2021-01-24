import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import UserProfileItem from './UserProfileItem';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import UserGallery from './UserGallery';
import swal from 'sweetalert';

const styles = {
    button: {
        backgroundColor: "#c78b50",
        justifyContent: 'center',
        border: '2px solid black',
        marginBottom: '1%',
        marginLeft: '20px',
        marginTop: '1%',
        '&:hover': {
            backgroundColor: 'rgb(69, 109, 109);',
            color: '#fff9e6'
        }
    },
    header: {
        backgroundColor: "#c78b50",
        width: "100%",
        textAlign: "left",
        padding: "1rem",
        paddingLeft: '20px',
        border: '3px solid #fff9e6',
        letterSpacing: '5px',
        fontFamily: 'Copperplate'
    },
    yourListings: {
        paddingLeft: '20px',
        marginTop: '3%',
    }
}

class UserProfileList extends Component {

    //get all messages for specific user upon page load
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_LISTING' });
        this.props.dispatch({ type: 'GET_USER_GALLERY' });
    }

    //put route for email notification
    emailUpdate = () => {
        if (this.props.store.user.email_messages) {
            swal({
                title: "You are now unsubscribed!",
                icon: "success",
            });
        } else {
            swal({
                title: "You are now subscribed!",
                icon: "success",
            });
        }
        this.props.dispatch({ type: 'UPDATE_USER_EMAIL_NOTIFICATIONS', payload: this.props.store.user })

    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <h2 className={classes.header}> Your Profile</h2>
                <h4 className={classes.yourListings}>Your Listings</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Have</th>
                            <th>Want</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.props.store.forum.map((listing) =>
                            <tr>
                                <UserProfileItem listing={listing} />
                            </tr>
                        )}

                    </tbody>
                </table>

                <section>
                    <h4 className={classes.yourListings}>Your Gallery Posts</h4>
                    <Grid container>
                        {this.props.store.gallery.map((gallery) =>

                            <UserGallery gallery={gallery} />

                        )}
                    </Grid>
                </section>

                <section>
                    <h4 className={classes.yourListings}>User Preferences</h4>
                    {this.props.store.user.email_messages === true ?

                        <Button
                            onClick={this.emailUpdate}
                            className={classes.button}>
                            Unsubscribe from message notifications
                             </Button>
                        :
                        <Button
                            onClick={this.emailUpdate}
                            className={classes.button}>
                            Get message notifications
                            </Button>}
                </section>

            </div>
        );
    }
}


export default connect(mapStoreToProps)(withStyles(styles)(UserProfileList));
