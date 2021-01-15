import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* supportSaga() {
  yield takeLatest('ADD_SUPPORT', addSupport);
  yield takeLatest('GET_SUPPORT', getSupport);
  yield takeLatest('DELETE_SUPPORT', deleteSupport);
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
function* getSupport() {
    try {
        const response = yield axios.get(`api/support` )
        yield put({ type: 'SET_SUPPORT', payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log('error with support get request in support.saga.js', error);
    }
}//end getSupport

//Delete messages from admin
function* deleteSupport(action){
    console.log('delete', action.payload);
    try{
        yield axios.delete(`/api/support/${action.payload}`)
        yield put({type: 'GET_SUPPORT'})
    } catch (error) {
        console.log('error with delete request in support.saga.js', error)
    }
}




export default supportSaga;