//imports //imports JUST the component from react not ALL of react 
import React, { Component } from 'react';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
    Button, Typography, TextField, Card
} from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Modal from '../Modal/Modal';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import ReplyIcon from '@material-ui/icons/Reply';

const styles = {
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
  }
//class
class Admin extends Component {
    state = {
        //for pop-up dialog form
        show: false,
        
    }//end local state
    componentDidMount() {
        this.props.dispatch({ type: 'GET_FORUM'})
    }

    deleteItem(id) {
        console.log('id', id)
        this.props.dispatch({ type: 'DELETE_LISTING_ADMIN', payload: id })
    }

    // deleteSupport(id) {
    //     console.log('id', id)
    //     this.props.dispatch({ type: 'DELETE_SUPPORT', payload: id })
    //     this.props.dispatch({ type: 'GET_SUPPORT' })
    // }

    render() {
        const { classes } = this.props;
        return (
            <>
                <h1 className={classes.header}>Manage All Listings</h1>
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
                        {this.props.store.forum.map(post => {
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
                                            className={classes.icon}/>
                                                Delete
                                            </Button>
                                    </td>
                                </tr>
                            )
                        })
                        }

                    </tbody>
                </table>


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
                                <td><Button onClick={() => this.showModal(message.forum_id, message.sent_from_user_id)}>
                                    <ReplyIcon className={classes.icon}>
                                    </ReplyIcon>Reply
                                </Button></td>

                                <td><Button onClick={() => { this.deleteMessage(message.id) }}>
                                    <DeleteOutlinedIcon
                                    className={classes.icon}
                                    >
                                </DeleteOutlinedIcon>Delete</Button></td>
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

                {/* <TableContainer>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell align="left">Message</StyledTableCell>
                            <StyledTableCell align="left">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            
                            {this.props.reduxState.message.map((message) => {
                        
                                return (

                                    <TableRow key={message.id}>
                                        <TableCell>{message.name}</TableCell>
                                        <TableCell>{message.email}</TableCell>
                                        <TableCell>{message.description}</TableCell>
                                        <TableCell><Moment format='MM/DD/YYYY'>{message.date}</Moment></TableCell>
                                       <TableCell><DeleteOutlinedIcon onClick={()=> {this.deleteSupport(message.id)}}>
                                                </DeleteOutlinedIcon></TableCell>
                                    </TableRow>
                                )
                            })
                            }
                        </TableBody> 


                    </Table>
                </TableContainer>   */}

            </>
        ) //end return 
    } //end render
} //end class 


export default connect(mapStoreToProps)(withStyles(styles)(Admin));