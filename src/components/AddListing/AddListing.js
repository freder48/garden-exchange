import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@material-ui/core';
import mapStoreToProps from '../../redux/mapStoreToProps';

const styles = {
    
}

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
                            <form onSubmit={this.handleSubmit} className={classes.form}>

                                <TextField

                                    label="Have"
                                    variant="filled"
                                    required
                                    className={classes.textField}
                                    value={this.state.newListing.have}
                                    onChange={(event) => this.handleChange('have', event)}
                                />


                                <br></br>
                                <br></br>

                                <TextField
                                    required
                                    label="Want"
                                    variant="filled"
                                    className={classes.textField}
                                    value={this.state.newListing.want}
                                    onChange={(event) => this.handleChange('want', event)}
                                />

                                <br></br>
                                <br></br>
                                <TextField
                                    required
                                    label="Location"
                                    variant="filled"
                                    className={classes.textField}
                                    value={this.state.newListing.location}
                                    onChange={(event) => this.handleChange('location', event)}
                                />

                                <br></br>
                                <br></br>

                                <Button
                                    className={classes.button}
                                    onClick={this.handleSubmit}
                                    variant="outlined"
                                >
                                    Submit
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>

            </>

        )
    }
}


export default connect(mapStoreToProps)(withStyles(styles)(AddListing));

