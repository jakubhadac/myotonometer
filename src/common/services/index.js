/* import libs */
import * as ws from './websocket-min';
/* import action */
import { editSimulator, addPatient, editPatient, removePatient, loadPatient, patientError } from '../actions/index'

let store;

export function createWs(secure, host, port, s) {
    store = s;
    ws.wsclient.create({ secure: secure, host: host, port: port });
    setTimeout(()=>{
        ws.wsclient.bind('/data/controller', (r, e)=>{}, (push_message)=>{
            if (push_message.action === 'modify') store.dispatch(editSimulator(push_message.content));
        });
        ws.wsclient.bind('/data/patients', (r, e)=>{}, (push_message)=>{
            switch (push_message.action){
                case 'modify':
                    store.dispatch(editPatient({}));
                    break;
                case 'add':
                    store.dispatch(addPatient({}));
                    break;
                case 'remove':
                    store.dispatch(removePatient({}));
                    break;
                default:
                    break;
            }
        });
    },1000);
}
/**
 * Change value in DB ( /data/controller/status )
 * @param  {int} status      Integer define status of measurement
 */
export function modifySimulatorStatus(status) {
    ws.wsclient.modify('/data/controller', {status: status}, (response, error) => {
        if (error.status === 0){
            store.dispatch(editSimulator(response));
        } else {
            console.log(error.status);
        }
    });
}
/**
 * Change value in DB ( /data/controller/progress )
 * @param  {int} progress      progress bar value
 */
export function modifySimulatorProgress(progress) {
    ws.wsclient.modify('/data/controller', {progress: progress}, (response, error) => {
        if (error.status === 0){
            store.dispatch(editSimulator(response));
        } else {
            console.log(error.status);
        }
    });
}
/**
 * Change value in DB ( /data/controller/ )
 * @param simulator {Object}      object of value
 */
export function modifySimulator(simulator) {
    ws.wsclient.modify('/data/controller', simulator, (response, error) => {
        if (error.status === 0){
            store.dispatch(editSimulator(response));
        } else {
            console.log(error.status);
        }
    });
}
export function get() {
    ws.wsclient.get('/data/patients', '*', (r,e)=>{console.log('get',r);});
}
export function patientLoad() {
    ws.wsclient.get('/data/patients', '*', (r,e)=>{
        if(e.status === 0){
            let ps = [], keys = Object.keys(r);
            for (let i=0; i<keys.length; i++){
                let p = r[keys[i]];
                p.id = parseInt(keys[i], 10);
                ps.push(p);
            }
            store.dispatch( loadPatient( ps ) );
        } else { store.dispatch( patientError( e.message ) ); }
    });
}
export function patientAdd(patientId, patientData){
    patientData.measurements = {};
    let patient = {[patientId]: patientData};
    ws.wsclient.add('/data/patients', patient, (response, error) => {
        let p = patientData; p.id = patientId;
        if(error.status === 0){ store.dispatch( addPatient( p ) ); }
        else { store.dispatch( patientError( error.message ) ); }
    });
}
export function patientEdit(patientId, patientData){
    //patientData.measurements = {};
    ws.wsclient.modify('/data/patients/', {[patientId]:patientData}, (response, error) => {
        let p = patientData; p.id = patientId;
        if(error.status === 0){ store.dispatch( editPatient( p ) ); }
        else { store.dispatch( patientError( error.message ) ); }
    });
}
export function patientRemove(patientId) {
    ws.wsclient.remove('/data/patients/'+patientId, (error) => {
        if(error.status === 0){ store.dispatch( removePatient( patientId ) ); }
        else { store.dispatch( patientError( error.message ) ); }
    });
}