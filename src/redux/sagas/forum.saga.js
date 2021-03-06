import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* forumSaga() {
  yield takeLatest('GET_FORUM', getForum);
  yield takeLatest('ADD_LISTING', addListing);
  yield takeLatest('DELETE_LISTING_ADMIN', deleteListing);
}

//POST saga for new listing
function* addListing(action) {
    try {
        console.log('forum payload is', action.payload);
        yield axios.post('api/forum', action.payload)
        yield put({ type: 'GET_FORUM' })
    } catch (error) {
        console.log('error with add listing request in forum.saga.js', error);
    }
}//end addSupport

//GETting all of the postings for ForumPage and Admin
function* getForum() {
    try {
        const response = yield axios.get(`api/forum` )
        yield put({ type: 'SET_FORUM', payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log('error with forum get request in forum.saga.js', error);
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


export default forumSaga;