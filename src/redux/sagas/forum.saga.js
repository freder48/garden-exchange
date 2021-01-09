import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* forumSaga() {
  yield takeLatest('GET_FORUM', getForum);
}

//Getting all of the postings for ForumPage and Admin
function* getForum(action) {
    try {
        console.log(action.payload)
        const response = yield axios.get(`api/forum` )
        // {params: {direction: action.payload}}
        yield put({ type: 'SET_FORUM', payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log('error with forum get request in forum.saga.js', error);
    }
}//end getForum


export default forumSaga;