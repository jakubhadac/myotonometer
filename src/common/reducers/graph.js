const graph = (state = { type: null, pid: null, date: null, mid: null }, action)=> {
    switch (action.type){
        case 'RESET_GRAPH':
            return { type: null, measId: null, pid:null, date:null };
        case 'EDIT_GRAPH':
            return {...state, type: 'unsaved', pid: action.pid, date: action.date };
        case 'SHOW_GRAPH':
            return {...state, type: 'saved', pid: action.pid, mid: action.mid };
        default:
            return state;
    }
};
export default graph;