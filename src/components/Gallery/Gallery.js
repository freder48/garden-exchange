import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import GalleryItem from './GalleryItem';

// Filestack
import { PickerOverlay } from 'filestack-react';
import mapStoreToProps from "../../redux/mapStoreToProps";

// dotenv
const filestackApiKey = process.env.REACT_APP_FILESTACK_API_KEY



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
      newItem: {
        description: '',
      },
      imageUpload: !this.state.imageUpload
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

    return (
      <div>
        <form >
          <TextField
            id="outlined-basic"
            label="description"
            variant="outlined"
            onChange={(event) => this.handleChangeFor(event, `description`)}
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              backgroundColor: "white",
            }}
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
            <Button variant="contained" color="primary" onClick={this.upload}>Choose File</Button>

          }

          <Button onClick={(event) => this.handleSubmit(event)} variant="contained" color="primary" type="submit">
            Add Item
          </Button>

          <section>
            {this.props.store.gallery.map((gallery) =>
              <>
                <GalleryItem gallery={gallery}/>
              </>

            )}
          </section>



        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Gallery);
