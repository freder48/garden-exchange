import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* profileSaga() {
  yield takeLatest('GET_USER_LISTING', getUserListing);
  yield takeLatest('DELETE_LISTING', deleteListing);

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


export default profileSaga;