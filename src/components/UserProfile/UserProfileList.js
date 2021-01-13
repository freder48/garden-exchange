import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import UserProfileItem from './UserProfileItem';
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
            </div>
        );
    }
}


export default connect(mapStoreToProps)(withStyles(styles)(UserProfileList));
