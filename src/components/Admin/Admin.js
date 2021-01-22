//imports //imports JUST the component from react not ALL of react 
import React, { Component } from 'react';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Grid, Card } from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Modal from '../Modal/Modal';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import ReplyIcon from '@material-ui/icons/Reply';
import swal from 'sweetalert';
import TablePagination from '@material-ui/core/TablePagination';

const styles = {
    card: {
        marginTop: '15%',
        margin: '5%',
        justifyContent: 'center',
        backgroundColor: '#7e9a9a',
        border: '20px solid white',
        padding: '20px',
        textAlign: 'center',

    },
    header: {
        backgroundColor: "#c78b50",
        width: "100%",
        textAlign: "left",
        padding: "1rem",
        paddingLeft: '20px',
        border: '3px solid #fff9e6',
        letterSpacing: '5px',
        fontFamily: 'Copperplate'
    },
    icon: {
        paddingRight: '5px',
    },
    link: {
        backgroundColor: '#fff9e6',
        border: '2px solid #c78b50',
        margin: '2%',
        padding: '10px',
        fontFamily: 'Copperplate',
        textDecoration: 'none',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: 'rgb(69, 109, 109);',
            color: '#fff9e6'
        }
    },
}

//class
class Admin extends Component {
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
        },
            //pagination
        page: 0,
        rowsPerPage: 10,
    }//end local state

    //Get all forum listings and support form messages on page load
    componentDidMount() {
        this.props.dispatch({ type: 'GET_FORUM' });
        this.props.dispatch({ type: 'GET_MESSAGES' });
        this.props.dispatch({ type: "GET_GALLERY" });
    }

    //deletes item by id
    deleteGalleryItem(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your post has been deleted!", {
                        icon: "success",
                    });
                    this.props.dispatch({ type: 'DELETE_GALLERY', payload: id })
                }
            });
    }//end deleteListing

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

  //changes page number
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  //changes rows per page based on drop down menu
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

    //hides pop-up modal by setting local state show to false
    hideModal = () => {
        this.setState({ show: false });
    };

    //displays message form if show boolean in local state is set to true
    showModal = (id, user_id) => {
        this.setState({ show: true, messageObj: { forum_id: id, sent_to_user_id: user_id, mail_sent: true, } });
    };

    render() {
        const { classes } = this.props;
        const { rowsPerPage, page } = this.state;
        return (
            <>
                <h2 className={classes.header}>Manage All Listings</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Have</th>
                            <th>Want</th>
                            <th>Location</th>
                            <th>Date Posted</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.props.store.forum.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(post => {
                            return (
                                <tr key={post.id}>
                                    <td>{post.have}</td>
                                    <td>{post.want}</td>
                                    <td>{post.location}</td>
                                    <td><Moment format='MM/DD/YYYY'>{post.date}</Moment></td>
                                    <td>
                                        <Button
                                            onClick={() => { this.deleteItem(post.id) }}>
                                            <DeleteOutlinedIcon
                                                className={classes.icon} />
                                                Delete
                                            </Button>
                                    </td>
                                </tr>
                            )
                        })
                        }

                    </tbody>
                </table>
=               <div className={classes.paginationContainer}><TablePagination
                    className={classes.pagination}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={this.props.store.forum.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                </div>

                <h2 className={classes.header}>Support Messages</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Received At</th>
                            <th>Reply</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>

                        {this.props.store.message.map((message) =>

                            <tr key={message.id}>
                                <td>{message.subject}</td>
                                <td>{message.message}</td>
                                <td><Moment format='hh:mm A, MM/DD/YYYY'>
                                    {message.time_sent}
                                </Moment></td>
                                <td>
                                    <Button
                                        onClick={() => this.showModal(message.forum_id, message.sent_from_user_id)}>
                                        <ReplyIcon className={classes.icon} />
                                   Reply
                                </Button>
                                </td>

                                <td>
                                    <Button onClick={() => { this.deleteMessage(message.id) }}>
                                        <DeleteOutlinedIcon
                                            className={classes.icon} />
                                  Delete
                                  </Button>
                                </td>
                            </tr>

                        )}

                    </tbody>
                </table>

                <Modal
                    show={this.state.show}
                    handleClose={this.hideModal}
                    messageObj={this.state.messageObj}>
                </Modal>

                <h2 className={classes.header}>Manage Gallery</h2>
                <Grid container>

                    {this.props.store.gallery.map((gallery) =>




                        <Grid item xs={12} sm={4} lg={6}>
                            <Card
                                className={classes.card}>
                                <img src={gallery.url} alt={gallery.description}></img>
                                <section className={classes.descriptionContainer}>
                                    <p className={classes.itemDescription}>{gallery.description}</p>
                                    <a href={gallery.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={classes.link}
                                    >Image Link
                                 </a>
                                    <Button
                                        onClick={() => { this.deleteGalleryItem(gallery.id) }}>
                                        <DeleteOutlinedIcon className={classes.icon} />
                            Delete
                            </Button>
                                </section>
                            </Card>

                        </Grid>

                    )}
                </Grid>

            </>
        ) //end return 
    } //end render
} //end class 


export default connect(mapStoreToProps)(withStyles(styles)(Admin));