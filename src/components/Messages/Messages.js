import React, { Component } from 'react';
import './Messages.css'
import Moment from 'react-moment';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';

import { Card, Typography, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ReplyIcon from '@material-ui/icons/Reply';

const styles = {
    card: {
        backgroundColor: '#7e9a9a',
    },
    header: {
        backgroundColor: "#c78b50",
        margin: "auto",
        width: "80%",
        textAlign: "center",
        padding: "3rem",
        border: '3px solid #fff9e6',
        letterSpacing: '5px',
        fontFamily: 'Copperplate'
    },
    form: {
        height: '52vh'
    }
}

class Messages extends Component {
    state = {
        //for pop-up dialog form
        show: false,
        messageObj: {
            sent_to_user_id: '',
            sent_from_user_id: '',
            forum_id: '',
            subject: '',
            message: '',
        }
    }//end local state

    //get all messages for specific user upon page load
    componentDidMount() {
        this.props.dispatch({ type: 'GET_MESSAGES' })
    }
    //dispatches messageObj to saga for post route
    addMessage = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_MESSAGE', payload: this.state.messageObj })
    }//end addMessage

    //deletes message based upon id 
    deleteMessage(id) {
        this.props.dispatch({ type: 'DELETE_MESSAGE', payload: id })
    }//end deleteMessage

    //gets input values on pop-up modal and sets local state
    handleModalChange = (inputValue, event) => {
        this.setState({
            messageObj: {
                ...this.state.messageObj,
                [inputValue]: event.target.value,
                sent_from_user_id: `${this.props.store.user.id}`
            }
        })
    }//end handleModalChange

    //hides pop-up modal by setting local state show to false
    hideModal = () => {
        this.setState({ show: false });
    };

    //displays message form if show in local state is set to true
    showModal = (id, user_id) => {
        this.setState({ show: true, messageObj: { forum_id: id, sent_to_user_id: user_id } });
    };

    render() {
        const { classes } = this.props;
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
                                <td><Moment format='hh:mm A, MM/DD/YYYY'>
                                    {message.time_received}
                                </Moment></td>
                                <td><ReplyIcon onClick={() => this.showModal(message.forum_id, message.sent_from_user_id)}></ReplyIcon></td>
                                <td><DeleteOutlinedIcon
                                    onClick={() => { this.deleteMessage(message.id) }}>
                                </DeleteOutlinedIcon></td>
                            </tr>

                        )}

                    </tbody>
                </table>

                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <Card className={classes.card}>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.header}>
                            Reply:
                        </Typography>


                        <form onSubmit={this.addMessage} className={classes.form}>
                            <label type="text">Subject:</label>
                            <textarea onChange={(event) => this.handleModalChange('subject', event)} type="text" />
                            <br></br>
                            <label type="text">Message:</label>
                            <textarea onChange={(event) => this.handleModalChange('message', event)} type="text" />

                            <button>Save</button>
                        </form>
                    </Card>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(Messages));
