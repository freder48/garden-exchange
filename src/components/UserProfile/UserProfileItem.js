import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Moment from 'react-moment';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';

class UserProfileItem extends Component {
    //get all messages for specific user upon page load
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_LISTING' })
    }

    deleteListing(id) {
        this.props.dispatch({ type: 'DELETE_LISTING', payload: id })
        // this.props.dispatch({ type: 'GET_FORUM', payload: this.state.direction})
    }

    render() {
        return (
            <>
                    <td>{this.props.listing.have}</td>
                    <td>{this.props.listing.want}</td>
                    <td>{this.props.listing.location}</td>
                    <td><Moment format='MM/DD/YYYY'>{this.props.listing.date}</Moment></td>
                    <td><EditIcon></EditIcon></td>
                    <td><DeleteOutlinedIcon
                        onClick={() => { this.deleteListing(this.props.listing.id) }}>
                    </DeleteOutlinedIcon></td>
               
            </>
        );
    }
}

export default connect(mapStoreToProps)(UserProfileItem);
