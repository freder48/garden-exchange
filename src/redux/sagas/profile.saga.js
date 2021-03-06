import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* profileSaga() {
  yield takeLatest('GET_USER_LISTING', getUserListing);
  yield takeLatest('DELETE_LISTING', deleteListing);
  yield takeLatest('GET_DETAILS', getDetails);
  yield takeLatest('UPDATE_LISTING', updateListing);
  yield takeLatest('UPDATE_USER_EMAIL_NOTIFICATIONS', updateEmailNotifications);
  yield takeLatest('GET_USER_GALLERY', getUserGallery);

}

//DELETE posts for logged in user
function* deleteListing(action){
    try{
        yield axios.delete(`/api/profile/${action.payload}`)
        yield put({type: 'GET_USER_LISTING'})
    } catch (error) {
        console.log('error with delete request in profile.saga.js', error)
    }
}//end deleteListing

function* getDetails(action) {
    try {
        const response = yield axios.get(`/api/profile/${action.payload}`)
        yield put({ type: 'SET_DETAILS', payload: response.data });
    } catch (error) {
        console.log('error with user listing details get request', error);
    }
}//end getDetails

//GET all of the posts from specific user
function* getUserGallery() {
    try {
        const response = yield axios.get(`api/gallery/user` )
        yield put({ type: 'SET_GALLERY', payload: response.data });
    } catch (error) {
        console.log('error with user gallery get request in profile.saga.js', error);
    }
}//end getUserListing

//GET all of the posts from specific user
function* getUserListing() {
    try {
        const response = yield axios.get(`api/profile` )
        yield put({ type: 'SET_FORUM', payload: response.data });
    } catch (error) {
        console.log('error with forum get request in profile.saga.js', error);
    }
}//end getUserListing

//PUT ROUTE to update
function* updateEmailNotifications(action) { 
    console.log('action.payload', action.payload)
    try {
        yield axios.put(`/api/profile`, action.payload)
        yield put({ type: 'FETCH_USER'});
    } catch (error) {
        console.log('error with emailNotification put in profile.saga.js request', error);
    }
}//end updateEmailNotifications

//PUT ROUTE 
function* updateListing(action) { 
    try {
        yield axios.put(`/api/profile/${action.payload.id}`, action.payload)
        yield put({ type: 'GET_USER_LISTING'});
    } catch (error) {
        console.log('error with put in profile.saga.js request', error);
    }
}//end updateListing




export default profileSaga;