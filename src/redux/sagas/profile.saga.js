import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* profileSaga() {
  yield takeLatest('GET_USER_LISTING', getUserListing);

}


//GETting all of the postings for ForumPage and Admin
function* getUserListing() {
    try {
        const response = yield axios.get(`api/profile` )
        yield put({ type: 'SET_FORUM', payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log('error with forum get request in profile.saga.js', error);
    }
}//end getForum


export default profileSaga;