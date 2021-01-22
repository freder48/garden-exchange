import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Moment from 'react-moment';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { TextField, Button } from '@material-ui/core';
import swal from 'sweetalert';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    button: {
        backgroundColor: '#fff9e6',
        minWidth: '60px',
        width: '25%',
        marginLeft: '0',
        border: '2px solid #c78b50',
        '&:hover': {
            backgroundColor: 'rgb(69, 109, 109);',
            color: '#fff9e6'
        },
    },
    cancelButton: {
        width: '20%',
        marginLeft: '1%',
    },
    icon: {
        paddingRight: '5px',
    },
}


class UserProfileItem extends Component {
    state = {
        editListing: {
            have: null,
            want: null,
            location: null,
            id: null,
        },
        //if this is flipped to true input boxes render to edit
        isEditable: false,
    }
    //cancels edits sets back to original values
    cancelButton = () => {
        this.setState({ isEditable: false, });
        this.props.dispatch({ type: 'GET_USER_LISTING' })
    }

    //get all listings for specific user upon page load
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_LISTING' })
    }

    //compares what is in the redux store to local state to render values
    componentDidUpdate(prevProps) {
        if (this.props.store.details.have !== prevProps.have && this.state.editListing.have === null
            || this.props.store.details.want !== prevProps.want && this.state.editListing.want === null
            || this.props.store.details.location !== prevProps.location && this.state.editListing.location === null
            || this.props.store.details.id !== prevProps.id && this.state.editListing.id === null) {
            this.setState({
                editListing: {
                    have: this.props.store.details.have,
                    want: this.props.store.details.want,
                    location: this.props.store.details.location,
                    id: this.props.store.details.id
                }
            })
        }
    }

    //deletes item by id
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
    }//end deleteListing

    //changes isEditable to true and gets the details for specific row clicked on
    editListing = (id) => {
        this.setState({
            isEditable: true,
        });
        this.props.dispatch({ type: 'GET_DETAILS', payload: id })
        console.log('id is', id)
    }

    //handles input values
    handleChange = (inputValue, event) => {
        this.setState({
            editListing: {
                ...this.state.editListing,
                [inputValue]: event.target.value
            }
        })//end setState
    }

    //dispatches to saga to start put route
    saveEditedListing = (id) => {
        this.props.dispatch({ type: 'UPDATE_LISTING', payload: this.state.editListing })
        this.setState({
            isEditable: false,
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                {this.state.isEditable ?
                    <>
                        <td> <TextField
                            variant="filled"
                            // className={classes.textField}
                            // value={this.state.editListing.have}
                            placeholder={this.props.store.details.have}
                            onChange={(event) => this.handleChange('have', event)}
                        /></td>

                        <td> <TextField
                            variant="filled"
                            // className={classes.textField}
                            // value={this.state.editListing.want}
                            placeholder={this.props.store.details.want}
                            onChange={(event) => this.handleChange('want', event)}
                        /></td>

                        <td> <TextField
                            variant="filled"
                            // className={classes.textField}
                            // value={this.state.editListing.location}
                            placeholder={this.props.store.details.location}
                            onChange={(event) => this.handleChange('location', event)}
                        /></td>
                        <td><Moment format='MM/DD/YYYY'>{this.props.listing.date}</Moment></td>
                        <td className={classes.btnContainer}>
                            <center>
                                <Button
                                    onClick={this.cancelButton}
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.cancelButton}
                                >Cancel
                             </Button>
                                <Button
                                    onClick={() => this.saveEditedListing(this.props.listing.id)}
                                    variant="outlined"
                                    className={classes.button}
                                > Save
                            </Button>
                            </center>
                        </td>

                        <td><Button onClick={() => { this.deleteListing(this.props.listing.id) }}>
                            <DeleteOutlinedIcon className={classes.icon} />
                            Delete
                            </Button>
                        </td>

                    </>
                    :
                    <>
                        <td>{this.props.listing.have}</td>
                        <td>{this.props.listing.want}</td>
                        <td>{this.props.listing.location}</td>
                        <td><Moment format='MM/DD/YYYY'>{this.props.listing.date}</Moment></td>

                        <td><Button
                            onClick={() => this.editListing(this.props.listing.id)}>
                            <EditIcon className={classes.icon} />
                            Edit
                            </Button>
                        </td>

                        <td><Button onClick={() => { this.deleteListing(this.props.listing.id) }}>
                            <DeleteOutlinedIcon className={classes.icon} />
                            Delete
                            </Button>
                        </td>
                    </>
                }
            </>
        );
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(UserProfileItem));
