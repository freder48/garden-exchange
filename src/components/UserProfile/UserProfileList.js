import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import UserProfileItem from './UserProfileItem';

class UserProfileList extends Component {
    //get all messages for specific user upon page load
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_LISTING' })
    }


    render() {
        return (
            <div>
                <h2>Profile</h2>
                <h4>Your Listings</h4>
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

export default connect(mapStoreToProps)(UserProfileList);
