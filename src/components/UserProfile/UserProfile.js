import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Moment from 'react-moment';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';

class UserProfile extends Component {
    //get all messages for specific user upon page load
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_LISTING' })
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.props.store.forum)}
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

                            <tr key={listing.id}>
                                <td>{listing.have}</td>
                                <td>{listing.want}</td>
                                <td>{listing.location}</td>
                                <td><Moment format='MM/DD/YYYY'>{listing.date}</Moment></td>
                                <td><EditIcon></EditIcon></td>
                                <td><DeleteOutlinedIcon
                                    onClick={() => { this.deleteListing(listing.id) }}>
                                </DeleteOutlinedIcon></td>
                            </tr>

                        )} 

                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(UserProfile);
