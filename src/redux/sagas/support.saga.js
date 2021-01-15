import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* supportSaga() {
  yield takeLatest('ADD_SUPPORT', addSupport);
}

//POST saga for new support
function* addSupport(action) {
    try {
        console.log('support payload is', action.payload);
        yield axios.post('api/support', action.payload)
        yield put({ type: 'GET_SUPPORT' })
    } catch (error) {
        console.log('error with add support request in support.saga.js', error);
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




export default supportSaga;