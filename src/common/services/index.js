/* import libs */
import * as ws from './websocket-min';
import { browserHistory } from 'react-router';
/* import action */
import * as actions from '../actions/index';

let store;

export function createWs(secure, host, port, s) {
    store = s;
    ws.wsclient.create({ secure: secure, host: host, port: port });
    setTimeout(()=>{
        ws.wsclient.bind('/data/myotonometer', (r, e)=>{}, (push_message)=>{
            if (push_message.action === 'modify'){
                store.dispatch( actions.editMyotonometer(push_message.content) );
                let s = store.getState();
                if (push_message.content.writer === 1 && push_message.content.status === 0 && s.measurement.send){
                    let m = {
                        date: push_message.content.date, fnote: push_message.content.fnote,
                        speed: push_message.content.speed, depth: push_message.content.depth,
                        data: push_message.content.data, patId: push_message.content.patId,
                        profile: push_message.content.profile, indentor: push_message.content.indentor
                    };
                    store.dispatch( actions.addUnsavedMeasurement(m) );
                    store.dispatch( actions.editUnGraph( m.patId, m.date ) );
                    store.dispatch( actions.measurementSend(false) );
                    setTimeout(()=>{ browserHistory.push('/g'); }, 1000);
                }
            }
        });
    },1000);
}
function timeErr(){
    setTimeout(()=>{
        let s = store.getState();
        if (s.measurement.send) {
            store.dispatch( actions.measurementSend(false) );
            store.dispatch( actions.measurementStatus('Time for measurement has expired...') );
        }
    }, 4*60*1000);
}
export function modifyMyotonometer(data){
    let d = new Date();
    // date format DD/MM/YYYY HH:MM:SS
    let date =("00" + d.getDate()).slice(-2) + "/" + ("00" + (d.getMonth() + 1)).slice(-2) + "/" + 
    d.getFullYear() + " " + ("00" + d.getHours()).slice(-2) + ":" + ("00" + d.getMinutes()).slice(-2) + ":" + ("00" + d.getSeconds()).slice(-2);

    let k = data; k.writer = 0; k.date = date;
    ws.wsclient.modify('/data/myotonometer', k, (r,e)=>{
        if(e.status === 0){
            store.dispatch( actions.editMyotonometer(k) );
            timeErr();
        }
    });
}
export function get() {
}
export function patientsLoad() {
    ws.wsclient.get('/data/patients', '*', (r,e)=>{
        if(e.status === 0){
            let ps = [], keys = Object.keys(r);
            for (let i=0; i<keys.length; i++){
                let p = r[keys[i]];
                p.id = parseInt(keys[i], 10);
                ps.push(p);
            }
            store.dispatch( actions.loadPatients( ps ) );
        } else { store.dispatch( actions.patientStatus( e.message+' (E'+e.status+')' ) ); }
    });
}
export function patientAdd(patientId, patientData){
    let patient = {[patientId]: patientData};
    ws.wsclient.add('/data/patients', patient, (response, error) => {
        let p = patientData; p.id = patientId;
        if(error.status === 0){
            ws.wsclient.add('/data/measurements/', {[patientId]: {}}, (r,e)=>{
                if (e.status === 0){ store.dispatch( actions.addPatient( p ) ); }
                else store.dispatch( actions.patientStatus( e.message+' (E'+e.status+')' ) );
            });
        }
        else { store.dispatch( actions.patientStatus( error.message+' (E'+error.status+')' ) ); }
    });
}
export function patientEdit(patientId, patientData){
    ws.wsclient.modify('/data/patients/', {[patientId]:patientData}, (response, error) => {
        let p = patientData; p.id = patientId;
        if(error.status === 0){ store.dispatch( actions.editPatient( p ) ); }
        else { store.dispatch( actions.patientStatus( error.message+' (E'+error.status+')' ) ); }
    });
}
export function patientRemove(patientId) {
    ws.wsclient.remove('/data/patients/'+patientId, (error) => {
        if(error.status === 0){
            store.dispatch( actions.removePatient( patientId ) );
            ws.wsclient.remove('/data/measurements/'+patientId, (error) => {
                if(error.status === 0){
                    store.dispatch( actions.removeAllMeasurement( patientId ) );
                }
            });
        }
        else { store.dispatch( actions.patientStatus( error.message+' (E'+error.status+')' ) ); }
    });
}
export function measurementLoad(){
    ws.wsclient.get('/data/measurements', '*', (r, e)=>{
        if ( e.status === 0 ) {
            let ms = [], keys = Object.keys(r);
            for (let i=0; i<keys.length; i++){
                let k = Object.keys(r[keys[i]]);
                for (let j=0; j<k.length; j++){
                    let m = r[keys[i]][k[j]];
                    m.patId = parseInt(keys[i], 10);
                    m.measId = parseInt(k[j], 10);
                    ms.push(m);
                }
            }
            store.dispatch( actions.loadMeasurements( ms ) );
        }
        else { console.log(e.message);}
    } );
}
export function measurementAdd(patId, measId, meas){
    ws.wsclient.add('/data/measurements/'+patId, {[measId]: meas}, (r, e)=>{
        if (e.status === 0){
            let m = meas; m.patId = patId; m.measId = measId;
            browserHistory.push('/measurement');
            store.dispatch( actions.removeUnMeasurement(patId, meas.date) );
            store.dispatch( actions.addSavMeasurement(m) );
        }  else { store.dispatch( actions.measurementStatus( e.message+' (E'+e.status+')') ); }
    } );
}
export function measurementRemove(patId, measId) {
    ws.wsclient.remove('/data/measurements/'+patId+'/'+measId, (e)=>{
        if (e.status === 0){ store.dispatch( actions.removeSavMeasurement( patId, measId ) );
        } else { store.dispatch( actions.measurementStatus( e.message+' (E'+e.status+')') ); }
    });
}