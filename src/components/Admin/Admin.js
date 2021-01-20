//imports //imports JUST the component from react not ALL of react 
import React, { Component } from 'react';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button} from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Modal from '../Modal/Modal';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import ReplyIcon from '@material-ui/icons/Reply';
import swal from 'sweetalert';

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
    icon: {
        paddingRight: '5px',
    },
}
//class
class Admin extends Component {
    state = {
        //for pop-up dialog form
        show: false,
        messageObj: {
            sent_to_user_id: '',
            sent_from_user_id: '',
            forum_id: '',
            subject: '',
            message: '',
            mail_sent: true,
        },
    }//end local state
    
    //Get all forum listings and support form messages on page load
    componentDidMount() {
        this.props.dispatch({ type: 'GET_FORUM' })
        this.props.dispatch({ type: 'GET_MESSAGES' })
    }

    //deletes message based upon id 
    deleteMessage(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your message has been deleted!", {
                        icon: "success",
                    });
                    this.props.dispatch({ type: 'DELETE_MESSAGE', payload: id })
                } else {
                    swal("Your message is safe!");
                }
            });

    }//end deleteMessage

    //hides pop-up modal by setting local state show to false
    hideModal = () => {
        this.setState({ show: false });
    };

    //displays message form if show boolean in local state is set to true
    showModal = (id, user_id) => {
        this.setState({ show: true, messageObj: { forum_id: id, sent_to_user_id: user_id, mail_sent: true, } });
    };

    render() {
        const { classes } = this.props;
        return (
            <>
                <h2 className={classes.header}>Manage All Listings</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Have</th>
                            <th>Want</th>
                            <th>Location</th>
                            <th>Date Posted</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.props.store.forum.map(post => {
                            return (
                                <tr key={post.id}>
                                    <td>{post.have}</td>
                                    <td>{post.want}</td>
                                    <td>{post.location}</td>
                                    <td><Moment format='MM/DD/YYYY'>{post.date}</Moment></td>
                                    <td>
                                        <Button
                                            onClick={() => { this.deleteItem(post.id) }}>
                                            <DeleteOutlinedIcon
                                                className={classes.icon} />
                                                Delete
                                            </Button>
                                    </td>
                                </tr>
                            )
                        })
                        }

                    </tbody>
                </table>

                <h2 className={classes.header}>Support Messages</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Received At</th>
                            <th>Reply</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>

                        {this.props.store.message.map((message) =>

                            <tr key={message.id}>
                                <td>{message.subject}</td>
                                <td>{message.message}</td>
                                <td><Moment format='hh:mm A, MM/DD/YYYY'>
                                    {message.time_sent}
                                </Moment></td>
                                <td>
                                    <Button
                                        onClick={() => this.showModal(message.forum_id, message.sent_from_user_id)}>
                                        <ReplyIcon className={classes.icon} />
                                   Reply
                                </Button>
                                </td>

                                <td>
                                    <Button onClick={() => { this.deleteMessage(message.id) }}>
                                        <DeleteOutlinedIcon
                                            className={classes.icon} />
                                  Delete
                                  </Button>
                                </td>
                            </tr>

                        )}

                    </tbody>
                </table>

                <Modal
                    show={this.state.show}
                    handleClose={this.hideModal}
                    messageObj={this.state.messageObj}>
                </Modal>

            </>
        ) //end return 
    } //end render
} //end class 


export default connect(mapStoreToProps)(withStyles(styles)(Admin));