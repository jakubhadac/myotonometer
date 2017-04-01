
const simulator = (state = {status: 0, progress: 0}, action)=>{
    switch (action.type){
        case 'EDIT_SIMULATOR':
            return action.newState;
        default:
            return state;
    }
};
export default simulator;