
// store user message information 
const support = (state = [], action) => {
    switch (action.type) {
        case 'SET_SUPPORT':
            return action.payload;
        default:
            return state;
    }
}


export default support;