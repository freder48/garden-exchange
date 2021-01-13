import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActionArea, CardContent, Typography, TextField, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


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
        margin: 'auto',
        width: '60%',
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
        letterSpacing: '5px'

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

    state = {
        supportMessage: {
            name: '',
            email: '',
            subject: '',
            message: '',
            message_sent: true,
        }
    }

    handleSubmit = (event) => {
        console.log('clicked')
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_SUPPORT', payload: this.state.supportMessage })
        this.setState({
            supportMessage: {
                name: '',
                email: '',
                subject: '',
                message: '',
                message_sent: true,
            }
        })
    }

    handleChange = (inputValue, event) => {
        event.preventDefault();
        this.setState({
            supportMessage: {
                ...this.state.supportMessage,
                [inputValue]: event.target.value
            }
        })//end setState
        console.log(event.target.value);


    }//end handleChange

    render() {

        const { classes } = this.props;

        return (
            <div className="support">
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.header}>
                                How can I support you?
                           </Typography>
                            <form>

                                <TextField
                                    label="name"
                                    type="text"
                                    id="filled-required"
                                    className={classes.textField}
                                    variant="filled"
                                    name="name"
                                    value={this.state.supportMessage.name}
                                    onChange={(event) => this.handleChange('name', event)}
                                />
                                <br></br>
                                <br></br>

                                <TextField
                                    label="email"
                                    id="filled-required"
                                    variant="filled"
                                    required
                                    className={classes.textField}
                                    type="text"
                                    name="email"
                                    value={this.state.supportMessage.email}
                                    onChange={(event) => this.handleChange('email', event)}
                                />
                                <br></br>
                                <br></br>

                                <TextField
                                    label="subject"
                                    type="text"
                                    required
                                    id="filled-required"
                                    className={classes.textField}
                                    variant="filled"
                                    name="subject"
                                    value={this.state.supportMessage.subject}
                                    onChange={(event) => this.handleChange('subject', event)}
                                />
                                <br></br>
                                <br></br>

                                <TextField
                                    label="message"
                                    id="filled-required"
                                    variant="filled"
                                    required
                                    multiline
                                    rows={4}
                                    className={classes.textField}
                                    type="textarea"
                                    name="Message"
                                    value={this.state.supportMessage.message}
                                    onChange={(event) => this.handleChange('message', event)}
                                />
                                <br></br>
                                <br></br>

                                <Button
                                    onClick={this.handleSubmit}
                                    className={classes.button}
                                    variant="outlined"
                                   >Submit
                                </Button>
                            </form>

                        </CardContent>
                    </CardActionArea>

                </Card>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({ reduxState });

export default connect(mapReduxStateToProps)(withStyles(styles)(SupportForm));
