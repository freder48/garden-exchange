import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@material-ui/core';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AddListing extends Component {
    state = {
        newListing:  {
            have: '',
            want: '',
            location: '',
        },
    }

   
    render() {
        const { classes } = this.props;
        return (
            <>

               
            </>

        )
    }
}


export default connect(mapStoreToProps)(withStyles(styles)(AddListing));

