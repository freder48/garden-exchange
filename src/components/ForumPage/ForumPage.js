import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Modal from '../Modal/Modal';
import Moment from 'react-moment';
import './ForumPage.css'

class ForumPage extends Component {
  state = {
    //for search bar input
    search: null,
    //for pop-up dialog form
    show: false,
    messageObj: {
      sent_to_user_id: '',
      sent_from_user_id: `${this.props.store.user.id}`,
      forum_id: '',
    }
  }//end local state

  //get all listings on page load
  componentDidMount() {
    this.props.dispatch({ type: 'GET_FORUM' })
  }

  handleModalChange = (inputValue, event) => {
    this.setState({
      newListing: {
        ...this.state.newListing,
        [inputValue]: event.target.value
      }
    })//end setState
    this.props.dispatch({ type: 'SET_MESSAGE', payload: [message] })
    console.log('Message is:', message);
  }//end handleModalChange

  showModal = (id, user_id) => {
    this.setState({ show: true, messageObj: {forum_id: id, sent_to_user_id: user_id} });
    console.log(user_id)
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <>
      {JSON.stringify(this.props.store.forum)}
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
                  <td onClick={()=>this.showModal(post.id, post.user_id)}><MailOutlineIcon /></td>
                </tr>

              )
            })
            }

          </tbody>
        </table>

        <Modal show={this.state.show} handleClose={this.hideModal}>
          <h3>Send Message: </h3>
          <label type="text">Message:</label>
          <input onChange={(event) => this.handleModalChange('message', event)} type="text" />
        </Modal>
      </>
    )
  }
}



export default connect(mapStoreToProps)(ForumPage);