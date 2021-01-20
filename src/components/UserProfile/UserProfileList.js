import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import UserProfileItem from './UserProfileItem';
import { withStyles } from '@material-ui/core/styles';
import {Card} from '@material-ui/core';

const styles = {
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
        console.log('clicked')
        this.props.dispatch({type: 'UPDATE_USER_EMAIL_NOTIFICATIONS' , payload: this.props.store.user })
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
                            <UserProfileItem listing={listing}/>
                        </tr>
                        )} 

                    </tbody>
                </table>

                <h4 className={classes.yourListings}>Your Personal Information</h4>
                <Card>
                    <ul>
                        <li>Username: {this.props.store.user.username}</li>
                         <li>First Name: {this.props.store.user.first_name}</li>
                         <li>Last Name: {this.props.store.user.last_name}</li>
                         <li>Email: {this.props.store.user.email}</li>

                         {this.props.store.user.email_messages === true ?

                         <button onClick={this.emailUpdate}>Unsubscribe from message notifications</button>
                        :
                        <button onClick={this.emailUpdate}>Get message notifications</button>}
                    </ul>
                </Card>
            </div>
        );
    }
}


export default connect(mapStoreToProps)(withStyles(styles)(UserProfileList));
