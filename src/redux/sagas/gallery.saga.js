import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* gallerySaga() {
  yield takeLatest('GET_GALLERY', getGallery);
  yield takeLatest('ADD_GALLERY', addGallery);
  yield takeLatest('DELETE_LISTING_ADMIN', deleteListing);
}

//POST saga for new gallery item
function* addGallery(action) {
    try {
        console.log('gallery payload is', action.payload);
        yield axios.post('api/gallery', action.payload)
        yield put({ type: 'GET_GALLERY' })
    } catch (error) {
        console.log('error with add gallery request in gallery.saga.js', error);
    }
}//end addGallery

//GETting all of the postings for ForumPage and Admin
function* getGallery() {
    try {
        const response = yield axios.get(`api/gallery` )
        yield put({ type: 'SET_GALLERY', payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log('error with gallery get request in gallery.saga.js', error);
    }
}//end getForum

//admin delete route
function* deleteListing(action){
    console.log('delete listing', action.payload);
    try{
        yield axios.delete(`/api/profile/${action.payload}`)
        yield put({type: 'GET_FORUM'})
    } catch (error) {
        console.log('error with delete request in forum.saga.js', error)
    }
}//end deleteListing


export default gallerySaga;