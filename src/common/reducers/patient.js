const patientState = {
    patients: [], id: -1, name: '', lastName: '', pin: '', gender: 'male', note: '', status: ''
};
function add(ps, p) { ps.push(p); return ps;}
function remove(ps, id) { let arr = []; arr = ps; ps = arr.filter( i => i.id !== parseInt(id, 10) ); return ps; }
function edit(ps, p) { let arr = ps, index = arr.findIndex( i => i.id === parseInt(p.id,10)); ps[index] = p; return ps; }

const patient = (state = patientState, action)=>{
    let ps;
    switch (action.type){
        case 'ADD_PATIENT':
            ps = add(state.patients,  action.patient);
            return {...state, patients: ps, id: action.patient.id, status: 'User added'};
        case 'REMOVE_PATIENT':
            ps = remove(state.patients, action.id);
            return {...state, patients: ps, id: -1, name: '', lastName: '', pin: '',
                gender: 'male', note: '', status: 'User removed'};
        case 'EDIT_PATIENT':
            ps = edit(state.patients, action.patient);
            return {...state, patients: ps, status: 'Users changed'};
        case 'RESET_PATIENT':
            return {...state, id: -1, name: '', lastName: '', pin: '', gender: 'male', note: '', status: ''};
        case 'SET_PATIENT':
            return {...state, id: action.patient.id, name: action.patient.name, lastName: action.patient.lastName,
                pin: action.patient.pin, gender: action.patient.gender, note: action.patient.note};
        case 'LOAD_PATIENTS': return {...state, patients: action.patients};
        case 'EDIT_PATIENT_ID': return {...state, id: action.id};
        case 'EDIT_PATIENT_NAME': return {...state, name: action.name};
        case 'EDIT_PATIENT_LASTNAME': return {...state, lastName: action.lastName};
        case 'EDIT_PATIENT_PIN': return {...state, pin: action.pin};
        case 'EDIT_PATIENT_GENDER': return {...state, gender: action.gender};
        case 'EDIT_PATIENT_NOTE': return {...state, note: action.note};
        case 'STATUS_PATIENT_RESET': return {...state, status: ''};
        case 'STATUS_PATIENT': return {...state, status: action.errorMsg};
        default: return state;
    }
};
export default patient;
