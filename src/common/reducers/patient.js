const patientState = {
    patients: [],
    error: null
};
function add(ps, p) { ps.push(p); return ps;}
function remove(ps, id) { let arr = []; arr = ps; ps = arr.filter( i => i.id !== parseInt(id, 10) ); return ps; }
function edit(ps, p) { let arr = ps, index = arr.findIndex( i => i.id === parseInt(p.id,10)); ps[index] = p; return ps; }

const patient = (state = patientState, action)=>{let ps;
    switch (action.type){
        case 'ADD_PATIENT':
            ps = add(state.patients,  action.patient);
            return {patients: ps, error: 'User added'};
        case 'REMOVE_PATIENT':
            ps = remove(state.patients, action.id);
            return {patients: ps, error: 'User removed'};
        case 'EDIT_PATIENT':
            ps = edit(state.patients, action.patient);
            return {patients: ps, error: 'Users changed'};
        case 'LOAD_PATIENT':
            return {patients: action.patients, error: null};
        case 'ERROR_PATIENT':
            return {...state, error: action.errorMsg};
        default:
            return state;
    }
};
export default patient;
