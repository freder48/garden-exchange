import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Modal from '../Modal/Modal';
import {Card, Typography,} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Moment from 'react-moment';
import './ForumPage.css'

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

class ForumPage extends Component {
  state = {
    //for search bar input
    search: null,
    //for pop-up dialog form
    show: false,
    messageObj: {
      sent_to_user_id: '',
      sent_from_user_id: '',
      forum_id: '',
      message: '',
    }
  }//end local state

  //get all listings on page load
  componentDidMount() {
    this.props.dispatch({ type: 'GET_FORUM' })
  }

  //dispatches messageObj to saga for post route
  addMessage = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_MESSAGE', payload: this.state.messageObj })
  }

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
      <>
        <section>
          <label>Search: </label>
          <input type="text" onChange={(e) => this.searchSpace(e)} />
        </section>


        <table>
          <thead>
            <tr>
              <th>Have</th>
              <th>Want</th>
              <th>Location</th>
              <th>Date Posted</th>
              <th>Message</th>
            </tr>
          </thead>

          <tbody>
            {this.props.store.forum.filter((post) => {
              if (this.state.search == null)
                return post
              else if (post.have.toLowerCase().includes(this.state.search.toLowerCase())
                || post.want.toLowerCase().includes(this.state.search.toLowerCase())
                || post.location.toLowerCase().includes(this.state.search.toLowerCase())) {
                return post
              }
            }).map(post => {
              return (

                <tr key={post.id}>
                  <td>{post.have}</td>
                  <td>{post.want}</td>
                  <td>{post.location}</td>
                  <td><Moment format='MM/DD/YYYY'>{post.date}</Moment></td>
                  <td onClick={() => this.showModal(post.id, post.user_id)}><MailOutlineIcon /></td>
                </tr>

              )
            })
            }

          </tbody>
        </table>

        <Modal show={this.state.show} handleClose={this.hideModal}>
          <Card className={classes.card}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.header}>
           Send Message:
           </Typography>

          <label type="text">Message:</label>
          <form onSubmit={this.addMessage} className={classes.form}>
            <textarea onChange={(event) => this.handleModalChange('message', event)} type="text" />
            <button>Save</button>
          </form>
          </Card>
        </Modal>
      </>
    )
  }
}



export default connect(mapStoreToProps)(withStyles(styles)(ForumPage));