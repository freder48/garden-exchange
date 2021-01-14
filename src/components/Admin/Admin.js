//imports //imports JUST the component from react not ALL of react 
import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, 
    Paper, 
} from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Moment from 'react-moment';

//class
class Admin extends Component{
    state = {
        direction: 'default'
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_FORUM', payload: this.state.direction})
        this.props.dispatch({type: 'GET_SUPPORT'})
    }

    deleteItem(id){
        console.log('id', id)
        this.props.dispatch({type: 'DELETE_ADMIN',  payload: id})
        // this.props.dispatch({ type: 'GET_FORUM', payload: this.state.direction})
    }

    deleteSupport(id){
        console.log('id', id)
        this.props.dispatch({type: 'DELETE_SUPPORT',  payload: id})
        this.props.dispatch({ type: 'GET_SUPPORT'})
    }


    
    render(){
        const StyledTableCell = withStyles((theme) => ({
            head: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        }))(TableCell);
        return(
            <>
            <h1>admin</h1>
             <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Have</StyledTableCell>
                                <StyledTableCell align="left">Want</StyledTableCell>
                                <StyledTableCell align="left">Location </StyledTableCell>
                                <StyledTableCell align="left">Date Posted</StyledTableCell>
                                <StyledTableCell align="left">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.props.reduxState.forum.map((post) => {
                        
                                return (

                                    <TableRow key={post.id}>
                                        <TableCell>{post.have}</TableCell>
                                        <TableCell>{post.want}</TableCell>
                                        <TableCell>{post.location}</TableCell>
                                        <TableCell><Moment format='MM/DD/YYYY'>{post.date}</Moment></TableCell>
                                        <TableCell><DeleteOutlinedIcon onClick={()=> {this.deleteItem(post.id)}}>
                                                </DeleteOutlinedIcon></TableCell>
                                    </TableRow>
                                )
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer>
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
                </TableContainer>  
                
            </>
        ) //end return 
    } //end render
} //end class 

//export
const mapReduxStateToProps = (reduxState) => ({ reduxState });

export default connect(mapReduxStateToProps)(Admin);