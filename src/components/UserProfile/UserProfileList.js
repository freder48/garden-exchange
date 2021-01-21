import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import UserProfileItem from './UserProfileItem';
import { withStyles } from '@material-ui/core/styles';
import { Card, Button } from '@material-ui/core';

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
    }
}

class UserProfileList extends Component {

    //get all messages for specific user upon page load
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_LISTING' })
    }

    //put route for email notification
    emailUpdate = () => {
        if (this.props.store.user.email_messages){
            alert('You are now unsubscribed')
        } else {
            alert('You are now subscribed')
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

                <h4 className={classes.yourListings}>Your Personal Information</h4>
                <Card>
                    <ul>
                        <p>Username: {this.props.store.user.username}</p>
                        <p>First Name: {this.props.store.user.first_name}</p>
                        <button>Edit</button>
                        <p>Last Name: {this.props.store.user.last_name}</p>
                        <p>Email: {this.props.store.user.email}</p>

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
                    </ul>
                </Card>
            </div>
        );
    }
}


export default connect(mapStoreToProps)(withStyles(styles)(UserProfileList));
