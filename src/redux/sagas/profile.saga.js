import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* profileSaga() {
  yield takeLatest('GET_USER_LISTING', getUserListing);
  yield takeLatest('DELETE_LISTING', deleteListing);
  yield takeLatest('GET_DETAILS', getDetails);
  yield takeLatest('UPDATE_LISTING', updateListing);

}

//DELETE posts for logged in user
function* deleteListing(action){
    console.log('delete listing', action.payload);
    try{
        yield axios.delete(`/api/profile/${action.payload}`)
        yield put({type: 'GET_USER_LISTING'})
    } catch (error) {
        console.log('error with delete request in profile.saga.js', error)
    }
}//end deleteListing

function* getDetails(action) {
    console.log('EDIT PAYLOAD', action.payload);
    try {
        const response = yield axios.get(`/api/profile/${action.payload}`)
        yield put({ type: 'SET_DETAILS', payload: response.data });
    } catch (error) {
        console.log('error with user listing details get request', error);
    }
}//end getDetails

//GET all of the posts from specific user
function* getUserListing() {
    try {
        const response = yield axios.get(`api/profile` )
        yield put({ type: 'SET_FORUM', payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log('error with forum get request in profile.saga.js', error);
    }
}//end getUserListing

//PUT ROUTE 
function* updateListing(action) {
    console.log('In UPDATE Listing');
    
    console.log('Action Payload', action.payload);
    
    // console.log('index post', action.payload);
    // try {
    //     yield axios.put(`/api/movie/${action.payload.id}`, action.payload)
    //     yield put({ type: 'SET_FORUM'});
    // } catch (error) {
    //     console.log('error with put movie request', error);
    // }
}//end 




export default profileSaga;