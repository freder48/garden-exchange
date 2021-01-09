import React, { Component } from 'react';
import './Messages.css'
import Moment from 'react-moment';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ReplyIcon from '@material-ui/icons/Reply';

class Messages extends Component {
//get all messages for specific user upon page load
  componentDidMount() {
    this.props.dispatch({ type: 'GET_MESSAGES' })
  }

    render() {
        return (
            <div>
                {JSON.stringify(this.props.store.message)}
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
                        <td><Moment format='hh:mm A, MM/DD/YYYY'>
                            {message.time_received}
                            </Moment></td>
                        <td><ReplyIcon></ReplyIcon></td>
                        <td><DeleteOutlinedIcon 
                            onClick={()=> {this.deleteMessage(message.id)}}>
                            </DeleteOutlinedIcon></td>
                    </tr>

                    )}
                     
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(Messages);
