import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@material-ui/core';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from 'sweetalert';

const styles = {
    button: {
        backgroundColor: '#fff9e6',
        border: '2px solid #c78b50',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: 'rgb(69, 109, 109);',
            color: '#fff9e6'
        }
    },
    card: {
        margin: 'auto',
        width: '60%',
        height: '100%',
        marginTop: '3%',
        justifyContent: 'center',
        backgroundColor: '#7e9a9a',
        border: '20px solid white'
    },
    form: {
        textAlign: 'center',
        width: '100%',
    },
    header: {
        backgroundColor: "#c78b50",
        margin: " auto",
        width: "80%",
        textAlign: "center",
        padding: "5%",
        border: '3px solid #fff9e6',
        letterSpacing: '5px',
        fontFamily: 'Copperplate'
    },
    textField: {
        marginTop: '1rem',
        width: '90%',
        backgroundColor: '#fff9e6',
    },
    title: {
        backgroundColor: "#c78b50",
        width: "100%",
        textAlign: "left",
        padding: "1rem",
        paddingLeft: '20px',
        border: '3px solid #fff9e6',
        letterSpacing: '5px',
        fontFamily: 'Copperplate'
    }
}

class AddListing extends Component {
    state = {
        newListing: {
            have: '',
            want: '',
            location: '',
            user_id: `${this.props.store.user.id}`,
        },
        //show if inputs are empty-this is error box and helperText
        haveError: false,
        haveErrorText: '',
        wantError: false,
        wantErrorText: '',
        locationError: false,
        locationErrorText: '',
    }

    //handle input changes
    handleChange = (inputValue, event) => {
        event.preventDefault();
        this.setState({
            newListing: {
                ...this.state.newListing,
                [inputValue]: event.target.value
            }
        })//end setState
    }//end handleChange

    //submit new listing if all inputs are filled, sweetalert success will pop up if so
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.newListing.have === '') {
            this.setState({ haveError: true, haveErrorText: 'This field is required' })
        } if (this.state.newListing.want === '') {
            this.setState({ wantError: true, wantErrorText: 'This field is required' })
        } if (this.state.newListing.location === '') {
            this.setState({ locationError: true, locationErrorText: 'This field is required' })
        } else {
            this.setState({
                haveError: false, wantError: false, locationError: false,
                haveErrorText: '', wantErrorText: '', locationErrorText: '',
            })
            this.props.dispatch({ type: 'ADD_LISTING', payload: this.state.newListing })
            swal('Success, your listing was submitted!', {
                icon: "success",
                buttons: {
                    cancel: "Add Another Listing",
                    forum: {
                        text: "Back to Forum",
                        value: "back"
                    }
                }
            }).then((value) => {
                if (value === "back") {
                    this.props.history.push('/forum')
                } else {
                    this.setState({
                        newListing: {
                            have: '',
                            want: '',
                            location: '',
                            user_id: `${this.props.store.user.id}`,
                        },
                    })
                }
            })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Grid container>
                    <h2 className={classes.title}> New Listing</h2>
                    <Card className={classes.card} >
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h2" className={classes.header}>
                                Add Listing
                            </Typography>
                            <form onSubmit={this.handleSubmit} className={classes.form}>
                                <TextField
                                    error={this.state.haveError}
                                    helperText={this.state.haveErrorText}
                                    label="Have"
                                    required
                                    variant="filled"
                                    className={classes.textField}
                                    value={this.state.newListing.have}
                                    onChange={(event) => this.handleChange('have', event)}
                                />

                                <br></br>
                                <br></br>

                                <TextField
                                    required
                                    error={this.state.wantError}
                                    helperText={this.state.wantErrorText}
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
                                    error={this.state.locationError}
                                    helperText={this.state.locationErrorText}
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

