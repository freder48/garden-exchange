import './Modal.css';
import React, { Component } from 'react';
import { Card, Button, Typography, TextField, CardContent, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';

const styles = {
  button: {
    backgroundColor: '#fff9e6',
    border: '2px solid #c78b50',
    marginRight: '15px',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: 'rgb(69, 109, 109);',
      color: '#fff9e6'
    }
  },
  card: {
    position: 'fixed',
    width: '60%',
    top: '50%',
    left: '48%',
    height: '50%',
    justifyContent: 'center',
    textAlign: 'center',
    transform: 'translate(-50%,-50%)',
    padding: '5%',
    backgroundColor: '#7e9a9a',
    border: '20px solid white',
    margin: 'auto',
  },

  header: {
    backgroundColor: "#c78b50",
    margin: "auto",
    width: "80%",
    textAlign: "center",
    padding: "8%",
    border: '3px solid #fff9e6',
    letterSpacing: '5px',
    fontFamily: 'Copperplate'
  },
  form: {
    height: '52vh',
    textAlign: 'center'
  },
  textField: {
    marginTop: '1rem',
    width: '90%',
    backgroundColor: '#fff9e6',
  },
}

class Modal extends Component {
  state = {
    messageObj: {
      sent_to_user_id: '',
      sent_from_user_id: '',
      forum_id: '',
      subject: '',
      message: '',
      mail_sent: true,

    },
    //if inputs are empty the booleans will flip to true, error & helperText on inputs
    show: false,
    subjectError: false,
    subjectErrorText: '',
    messageError: false,
    messageErrorText: '',
  }

  //dispatches messageObj to saga for post route + sweetAlert success message
  addMessage = (event) => {
    // event.preventDefault();
    if (this.state.messageObj.subject === '') {
      this.setState({ subjectError: true, subjectErrorText: 'This field is required' })
    } if (this.state.messageObj.message === '') {
      this.setState({ messageError: true, messageErrorText: 'This field is required' })
    } else {
      //sweetAlert success message
      swal("Success!", "Your Message Was Sent!", "success");
      this.props.handleClose();
      // this.componentDidUpdate();
      this.props.dispatch({ type: 'ADD_MESSAGE', payload: this.state.messageObj })
      //clear state
      this.setState({
        messageObj: {
          sent_to_user_id: '',
          sent_from_user_id: '',
          forum_id: '',
          subject: '',
          message: '',
          mail_sent: true,
        },
      })
    }
  }

  //gets input values on pop-up modal and sets local state
  handleModalChange = (inputValue, event) => {
    // this.props.dispatch({ type: 'GET_EMAIL', payload: this.state.messageObj.sent_to_user_id })
    this.setState({
      messageObj: {
        ...this.state.messageObj,
        [inputValue]: event.target.value,
        sent_from_user_id: `${this.props.store.user.id}`,
        sent_to_user_id: `${this.props.messageObj.sent_to_user_id}`,
        forum_id: `${this.props.messageObj.forum_id}`,
        // sent_to_user_email: `${this.props.store.email.email}`
      },
    })
  }//end handleModalChange

  render() {
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    const { classes } = this.props;

    return (
      <div className={showHideClassName}>
        <Grid container>
          <Card className={classes.card} item={12}>
            <Typography gutterBottom variant="h5" component="h2" className={classes.header}>
              Send Message:
           </Typography>

            <CardContent>
              <form className={classes.form}>
                <TextField
                  required
                  error={this.state.subjectError}
                  helperText={this.state.subjectErrorText}
                  label="Subject"
                  type="text"
                  value={this.state.messageObj.subject}
                  onChange={(event) => this.handleModalChange('subject', event)}
                  className={classes.textField}
                />
                <br></br><br></br>
                <TextField
                  required
                  error={this.state.messageError}
                  helperText={this.state.messageErrorText}
                  label="Message"
                  type="text"
                  value={this.state.messageObj.message}
                  multiline
                  rows="5"
                  className={classes.textField}
                  onChange={(event) => this.handleModalChange('message', event)}
                />
                <br></br>
                <br></br>
                <Button
                  type="button"
                  onClick={this.props.handleClose}
                  className={classes.button}>
                  Close
             </Button>
                <Button className={classes.button}
                  onClick={this.addMessage}>
                  Save
             </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
};

export default connect(mapStoreToProps)(withStyles(styles)(Modal));