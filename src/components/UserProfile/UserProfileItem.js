import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Moment from 'react-moment';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@material-ui/core';
import swal from 'sweetalert';

class UserProfileItem extends Component {
    state = {
        editListing: {
            have: null,
            want: null,
            location: null,
        },
        isEditable: false,
    }
    cancelButton = () => {
        this.setState({ isEditable: false, });
        this.props.dispatch({ type: 'GET_USER_LISTING' })
    }

    //get all listings for specific user upon page load
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_LISTING' })
    }

    componentDidUpdate(prevProps) {
        if (this.props.store.details.have !== prevProps.have && this.state.editListing.have === null
            || this.props.store.details.want !== prevProps.want && this.state.editListing.want === null
            || this.props.store.details.location !== prevProps.location && this.state.editListing.location === null) {
            this.setState({
                editListing: {
                    have: this.props.store.details.have,
                    want: this.props.store.details.want,
                    location: this.props.store.details.location
                }
            })
        }
    }


    deleteListing(id) {

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
                    this.props.dispatch({ type: 'DELETE_LISTING', payload: id })
                }
            });
    }

    editListing = (id) => {
        this.setState({
            isEditable: true,
        });
        this.props.dispatch({ type: 'GET_DETAILS', payload: id })
    }

    handleChange = (inputValue, event) => {
        this.setState({
            editListing: {
                ...this.state.editListing,
                [inputValue]: event.target.value
            }
        })//end setState
        console.log(event.target.value)
    }

    saveEditedListing = () => {
        console.log('updated listing', this.state.editListing)
        this.props.dispatch({ type: 'UPDATE_LISTING', payload: this.state.editListing })
        this.setState({
            editListing: {
                have: '',
                want: '',
                location: '',
            },
            isEditable: false, 
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                {JSON.stringify(this.state.editListing)}
                {this.state.isEditable ?
                    <>
                        <td> <TextField
                            variant="filled"
                            // className={classes.textField}
                            value={this.state.editListing.have}
                            onChange={(event) => this.handleChange('have', event)}
                        /></td>

                        <td> <TextField
                            variant="filled"
                            // className={classes.textField}
                            value={this.state.editListing.want}
                            onChange={(event) => this.handleChange('want', event)}
                        /></td>

                        <td> <TextField
                            variant="filled"
                            // className={classes.textField}
                            value={this.state.editListing.location}
                            onChange={(event) => this.handleChange('location', event)}
                        /></td>
                        <td><Moment format='MM/DD/YYYY'>{this.props.listing.date}</Moment></td>
                        <td>
                            <button onClick={this.cancelButton} >Cancel</button>
                            <button onClick={this.saveEditedListing}>Save</button>
                        </td>
                        <td><DeleteOutlinedIcon

                            onClick={() => { this.deleteListing(this.props.listing.id) }}>
                        </DeleteOutlinedIcon></td>

                    </>
                    :
                    <>
                        <td>{this.props.listing.have}</td>
                        <td>{this.props.listing.want}</td>
                        <td>{this.props.listing.location}</td>
                        <td><Moment format='MM/DD/YYYY'>{this.props.listing.date}</Moment></td>
                        <td>Edit<EditIcon onClick={() => this.editListing(this.props.listing.id)}></EditIcon></td>
                        <td>Delete <DeleteOutlinedIcon
                            onClick={() => { this.deleteListing(this.props.listing.id) }}>

                        </DeleteOutlinedIcon></td>
                    </>
                }





            </>
        );
    }
}

export default connect(mapStoreToProps)(UserProfileItem);
