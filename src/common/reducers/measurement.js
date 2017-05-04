const measurementState = {
	measurements: [], unsaved: [], id: -1, speed: 0, pene: 0, note: '',
    send: false, compA: -1, compB: -1, status: ''
};
const measurement = (state = measurementState, action) => {
	let un, sav;
    switch (action.type){
        case 'ADD_UNSAVED_MEASUREMENT':
            un = add(state.unsaved,  action.measurement);
            return {...state, unsaved: un };
        case 'ADD_SAVED_MEASUREMENT':
            sav = add(state.measurements,  action.measurement);
            return {...state, measurements: sav, status: 'Measurement saved...' };
        case 'REMOVE_ALL_MEASUREMENT':
            sav = removeAll(state.measurements, action.pid);
            un = removeAll(state.unsaved, action.pid);
            return {...state, measurements: sav, unsaved: un };
        case 'REMOVE_SAVED_MEASUREMENT':
            sav = removeSav(state.measurements, action.pid, action.mid);
            return {...state, measurements: sav, id: -1, status: 'Measurement removed...'};
        case 'REMOVE_UNSAVED_MEASUREMENT':
            un = removeUn(state.unsaved, action.pid, action.date);
            return {...state, unsaved: un};
        case 'LOAD_MEASUREMENTS':
            return {...state, measurements: action.measurements};
        case 'EDIT_MEASUREMENT_ID':
            return {...state, id: action.id};
        case 'EDIT_MEASUREMENT_SPEED':
            return {...state, speed: action.speed};
        case 'EDIT_MEASUREMENT_NOTE':
            return {...state, note: action.note};
        case 'EDIT_MEASUREMENT_PENE':
            return {...state, pene: action.pene};
        case 'EDIT_MEASUREMENT_PROF':
            return {...state, profiel: action.profile};
        case 'EDIT_MEASUREMENT_COMPA':
            return {...state, compA: action.ca};
        case 'EDIT_MEASUREMENT_COMPB':
            return {...state, compB: action.cb};
        case 'EDIT_MEASUREMENT_SEND':
            return {...state, send: action.send};
        case 'STATUS_MEASUREMENT':
            return {...state, status: action.msg};
        case 'STATUS_MEASUREMENT_RESET':
            return {...state, status: ''};
        case 'SET_MEASUREMENT':
            return {...state, profile: action.measurement.profile, pene: action.measurement.depth,
                speed: action.measurement.speed, note: action.patient.note };
        default:
            return state;
    }
};
export default measurement;

function add(arr, p) { arr.push(p); return arr; }
function removeAll(a, pid) { return a.filter( i => i.patId !== parseInt(pid, 10) ); }
function removeSav(sav, pid, mid) {
    return sav.filter( i=> (i.patId !== pid || (i.patId === pid && i.measId !== mid)) ); }
function removeUn(un, pid, date){ return un.filter(
    i => (i.patId !== parseInt(pid, 10) || (i.patId === parseInt(pid, 10) && i.date !== date))
); }