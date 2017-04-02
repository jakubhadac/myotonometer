/* ==================== actions for simulator ==================== */
/**
 * @param state object of simulator {progress: int, status: int}
 * @returns {{type: string, newState: *}}
 */
export const editSimulator = (state) => {
    return {type: 'EDIT_SIMULATOR', newState: state};
};
/* ==================== actions for patient ==================== */
/**
 * @param p Object of patient {key; {patient data}}
 * @returns {{type: string, patient: *}}
 */
export const editPatient = (p) => {
    return {type: 'EDIT_PATIENT', patient: p};
};
/**
 * @param ps Object of patients
 * @returns {{type: string, patients: *}}
 */
export const loadPatient = (ps) => {
    return {type: 'LOAD_PATIENT', patients: ps};
};
/**
 * @param id Patient's ID (int)
 * @returns {{type: string, id: *}}
 */
export const removePatient = (id) => {
    return {type: 'REMOVE_PATIENT', id: id};
};
/**
 * @param p Object of patient {key; {patient data}}
 * @returns {{type: string, newPatient: *}}
 */
export const addPatient = (p) => {
    return {type: 'ADD_PATIENT', patient: p};
};
/**
 * @param msg (string) Error msg from server or add/edit/remove from page
 * @returns {{type: string, errorMsg: *}}
 */
export const patientError = (msg) => {
    return {type: 'ERROR_PATIENT', errorMsg: msg};
};