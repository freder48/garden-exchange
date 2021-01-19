
// store user message information 
const message = (state = [], action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.payload;
        default:
            return state;
    }
}


export default message;

