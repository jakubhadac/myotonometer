
const simulator = (state = {
    status: 0, progress: 0, writer: 0, speed: 0, depth: 0, data: [], patId: 0, profile: 'default', indentor: 'S4'
}, action)=>{
    switch (action.type){
        case 'EDIT_SIMULATOR':
            return action.newState;
        default:
            return state;
    }
};
export default simulator;