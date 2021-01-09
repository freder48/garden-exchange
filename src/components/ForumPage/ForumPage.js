import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
// import Modal from '../Modal/Modal';
import Moment from 'react-moment';
import './ForumPage.css'

class ForumPage extends Component {
  state = {
    //for search bar input
    search: null,
    //for pop-up dialog form
    show: false,
  }//end local state

  componentDidMount() {
    this.props.dispatch({ type: 'GET_FORUM' })
  }

  render() {

    return (
      <>
        <section>
          <label>Search: </label>
          <input type="text" onChange={(e) => this.searchSpace(e)} />
        </section>


        <table>
          <thead>

            <th>Have</th>
            <th align="left">Want</th>
            <th align="left">Location</th>
            <th align="left">Date Posted</th>
            <th align="left">Message</th>

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
                  <td onClick={this.showModal}><MailOutlineIcon /></td>
                </tr>

              )
            })
            }

          </tbody>
        </table>

        {/* <Modal show={this.state.show} handleClose={this.hideModal}>
              <h3>Send Message: </h3>
              <label type="text">Message:</label>
              <input onChange={(event) => this.handleModalChange('message', event)} type="text" />
          </Modal> */}
      </>
    )
  }
}



export default connect(mapStoreToProps)(ForumPage);