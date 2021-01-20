import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* messageSaga() {
    yield takeLatest('ADD_MESSAGE', addMessage);
    yield takeLatest('DELETE_MESSAGE', deleteMessage);
    yield takeLatest('GET_MESSAGES', getMessage);
    // yield takeLatest('GET_EMAIL', getEmail);
}

//Delete messages for specific user
function* deleteMessage(action){
    console.log('delete', action.payload);
    try{
        yield axios.delete(`/api/message/${action.payload}`)
        yield put({type: 'GET_MESSAGES'})
    } catch (error) {
        console.log('error with delete request in message.saga.js', error)
    }
}

// //GET email for sent_to_user
// function* getEmail(action) {
//     try {
//         console.log('payload', action.payload)
//         const response = yield axios.get(`/api/message/${action.payload}` )
//         yield put({ type: 'SET_EMAIL', payload: response.data });
//         console.log(response.data);
//     } catch (error) {
//         console.log('error with email get request in message.saga.js', error);
//     }
// }//end getEmail

//GET all of the messages for specific user
function* getMessage() {
    try {
        const response = yield axios.get(`/api/message` )
        yield put({ type: 'SET_MESSAGE', payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log('error with message get request in message.saga.js', error);
    }
}//end getMessage

//POST saga for new message
function* addMessage(action) {
    try {
        const response = yield axios.get(`/api/message/${action.payload.sent_to_user_id}` )
        yield axios.post('/api/message', {...action.payload, sent_to_user_email: response.data})
        yield put({ type: 'GET_MESSAGES' })
    } catch (error) {
        console.log('error with add listing request in message.saga.js', error);
    }
}//end messageSaga






export default messageSaga;