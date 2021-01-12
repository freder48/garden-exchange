import './Modal.css';
import React, { Component } from 'react';
import { Card, Button, Typography, TextField, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';

const styles = {
  button: {
    // backgroundColor: '#fff9e6',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: 'rgb(69, 109, 109);',
      color: '#fff9e6'
    }
  },
  card: {
    position: 'fixed', 
    width: '60%',
    top:'50%',
    left:'50%',
    height: '70vh',
    justifyContent: 'center',
    transform: 'translate(-50%,-50%)',
    padding: '2em',
    backgroundColor: '#7e9a9a',
    border: '20px solid white',
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
    show: false,
  }

  //dispatches messageObj to saga for post route
  addMessage = (event) => {
    event.preventDefault();
    swal("Success!", "Your Message Was Sent!", "success");
    this.props.handleClose();
    this.props.dispatch({ type: 'ADD_MESSAGE', payload: this.state.messageObj })

  }

  //gets input values on pop-up modal and sets local state
  handleModalChange = (inputValue, event) => {
    this.setState({
      messageObj: {
        ...this.state.messageObj,
        [inputValue]: event.target.value,
        sent_from_user_id: `${this.props.store.user.id}`,
        sent_to_user_id: `${this.props.messageObj.sent_to_user_id}`,
        forum_id: `${this.props.messageObj.forum_id}`,

      },

    })
  }//end handleModalChange



  render() {
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    const { classes } = this.props;

    return (

      <div className={showHideClassName}>
        <Card className={classes.card}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.header}>
            Send Message:
           </Typography>

          <CardContent>

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

              <Button type="button" onClick={this.props.handleClose}>
                Close
             </Button>
             <Button className={classes.button}
             onClick={this.addMessage}>
             Save
             </Button>
            </form>

          </CardContent>
        </Card>

      </div>
    );
  }
};

export default connect(mapStoreToProps)(withStyles(styles)(Modal));