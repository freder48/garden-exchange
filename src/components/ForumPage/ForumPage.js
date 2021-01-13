import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Modal from '../Modal/Modal';
import { Card, Typography, TextField, CardContent, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Moment from 'react-moment';
import './ForumPage.css'

const styles = {
  button: {
    backgroundColor: '#fff9e6',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: 'rgb(69, 109, 109);',
      color: '#fff9e6'
    }
  },
  header: {
    paddingLeft: '20px',
    paddingRight: '100px',
    letterSpacing: '5px',
    fontFamily: 'Copperplate',
    fontSize: '36px',
  },
  headerContainer: {
    width: '92%',
    textAlign: 'center',
    margin: 'auto',
    marginTop: '20px',
    marginBottom: '20px',
    padding: '2rem',
    backgroundColor: "#c78b50",
    border: '3px solid #fff9e6',
  },
  headerFloat: {
    float: 'left',
  },
  search: {
    width: '60%',
    justifyContent: 'center',
    backgroundColor: '#fff9e6',
    marginTop: '20px',
    height: '30px',
  },

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
      subject: '',
      message: '',
      mail_sent: true,
    }
  }//end local state

  //cancel button on search input
  cancelSearch = () => {
    this.setState({ search: '' })
  }

  //get all listings on page load
  componentDidMount() {
    this.props.dispatch({ type: 'GET_FORUM' })
  }

  //hides pop-up modal by setting local state show to false
  hideModal = () => {
    this.setState({ show: false });
  };

  //search bar
  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword })
  }

  //displays message form if show in local state is set to true
  showModal = (id, user_id) => {
    this.setState({ show: true, messageObj: { forum_id: id, sent_to_user_id: user_id, mail_sent: true, } });

  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <section className={classes.headerContainer}>
          <div className={classes.headerFloat}>
            <h1 className={classes.header}>Forum</h1>
          </div>
          <div>
            <input
              placeholder="Search"
              type="text"
              className={classes.search}
              label="Search"
              onChange={(e) => this.searchSpace(e)}
              value={this.state.search} />

            <Button
              onClick={this.cancelSearch}
              className={classes.button}>
              Cancel
            </Button>
          </div>
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

        <Modal show={this.state.show} handleClose={this.hideModal} showModal={this.showModal} messageObj={this.state.messageObj} />


      </>
    )
  }
}



export default connect(mapStoreToProps)(withStyles(styles)(ForumPage));