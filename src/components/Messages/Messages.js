import React, { Component } from 'react';
import './Messages.css'
import Moment from 'react-moment';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import swal from 'sweetalert';

import { Card, Typography, TextField, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ReplyIcon from '@material-ui/icons/Reply';

const styles = {
    button: {
        backgroundColor: '#fff9e6',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: 'rgb(69, 109, 109);',
            color: '#fff9e6'
        }
    },
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
        height: '52vh',
        textAlign: 'center',
    },
    textField: {
        marginTop: '1rem',
        width: '90%',
        backgroundColor: '#fff9e6',
    },
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
            mail_sent: true,
        }
    }//end local state

    //get all messages for specific user upon page load
    componentDidMount() {
        this.props.dispatch({ type: 'GET_MESSAGES' })
    }
    //dispatches messageObj to saga for post route
    addMessage = (event) => {
        event.preventDefault();
        swal("Success!", "Your Message Was Sent!", "success");
        this.props.dispatch({ type: 'ADD_MESSAGE', payload: this.state.messageObj })
        this.setState({ show: false })
    }//end addMessage

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
        this.setState({ show: true, messageObj: { forum_id: id, sent_to_user_id: user_id, mail_sent: true, } });
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


                        <form className={classes.form}>
                            <TextField
                                label="Subject"
                                type="text"
                                onChange={(event) => this.handleModalChange('subject', event)}
                                className={classes.textField}
                            />
                            <br></br><br></br>
                            <TextField
                                label="Message"
                                type="text"
                                multiline
                                className={classes.textField}
                                onChange={(event) => this.handleModalChange('message', event)}
                            />
                            <br></br>
                            <br></br>
                            <Button
                                onClick={this.addMessage}>Save</Button>
                        </form>
                    </Card>
                </Modal>
            </div>
        )
    }
}





export default connect(mapStoreToProps)(withStyles(styles)(Messages));
