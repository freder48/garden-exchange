import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@material-ui/core';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AddListing extends Component {
    state = {
        newListing: {
            have: '',
            want: '',
            location: '',
        },
    }


    render() {
        const { classes } = this.props;
        return (
            <>
                <Grid>
                    <Card className={classes.card} >
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h2" className={classes.header}>
                                Add Listing
                        </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </>

        )
    }
}


export default connect(mapStoreToProps)(withStyles(styles)(AddListing));

