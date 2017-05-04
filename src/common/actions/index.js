/* ==================== actions for myotonometer ==================== */
/**
 * @param state object of myotonometer {...}
 * @returns {{type: string, newState: *}}
 */
export const editMyotonometer = (state) => { return {type: 'EDIT_MYOTONOMETER', newState: state}; };
/* ==================== actions for patient ==================== */
/**
 * @param p Object of patient {key; {patient data}}
 * @returns {{type: string, patient: *}}
 */
export const editPatient = (p) => { return {type: 'EDIT_PATIENT', patient: p}; };
/**
 * @param ps Object of patients
 * @returns {{type: string, patients: *}}
 */
export const loadPatients = (ps) => { return {type: 'LOAD_PATIENTS', patients: ps}; };
/**
 * @param id Patient's ID (int)
 * @returns {{type: string, id: *}}
 */
export const removePatient = (id) => { return {type: 'REMOVE_PATIENT', id: id}; };
/**
 * @param p Object of patient {key; {patient data}}
 * @returns {{type: string, newPatient: *}}
 */
export const addPatient = (p) => { return {type: 'ADD_PATIENT', patient: p}; };
export const patientReset = () => { return {type: 'RESET_PATIENT'}; };
/**
 * @param msg (string) Error msg from server or add/edit/remove from page
 * @returns {{type: string, errorMsg: *}}
 */
export const patientStatus = (msg) => { return {type: 'STATUS_PATIENT', errorMsg: msg}; };
export const patientStatusReset = () => { return {type: 'STATUS_PATIENT_RESET'}; };
export const editPatientId = (id) => { return {type: 'EDIT_PATIENT_ID', id: id}; };
export const editPatientName = (name) => { return {type: 'EDIT_PATIENT_NAME', name: name}; };
export const editPatientLastName = (lName) => { return {type: 'EDIT_PATIENT_LASTNAME', lastName: lName}; };
export const editPatientPin = (pin) => { return {type: 'EDIT_PATIENT_PIN', pin: pin}; };
export const editPatientGender = (gender) => { return {type: 'EDIT_PATIENT_GENDER', gender: gender}; };
export const editPatientNote = (note) => { return {type: 'EDIT_PATIENT_NOTE', note: note}; };
export const setPatient = (pat) => { return {type: 'SET_PATIENT', patient: pat}; };
/* ==================== actions for measurement ==================== */
/**
 * @param measurement array of measurement object
 * @returns {{type: string, measurement: *}}
 */
export const loadMeasurements = (measurement) => { return {type: 'LOAD_MEASUREMENTS', measurements: measurement}; };
export const setMeasurement = (m) => { return {type: 'SET_Measurement', measurement: m}; };
export const removeAllMeasurement = (pid) => { return {type: 'REMOVE_ALL_MEASUREMENT', pid: pid}; };
export const addUnsavedMeasurement = (meas) => { return {type: 'ADD_UNSAVED_MEASUREMENT', measurement: meas}; };
export const addSavMeasurement = (meas) => { return {type: 'ADD_SAVED_MEASUREMENT', measurement: meas}; };
export const removeSavMeasurement = (pid, mid) => { return {type: 'REMOVE_SAVED_MEASUREMENT', pid: pid, mid: mid}; };
export const removeUnMeasurement = (pid, date)=> { return {type: 'REMOVE_UNSAVED_MEASUREMENT', pid: pid, date: date}; };
export const measurementStatus = (msg)=>{ return {type:'STATUS_MEASUREMENT', msg: msg}; };
export const measurementStatusReset = ()=>{ return {type:'STATUS_MEASUREMENT_RESET'}; };
export const editMeasurementId = (id)=>{ return {type:'EDIT_MEASUREMENT_ID', id: id}; };
export const editMeasurementSpeed = (speed)=>{ return {type:'EDIT_MEASUREMENT_SPEED', speed: speed}; };
export const editMeasurementPene = (pene)=>{ return {type:'EDIT_MEASUREMENT_PENE', pene: pene}; };
export const editMeasurementProf = (prof)=>{ return {type:'EDIT_MEASUREMENT_PROF', profile: prof}; };
export const editMeasurementNote = (note)=>{ return {type:'EDIT_MEASUREMENT_NOTE', note: note}; };
export const editMeasurementCompA = (ca)=>{ return {type:'EDIT_MEASUREMENT_COMPA', ca: ca}; };
export const editMeasurementCompB = (cb)=>{ return {type:'EDIT_MEASUREMENT_COMPB', cb: cb}; };
export const measurementSend = (s)=>{ return {type:'EDIT_MEASUREMENT_SEND', send: s}; };
/* ==================== actions for settings ==================== */
/**
 * @param lang string of language (en, cs, de, ...)
 * @returns {{type: string, language: *}}
 */
export const changeLanguage = (lang) => { return {type: 'CHANGE_LANGUAGE', language: lang}; };
/* ==================== actions for graph ==================== */
export const editUnGraph = (id, date) => { return {type: 'EDIT_GRAPH', pid: id, date: date}; };
export const editSavGraph = (pid, mid) => { return {type: 'SHOW_GRAPH', pid: pid, mid: mid}; };
export const resetGraph = () => { return {type: 'RESET_GRAPH'}; };