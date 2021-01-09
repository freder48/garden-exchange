import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class UserProfile extends Component {
    //get all messages for specific user upon page load
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_LISTING' })
    }

    render() {
        return (
            <div>
                <h2>Profile</h2>
                <h4>Your Listings</h4>
                {/* <table>
                    <thead>
                        <tr>
                            <th>Message</th>
                            <th>Received At</th>
                            <th>Reply</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>

                        {this.props.store.message.map((message) =>

                            <tr key={message.id}>

                            </tr>

                        )}

                    </tbody>
                </table> */}
            </div>
        );
    }
}

export default connect(mapStoreToProps)(UserProfile);
