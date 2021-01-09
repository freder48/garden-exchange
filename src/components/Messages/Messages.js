import React, { Component } from 'react';
import './Messages.css'
import Moment from 'react-moment';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';

class Messages extends Component {
    render() {
        return (
            <div>
                <h1>Messages</h1>
                <table>
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
                        <td>{message.message}</td>
                    </tr>

                    )}

                     
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(Messages);
