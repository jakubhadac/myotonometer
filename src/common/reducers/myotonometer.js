let myoState = {
	date: '', fnote: '', status: 0, progress: 0, writer: 0, speed: 0, depth: 0,
    data: [], patId: 0, profile: 'default', indentor: 'S4'
};
const myotonometer = (state = myoState, action) => {
    switch (action.type){
        case 'EDIT_MYOTONOMETER': return action.newState;
        default: return state;
    }
};
export default myotonometer;