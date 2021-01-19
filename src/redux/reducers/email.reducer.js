
// store user message information 
const email = (state = [], action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return action.payload;
        default:
            return state;
    }
}



export default email;

