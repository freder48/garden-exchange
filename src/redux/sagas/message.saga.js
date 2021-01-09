import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* messageSaga() {
    yield takeLatest('ADD_MESSAGE', addMessage);
    yield takeLatest('GET_MESSAGES', getMessage);
}



//POST saga for new message
function* addMessage(action) {
    try {
        console.log('message payload is!!!!!!!!!', action.payload);
        yield axios.post('/api/message', action.payload)
        // yield put({ type: 'GET_FORUM' })
    } catch (error) {
        console.log('error with add listing request in message.saga.js', error);
    }
}//end messageSaga

//GET all of the messages for specific user
function* getMessage() {
    try {
        const response = yield axios.get(`api/message` )
        yield put({ type: 'SET_MESSAGE', payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log('error with message get request in message.saga.js', error);
    }
}//end getMessage




export default messageSaga;