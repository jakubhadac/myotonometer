const patientState = {
    patients: [],
    error: null
};
function add(ps, p) { ps.push(p); }
function remove(ps, id) { let arr = []; arr = ps; ps = arr.filter( i => i.id !== parseInt(id, 10) ); }
function edit(ps, p) { let arr = ps, index = arr.findIndex( i => i.id === parseInt(p.id,10)); ps[index] = p; }

const patient = (state = patientState, action)=>{
    switch (action.type){
        case 'ADD_PATIENT':
            add(state.patients,  action.patient);
            return {...state, error: null};
        case 'REMOVE_PATIENT':
            remove(state.patients, action.id);
            return {...state, error: null};
        case 'EDIT_PATIENT':
            edit(state.patients, action.patient);
            return {...state, error: null};
        case 'LOAD_PATIENT':
            return {patients: action.patients, error: null};
        case 'ERROR_PATIENT':
            return {...state, error: action.errorMsg};
        default:
            return state;
    }
};
export default patient;
