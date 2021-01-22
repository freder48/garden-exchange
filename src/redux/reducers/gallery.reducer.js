
// store details for specific listing
const gallery = (state = [], action) => {
    switch (action.type) {
        case 'SET_GALLERY':
            return action.payload;
        default:
            return state;
    }
}




export default gallery;