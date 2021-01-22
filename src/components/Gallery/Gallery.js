import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, TextField, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import GalleryItem from './GalleryItem';

// Filestack
import { PickerOverlay } from 'filestack-react';
import mapStoreToProps from "../../redux/mapStoreToProps";

// dotenv
const filestackApiKey = process.env.REACT_APP_FILESTACK_API_KEY

const styles = {
  addSomethingTitle: {
    paddingLeft: '20px',
  },
  button: {
    backgroundColor: '#fff9e6',
    border: '2px solid #c78b50',
    marginTop: '15px',
    marginRight: '2%',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: 'rgb(69, 109, 109);',
      color: '#fff9e6'
    }
  },
  description: {
    fontFamily: 'default',
  },
  header: {
    backgroundColor: "#c78b50",
    width: "100%",
    textAlign: "left",
    padding: "1rem",
    paddingLeft: '20px',
    border: '3px solid #fff9e6',
    letterSpacing: '5px',
    fontFamily: 'Copperplate',
  },
  form: {
    textAlign: 'center'
  },
  textField: {
    marginTop: '1%',
    marginBottom: '1%',
    width: '80%',
    backgroundColor: 'white',

  },

}

class Gallery extends Component {
  state = {
    newItem: {
      description: "",
      url: "",
    },
    imageUpload: false,
  };

  componentDidMount = () => {
    this.props.dispatch({ type: "GET_GALLERY" })
  }

  handleChangeFor = (event, inputProperty) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        [inputProperty]: event.target.value,
      }

    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "ADD_GALLERY", payload: this.state.newItem });
    this.setState({
      imageUpload: !this.state.imageUpload,
      newItem: {
        description: ' ',
      },

    })
  };

  onSuccess = (result) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        url: result.filesUploaded[0].url,
      }
    })
  }

  onError = (error) => {
    console.error('error', error);
  }

  upload = () => {
    this.setState({
      imageUpload: !this.state.imageUpload
    })
  }


  render() {
    const basicOptions = {
      accept: 'image/*',
      fromSources: ['local_file_system'],
      maxSize: 1024 * 1024,
      maxFiles: 1,
    }
    const { classes } = this.props;
    return (
      <div>
        <section className={classes.header}>
          <h2>Community Gallery</h2>
          <p className={classes.description}>Welcome to the community gallery! A place to peruse and share photos, recipes, and wisdom.</p>
        </section>

        <h4 className={classes.addSomethingTitle}>Add something to the gallery: </h4>

        <form className={classes.form}>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="description"
            value={this.state.newItem.description}
            variant="outlined"
            onChange={(event) => this.handleChangeFor(event, `description`)}

          />
          <br />


          {this.state.imageUpload ?
            <PickerOverlay
              apikey={filestackApiKey}
              buttonText="Upload Photo"
              buttonClass="ui medium button gray"
              options={basicOptions}
              onSuccess={(event) => this.onSuccess(event, 'url')}
              onError={this.onError}
            /> :
            <>
              <Button className={classes.button} variant="contained" onClick={this.upload}>Upload Image</Button>

            </>
          }

          <Button className={classes.button} onClick={(event) => this.handleSubmit(event)} variant="contained" type="submit">
            Add Item
          </Button>


          <section>
            <Grid container spacing={1}>
            {this.props.store.gallery.map((gallery) =>

              <GalleryItem gallery={gallery} />


            )}
            </Grid>
          </section>



        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(Gallery));
