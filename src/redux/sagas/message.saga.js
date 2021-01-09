import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* messageSaga() {
    yield takeLatest('ADD_MESSAGE', addMessage);

}

//POST saga for new message
function* addMessage(action) {
    try {
        console.log('message payload is', action.payload);
        yield axios.post('api/message', action.payload)
        // yield put({ type: 'GET_FORUM' })
    } catch (error) {
        console.log('error with add listing request in message.saga.js', error);
    }
}//end messageSaga




export default messageSaga;