import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActionArea, CardContent, Typography, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from 'sweetalert';

const styles = {
    button: {
        backgroundColor: '#fff9e6',
        border: '2px solid #c78b50',
        marginTop: '15px',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: 'rgb(69, 109, 109);',
            color: '#fff9e6'
        }
    },
    card: {
        margin: 'auto',
        width: '70%',
        height: '100%',
        marginTop: '4em',
        justifyContent: 'center',
        backgroundColor: '#7e9a9a',
        border: '20px solid white'
    },
    header: {
        backgroundColor: "#c78b50",
        margin: "auto",
        width: "80&",
        textAlign: "center",
        padding: "3rem",
        border: '3px solid #fff9e6',
        letterSpacing: '5px',
        fontFamily: 'Copperplate',
    },
    textField: {
        marginTop: '1rem',
        width: '90%',
        backgroundColor: '#fff9e6',
    },
    form: {
        textAlign: 'center',
    }
};

class SupportForm extends Component {
    //local state
    state = {
        supportMessage: {
            sent_to_user_id: 1,
            sent_from_user_id: this.props.store.user.id,
            forum_id: null,
            subject: '',
            message: '',
            mail_sent: true,
        },
    }
    //addMessage for support form
    addMessage = (event) => {
        event.preventDefault();
        this.setState({
            supportMessage: {
                subject: '',
                message: '',
                forum_id: null,
                sent_from_user_id: this.props.store.user.id,
                sent_to_user_id: 1,
            }
        })
        this.props.dispatch({ type: 'ADD_MESSAGE', payload: this.state.supportMessage })
        //sweetAlert success message
        swal('Success, your feedback was sent!', {
            icon: "success",
            buttons: {
                cancel: "Send More Feedback",
                forum: {
                    text: "Back to Forum",
                    value: "back"
                }
            }
        }).then((value) => {
            if (value === "back") {
                this.props.history.push('/forum')
            } else {
                this.setState({
                    supportMessage: {
                        subject: '',
                        message: '',
                        sent_from_user_id: this.props.store.user.id,
                        sent_to_user_id: 1,
                    },
                })
            }
        })
    }
    //handle input change
    handleChange = (inputValue, event) => {
        event.preventDefault();
        this.setState({
            supportMessage: {
                ...this.state.supportMessage,
                [inputValue]: event.target.value
            }
        })//end setState
    }//end handleChange

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.header}>
                            How can I support you?
                           </Typography>
                        <form className={classes.form}>
                            <TextField
                                label="Subject"
                                type="text"
                                value={this.state.supportMessage.subject}
                                onChange={(event) => this.handleChange('subject', event)}
                                className={classes.textField}
                            />
                            <br></br><br></br>
                            <TextField
                                label="Message"
                                type="text"
                                multiline
                                rows={5}
                                value={this.state.supportMessage.message}
                                className={classes.textField}
                                onChange={(event) => this.handleChange('message', event)}
                            />
                            <br></br>
                            <CardActionArea>
                                <Button className={classes.button}
                                    onClick={this.addMessage}>
                                    Send
                           </Button>
                            </CardActionArea>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(SupportForm));
